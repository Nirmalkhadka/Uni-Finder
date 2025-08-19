import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

app.use(express.json()); // For parsing application/json

// Endpoint to receive data from frontend and forward it to Flask
app.post('/send-to-flask', async (req, res) => {
  try {
    // Log the incoming request body for debugging
    console.log('Received data from frontend:', req.body);

    // Forwarding the request data from the frontend to Flask API
    const response = await axios.post('http://127.0.0.1:5000/recommend', req.body);
    
    // Log the response from Flask API
    console.log('Received response from Flask API:', response.data);

    // Send the AI model's response back to the frontend
    res.json(response.data);
  } catch (error) {
    // Log the error for debugging
    console.error('Error connecting to Flask API:', error);

    // Send a response with the error message
    res.status(500).json({ error: 'Error connecting to Flask API', message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
