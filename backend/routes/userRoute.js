const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logout, getUser, loginStatus, updateUser } = require("../controllers/userController");
const protect = require("../middleWare/authMiddleware");

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get ("/logout", logout)
router.get ("/getuser", protect, getUser)  //pc ca am adauagat si middleware-ul protect, va da acces la informatii pt getUser
router.get ("/loggedin", loginStatus)
router.patch ("/updateuser",protect, updateUser)  //cu protect verificam si daca userul e logat



module.exports = router
