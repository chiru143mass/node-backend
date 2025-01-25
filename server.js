
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// A simple route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

// Example POST route to handle image generation
app.post('/generate-image', async (req, res) => {
  const { prompt, n } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: prompt,
        n: n,
        size: "256x256"
      },
      {
        headers: {
          "Authorization": `Bearer YOUR_OPENAI_API_KEY`
        }
      }
    );

    const images = response.data.data;
    res.json({ message: `Generated ${n} images`, images });
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Error generating image. Please try again later." });
  }
});

// Log that the server is starting
console.log(`Starting the server...`);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
