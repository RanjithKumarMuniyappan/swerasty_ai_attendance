const expressAsyncHandler = require("express-async-handler")
const Employee = require("../models/employeeModel");

// @description : Get all employees
// @route : GET /api/employees
// @access : public
const getAllEmployees = expressAsyncHandler(async (req, res, next) => {

    const employees = await Employee.find();
    res.status(200).json({
        message: "Gat All employees",
        data: employees
    })
})


// @description : Create a new employee
// @route : POST /api/empoyees
// @access : public
const createNewEmployee = expressAsyncHandler(async (req, res, next) => {

    const {
        employee_id,
        employee_name,
        employee_email,
        employee_phone,
        employee_designation,
        employee_department,
        employee_manager_id
    } = req.body


    if (!employee_id || !employee_name || !employee_email || !employee_phone || !employee_designation || !employee_department || !employee_manager_id) {
        res.status(400)
        throw new Error("All fields are required")
    }


    const createdEmployee = Employee.create({
        employee_id,
        employee_name,
        employee_email,
        employee_phone,
        employee_designation,
        employee_department,
        employee_manager_id
    })

    res.status(201).json({
        message: 'New employee has been created',
        data: {
            employee_id,
            employee_name,
            employee_email,
            employee_phone,
            employee_designation,
            employee_department,
            employee_manager_id
        }
    })
})

// @description : Get specific Employee
// @route : GET /api/employees/:id
// @access : public
const getSpecificEmployee = expressAsyncHandler(async (req, res) => {

    const specificEmployee = await Employee.findById(req.params.id)
    console.log("ReecievedRes : ", specificEmployee);


    if (!specificEmployee) {
        res.status(404);
        throw new Error("Employee not found")
    }

    res.status(200).json({
        message: "Get specific Employee",
        data: specificEmployee
    })

})

// @description : Update a spcific employee
// @route : PUT /api/employee/:id
// @access : public
const updateSpecificEmployee = expressAsyncHandler(async (req, res) => {

    const specificEmployee = await Employee.findById(req.params.id)
    if (!specificEmployee) {
        res.status(404);
        throw new Error("Employee not found")
    }

    const updateEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json({
        message: `${updateEmployee.employee_name} data has been updated`,
        data : updateEmployee
    })
})

// @description : Delete a specific employee
// @route : Delete /api/employee/:id
// @access : public
const deleteSpecificEmployee = expressAsyncHandler(async (req, res) => {

    console.log("AmICalled ?");
    

    const specificEmployee = await Employee.findById(req.params.id)
    console.log("TheEmployee : ", specificEmployee);
    
    if (!specificEmployee) {
        res.status(404);
        throw new Error("Employee not found")
    }

    await Employee.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: `${specificEmployee.employee_name} has been deleted successfully`
    })
})


module.exports = {
    getAllEmployees,
    createNewEmployee,
    getSpecificEmployee,
    updateSpecificEmployee,
    deleteSpecificEmployee
}