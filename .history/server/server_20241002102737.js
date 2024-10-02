require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
const { HfInference } = require('@huggingface/inference'); // Importing Hugging Face Inference

const app = express();
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY); // Initialize Hugging Face with your API key

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Summarization endpoint
app.post("/summarize", async (req, res) => {
  const { articleContent } = req.body;

  if (!articleContent || typeof articleContent !== 'string') {
    return res.status(400).json({ success: false, error: "Invalid article content." });
  }

  try {
    const summaryResponse = await hf.summarization({
      model: "facebook/bart-large-cnn",  // You can change the model if needed
      inputs: articleContent,
    });

    const summarizedText = summaryResponse.summary_text; // Accessing the summary text

    if (summarizedText) {
      res.status(200).json({ success: true, summary_text: summarizedText });
    } else {
      res.status(500).json({ success: false, error: "Failed to summarize the article." });
    }
  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to summarize the article." });
  }
});

// Sample Authentication Routes (if needed)
// const authRoutes = require('./routes/auth'); // Uncomment if you have authentication routes
// app.use('/api/auth', authRoutes); // Uncomment if you have authentication routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
