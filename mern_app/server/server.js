const express = require("express");
const employeRouter = require("./routes/employeRouter");
const errorHandler = require("./middleware/errorHandler");
const { aiRouter } = require("./routes/aiRouter");
const connectDB = require("./config/dbConnection");
const attendenceRouter = require("./routes/attendenceRouter");
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000;

connectDB();
const app = express()

app.use(express.json())
app.use("/api/employees", employeRouter)
app.use("/api/attendence", attendenceRouter)
app.use("/api/ai", aiRouter)

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log("Project is running on this PORT : ", PORT);
})

