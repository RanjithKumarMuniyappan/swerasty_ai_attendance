
const expressAsyncHandler = require("express-async-handler");
const { AI_SERVICE_URL } = require("../constants");
const { default: axios } = require("axios");
const FormData = require("form-data");



// @description : validate provided image
// @route : POST /api/ai
// @access : public
const validateImage = expressAsyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error("No image file provided.")
    }

    // 1. Create a form and append the image data
    const formData = new FormData();
    formData.append('file', req.file.buffer, { filename: 'snapshot.jpg' });

    // 2. Make a POST request to the Python AI service
    console.log('Forwarding image to Python AI service...');
    const response = await axios.post(AI_SERVICE_URL, formData, {
        headers: {
            ...formData.getHeaders()
        }
    });

    // 3. Get the result from the AI service
    const recognizedNames = response.data.recognized_names;
    console.log('Recognition result:', recognizedNames);

    // You can have multiple faces in one image
    const name = recognizedNames.length > 0 ? recognizedNames[0] : 'Unknown';

    // 4. Here you would add your logic to save to MongoDB
    if (name !== 'Unknown') {
        // Your a-wait Attendance.create({ name: name, timestamp: new Date() });
        console.log(`Attendance logged for ${name}`);
    }

    // 5. Send the result back to the React frontend
    res.json({ success: true, name: name });
})


module.exports ={
    validateImage
}