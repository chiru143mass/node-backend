// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// A simple route
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

// Example POST route to handle image generation
app.post('/generate-image', (req, res) => {
  const { prompt, n } = req.body;
  // Here you can handle OpenAI API request and generate image based on the prompt.
  res.json({ message: `Generating ${n} images with prompt: ${prompt}` });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
