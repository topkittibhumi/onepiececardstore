import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    surname: {
        type: String,
        required: [true, 'Please add a surname']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    type: {
        type: Number,
        required: [true, 'Please add a type'],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

},
{
    timestamps: true
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next();

})

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    
    this.resetPasswordExpire = Date.now() + 10 *(60 *1000)
    return resetToken;
}

export default mongoose.model('User', userSchema);
