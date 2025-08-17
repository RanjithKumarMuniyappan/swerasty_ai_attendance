const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    employee_id :{
        type:String,
        required: [true, "Please add the employee id"]
    },
    employee_name:{
        type:String,
        required:[true, "Please add the employee name"]
    },
    employee_email:{
        type: String,
        required:[true, "Please add the employee email"]
    },
    employee_phone : {
        type: String,
        required:[true, "Please add the employee phone number"]
    },
    employee_designation:{
        type:String,
        required:[true, "Please add the employee designation"]
    },
    employee_department :{
        type:String,
        required:[true, "Please add the employee department"]
    },
    employee_manager_id:{
        type:String,
        required:[true, "Please add the employee manager id"]
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("Employee", employeeSchema)