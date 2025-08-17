
// @description : get attendance of a day by date
// @route : GET /api/attendence/:date
// @access : public
const getAttendenceOfTheDate = (req, res)=>{

    const date = req.params.date
    console.log("getAttendenceOfTheDate", date);
    
    res.status(200).json({
        message:"Attendence list of the date"
    })
}


// @description : get attendance of a day by date
// @route : GET /api/attendence/:date
// @access : public
const getAttendanceById = (req, res)=>{
    
    const id = req.params.id
    console.log("getAttendanceById", id);

    res.status(200).json({
        message:"Attendence by id"
    })
}



module.exports = {
    getAttendenceOfTheDate,
    getAttendanceById
}