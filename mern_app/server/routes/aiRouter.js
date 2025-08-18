const express = require("express")
const { validateImage } = require("../controllers/aiController")
const aiRouter = express.Router()


const multer = require("multer");

// Store files in memory (not on disk)
const storage = multer.memoryStorage();

// Initialize multer
const upload = multer({ storage: storage });



aiRouter.route("/").post(upload.single("file"), validateImage)

module.exports = {
    aiRouter
}