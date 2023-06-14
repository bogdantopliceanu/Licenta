const express = require("express");
const { contactUS } = require("../controllers/contactController");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");


router.post("/", protect, contactUS)


module.exports = router;