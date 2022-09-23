// @desc Register new user
// @route POST /api/users
// @acess Public
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

export const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // Check if user exists
    const userExists = await User.findOne({email})
    
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        type: 1
    })
    if(user){
        res.status(201).json({
            _id : user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
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
            _id : user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
    res.json({messge: 'Login User'})
})


// @desc G use data
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

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1m',
    })
}