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
