// In your Node.js/Express server file
const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer'); // To handle file uploads from React


const PORT = 5000;

const app = express();
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory

// This is the URL of your running Python AI service
const AI_SERVICE_URL = 'http://127.0.0.1:8000/recognize';

// The endpoint that your React frontend will call
app.post('/api/attendance/check', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image file provided.' });
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

    } catch (error) {
        console.error('Error connecting to AI service:', error.message);
        res.status(500).json({ success: false, error: 'Could not process the image.' });
    }
});

app.listen(3001, () => {
    console.log('MERN Backend listening on port 3001');
});