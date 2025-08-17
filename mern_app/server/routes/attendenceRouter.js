const express = require('express')
const { getAttendenceOfTheDate, getAttendanceById } = require('../controllers/attendenceController')

const attendenceRouter = express.Router()


attendenceRouter.route("/:id").get(getAttendanceById)
attendenceRouter.route("/date/:date").get(getAttendenceOfTheDate)

module.exports = attendenceRouter;