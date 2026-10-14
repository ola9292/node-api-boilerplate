import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'User Name is required'],
        trim:true,
        minLength:2,
        maxLength: 50
    },
    email:{
        type: String,
        required:[true, 'User Email is required'],
        trim:true,
        unique:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required:[true, 'User Password is required'],
        unique:true,
        minLength:6,
    }
}, {timestamps: true})

export default mongoose.model('User', userSchema);