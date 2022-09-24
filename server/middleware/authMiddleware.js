import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'

const protect = asyncHandler(async (req,res,next)=>{
    let token
    console.log(req.headers)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        console.log("do")
        try {
            //Get token from header
            token = req.headers.authorization.split(' ')[1]
            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // GET user from the token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }catch(error){
            console.log(error)
            res.status(401).json({
                message : 'Not authorized'
            })
            return
        } 
    }
    if(!token){
        res.status(401).json({
            message : 'Not authorized, no token'
        })
    }
})

export default protect