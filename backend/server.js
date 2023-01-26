const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");   //convertim informatii din frotntend request in un obiect ce il putem citii in backend
const cors = require("cors");
const userRoute = require("./routes/userRoute")
const destinationRoute = require("./routes/destinationRoute")
const errorHandler = require("./middleWare/errorMiddleware")
const cookieParser = require("cookie-parser")
const path = require("path");


const app = express();

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))   //handle data coming from url
app.use(bodyParser.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads"))) //am linkuit functionalitatea de upload sa pointeze catre folderulkl de uploads

//delete
// const setAppCookie = () => firebase.auth().currentUser &&
// firebase.auth().currentUser.getToken().then(token => {
//     Cookies.set("token_auto_login", "", {
//         path: "/",  //unde va fi stocat cookie-ul
//         httpOnly: true,  //flag pt ca cookie-ul sa fie folosit de server
//         expires: new Date(Date(0)),  //expiram cookkie-ul in momentul curent
//         sameSite:"none",  //permite ca frontend si backend sa aiba url-uri diferite
//         secure: true  //marcheza cookie-ul sa fie folosit cu https
//  });
// });




//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/destinations", destinationRoute);


//Routes
app.get("/", (req, res) => 
{
    res.send("Home Page");
});

//Error Middleware
app.use(errorHandler);


//connect la DB si start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() =>
    {
        app.listen(PORT, () =>
        {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => console.log(err))