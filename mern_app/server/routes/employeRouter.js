const express = require("express")
const { getAllEmployees, createNewEmployee, getSpecificEmployee, updateSpecificEmployee, deleteSpecificEmployee } = require("../controllers/employeController")
const employeRouter = express.Router()

employeRouter.route("/").get(getAllEmployees).post(createNewEmployee)
employeRouter.route('/:id').get(getSpecificEmployee).put(updateSpecificEmployee).delete(deleteSpecificEmployee)


module.exports = employeRouter;