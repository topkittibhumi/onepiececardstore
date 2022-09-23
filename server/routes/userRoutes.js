import express from 'express';
import { registerUser, loginUser, getMe, forgetPassword, resetPassword,} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js' 
const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/me', protect, getMe)
userRouter.post('/forgetpassword', forgetPassword)
userRouter.post('/resetPassword/:resetToken', resetPassword)


export default userRouter;
