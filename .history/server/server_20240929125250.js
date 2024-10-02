require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { HfInference } = require('@huggingface/inference');

const app = express(); // Create the Express app instance
const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

// CORS configuration
app.use(cors({
  origin: '*', // Be cautious with this in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Helper function for API requests
async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return {
      status: 200,
      success: true,
      message: "Successfully fetched the data",
      data: response.data,
    };
  } catch (error) {
    console.error("API request error:", error.response ? error.response.data : error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
      error: error.response ? error.response.data : error.message,
    };
  }
}

// Summarization endpoint
app.post("/summarize", async (req, res) => {
  const { articleContent } = req.body; // Get article content from the request body

  // Log the incoming article content for debugging
  console.log("Received article content:", articleContent);

  if (!articleContent || typeof articleContent !== 'string') {
    return res.status(400).json({ success: false, error: "Invalid article content." });
  }

  try {
    const summary = await hf.summarization({
      model: "facebook/bart-large-cnn", // Choose the model for summarization
      inputs: articleContent,
    });

    // Log the summary response for debugging
    console.log("Summary response from Hugging Face:", summary);

    res.status(200).json({ success: true, summary });
  } catch (error) {
    console.error("Summarization error:", error); // Log the error for debugging
    res.status(500).json({ success: false, error: error.message || "Failed to summarize the article." });
  }
});

// Other endpoints (if any)

// Start the server
const PORT = process.env.PORT || 5173; // or any other available port
app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
