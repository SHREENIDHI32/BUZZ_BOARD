const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // To allow requests from your frontend

// Assume summarizeArticle() is a function that works as expected in your terminal
// You need to ensure that the same output is captured and returned.

async function summarizeArticle(content) {
  // The correct summarization logic that worked in your terminal
  // For example: return the content processed by an external API or library
  const summarizedContent = content;  // Replace this with actual summarization logic

  console.log("Summarized Output: ", summarizedContent); // Ensure correct output in the terminal
  return summarizedContent;
}

app.post('/summarize', async (req, res) => {
  const { articleContent } = req.body;

  if (!articleContent) {
    return res.status(400).json({ success: false, message: 'No content provided' });
  }

  try {
    // Call the correct summarization function and wait for the result
    const summaryText = await summarizeArticle(articleContent);

    // Send the correct summary text back to the frontend
    res.json({ success: true, summary_text: summaryText });
  } catch (error) {
    // Catch and handle any errors
    res.status(500).json({ success: false, message: 'Error summarizing article', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
