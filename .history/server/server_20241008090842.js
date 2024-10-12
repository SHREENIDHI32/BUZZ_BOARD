require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { HfInference } = require('@huggingface/inference');

const app = express();
const apiKey = process.env.NEWS_API_KEY;
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Summarization endpoint
app.post("/summarize", async (req, res) => {
  const { articleContent } = req.body;

  if (!articleContent || typeof articleContent !== 'string') {
    return res.status(400).json({ success: false, error: "Invalid article content." });
  }

  try {
    const summaryResponse = await hf.summarization({
      model: "facebook/bart-large-cnn",  // Change model if needed
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
