import mongoose from "mongoose"
import User from "../db/models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


export const register = async(req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction();

    try{
        const { name, email, password } = req.body

        //check if a user exists
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            const error = new Error('User already exists')
            error.statusCode = 409
            throw error;
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const newUser = await User.create([{
            name: name,
            email: email,
            password: hashedPassword
        }], {session})

        //generate token
        const token = jwt.sign({userId: newUser[0]._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({
            success:true,
            message: 'User created successfully',
            data:{
                token,
                user: newUser[0]
            }
        })
    }catch(err){
        await session.abortTransaction()
        session.endSession()
        next(err)
    }
}
export const login = async(req, res, next) => {
    try{
        const { email, password } = req.body

        const user = await User.findOne({email})
        if(!user){
            const error = new Error('User not found')
            error.statusCode = 404
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            const error = new Error('Invalid Credentials')
            error.statusCode = 401
            throw error;
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: JWT_EXPIRES_IN} );

        res.status(200).json({
            success:true,
            message: 'User signed in successfully',
            data:{
                token,
                user
            }
        })
    }catch(err){
         next(err)
    }
}
export const logout = async (req, res, next) => {
    try {
        // Since JWT is stored client-side in localStorage, 
        // the server simply returns a 200 OK success response.
        res.status(200).json({
            success: true,
            message: 'User signed out successfully'
        });
    } catch (err) {
        next(err);
    }
};
