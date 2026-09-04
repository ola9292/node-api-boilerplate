import express from "express";
import session from "express-session"
import authRouter from "./routes/auth.js"
import { meRouter } from "./routes/me.js"
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

//use ejs templates
app.set('view engine', 'ejs')

//serve any file inside the 'public' folder publicly
app.use(express.static(path.join(__dirname, 'public')));

const secret = process.env.SECRET
//to be able to grab body from api ajax
app.use(express.json())
//to be able to grab body from form
app.use(express.urlencoded({ extended: true }));

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