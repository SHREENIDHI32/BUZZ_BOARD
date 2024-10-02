const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // To allow frontend to make requests

// Simple dummy summarization function (you can replace this with a real summarizer)
function summarizeArticle(content) {
  if (content.length <= 100) return content; // If content is short, return it as is.
  
  // Truncate content to simulate summarization (e.g., first 100 characters)
  return content.substring(0, 100) + '...'; 
}

app.post('/summarize', (req, res) => {
  const { articleContent } = req.body;

  if (!articleContent) {
    return res.status(400).json({ success: false, message: 'No content provided' });
  }

  // Get the summary from the function
  const summaryText = summarizeArticle(articleContent);

  // Return the summary in the response
  res.json({ success: true, summary_text: summaryText });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
