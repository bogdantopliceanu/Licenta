const express = require("express");
const router = express.Router();
const { addDestination } = require("../controllers/destinationController");
const protect = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");


router.post("/", protect, upload.single("image"), addDestination)


module.exports = router;