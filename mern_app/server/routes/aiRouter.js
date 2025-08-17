const express = require("express")
const { validateImage } = require("../controllers/aiController")
const aiRouter = express.Router()

aiRouter.route("/").post(validateImage)

module.exports = {
    aiRouter
}