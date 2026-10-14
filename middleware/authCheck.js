import jwt from 'jsonwebtoken';
import User from '../db/models/User.js'
//FOR EJS
// export default function authCheck(req, res, next){
//   // 1. Extract the token from the cookies object
//     const token = req.cookies.token;

//     // 2. If no token exists, redirect unauthenticated users to login
//     if (!token) {
//         return res.redirect('/login');
//     }

//     try {
//         // 3. Verify the token's signature and expiration
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // 4. Optionally attach user payload to request for use in controllers
//         req.user = decoded;

//         // 5. Token is valid, proceed to the next route handler/controller
//         return next();
//     } catch (error) {
//         // 6. Token is invalid or expired; clear the bad cookie and redirect
//         res.clearCookie('token');
//         return res.redirect('/login');
//     }
// }

//FOR API ENDPOINT

export default async function authCheck(req, res, next){
    try{
        let token;
        const authHeader = req.headers.authorization;

        // 1. Check if the authorization header exists and starts with Bearer
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // 2. Extract the token from "Bearer <token>"
        token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne(decoded.userID)
        // 4. Attach user payload to request so req.user.userId is available
        req.user = user;

        return next();
    }catch(err){
        err.statusCode = 401; 
        next(err);
    }
}