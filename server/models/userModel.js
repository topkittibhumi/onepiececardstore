import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
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
    }
},
{
    timestamps: true
})

export default mongoose.model('User', userSchema);
