const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


//next e pentru cazul in care mai este ceva de rulat dupa middleware
const protect = asyncHandler (async (req, res, next) => {
    try {
        //verif daca req are un cookie
        const token = req.cookies.token_auto_login
        if(!token) {
            res.status(401)
            throw new Error("Not authorized, please login")
        }

        //Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        
        //get user id from token (luam datele utilizatoruli, mai putin parola)
        const user = await User.findById(verified.id).select("-password")

        //verif daca exista userul
        if(!user) {
            res.status(401)
            throw new Error("User not found")
        }

        //salvam datele in request
        req.user = user
        next();
    }
    catch (error) {
        res.status(401)
        throw new Error("Not authorized, please login")
    }
})


//pt a folosi oriunde
module.exports = protect;