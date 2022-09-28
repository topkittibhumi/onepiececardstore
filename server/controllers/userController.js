// @desc Register new user
// @route POST /api/users
// @acess Public
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import e from 'express';
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto';

export const registerUser = asyncHandler(async(req, res) => {
    const { name,surname, email, password,} = req.body

    if(!name || !email || !password || !surname ){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    console.log({email})
    const userExists = await User.findOne({email})
    
    if(userExists){
        res.status(400).json({
            message : 'User already exists'
        })
        return
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    //const hashedPassword = await bcrypt.hash(password, salt)

    // Create user

    const user = await User.create({
        name,
        surname,
        email,
        password,
        type: 1
    })
    if(user){
        res.status(201).json({
            _id : user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            message : 'Something went wrong, please try again'
        })
        return
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @acess Public

export const loginUser =asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    // Check for user email
    const user = await User.findOne({email})
    
    if(user && (await bcrypt.compare(password, user.password))){

        res.status(201).json({
            _id : user._id,
            name: user.name,
            surname:user.surname,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    } else {
        res.status(400).json({
            message : 'Password not match or Account not exist'
        })
    }
})


// @desc Get use data
// @route GET /api/users/me
// @acess Private

export const getMe = asyncHandler(async(req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// @desc Forget P
// @route Get
// @access Public

export const forgetPassword = asyncHandler(async(req,res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const resetToken = user.getResetPasswordToken()
            await user.save();

            const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;
            const message = `
                <h1>you have requested a password reset </h1>
                <p>Please go to this link to reset your password</p>
                <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
            `
            try {
                await sendEmail({
                    to: user.email,
                    subject: "Password Reset Request",
                    text: message
                });
                res.status(200).json({ sucess: true, data: "Email Sent"})
            } catch (error){
                user.resetPasswordToken = undefined;
                user.resetPasswordExpire = undefined;

                await user.save();

                res.status(400).json({
                    message : 'Email could not be sent, please try again later'
                })
            }

        } else{
            res.status(400).json({
                message : 'Email could not be sent, please check your input email.'
            })
        }
    } catch(error){
        res.status(400).json({
            message : 'Something went wrong'
        })
    }
})

export const resetPassword = asyncHandler(async(req,res) =>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            reSetPasswordExpire: {$gt: Date.now()}  
        })
        if(!user){
            res.status(400)
            throw new Error('Invalid Reset Token')
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })
    } catch(error){

    }
})

// Generate reset token



// Generate JWT

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXIPRE,
    })
}