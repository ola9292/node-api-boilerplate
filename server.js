import express from "express";
import session from "express-session"
import authRouter from "./routes/auth.js"
import { meRouter } from "./routes/me.js"
import 'dotenv/config';

const app = express()

const secret = process.env.SECRET
//to be able to grab body from api form
app.use(express.json())

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const PORT = 5001

app.use('/api/auth/me', meRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})