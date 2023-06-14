
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser, getUsers, getSimilarUsers, getNotCommonDestinations } = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get ("/logout", logout)
router.get ("/getuser", protect, getUser)  //pt ca am adauagat si middleware-ul protect, va da acces la informatii pt getUser
router.get ("/getusers", protect, getUsers) 
router.get ("/similarusers", protect, getSimilarUsers) 
router.get ("/getnotcommondestinations", protect, getNotCommonDestinations) 
router.get ("/loggedin", loginStatus)
router.patch ("/updateuser",protect, updateUser)  //cu protect verificam si daca userul e logat



module.exports = router



