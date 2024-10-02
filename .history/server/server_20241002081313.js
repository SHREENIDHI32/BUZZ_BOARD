require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { HfInference } = require('@huggingface/inference');

const app = express(); 
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
    // Call to Hugging Face for summarization
    const summary = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: articleContent,
    });

    // Respond with the summary
    return res.status(200).json({ success: true, summary_text: summary.summary_text });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
