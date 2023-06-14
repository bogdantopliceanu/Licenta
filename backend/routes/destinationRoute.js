const express = require("express");
const router = express.Router();
const { addDestination, getDestinations, getDestination } = require("../controllers/destinationController");
const protect = require("../middleWare/authMiddleware");
const { upload } = require("../utils/fileUpload");


router.post("/", protect, upload.single("image"), addDestination)
router.get("/", protect, getDestinations)
router.get("/:id", protect, getDestination)


module.exports = router;