const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());  // To allow the frontend to make requests

app.post('/summarize', (req, res) => {
  const { articleContent } = req.body;
  
  // Perform the summarization or other logic here
  const summaryText = summarizeArticle(articleContent); // Assuming you have this function

  console.log(`Summary: ${summaryText}`);  // Log in terminal for debugging

  // Send the response to the frontend
  res.json({ success: true, summary_text: summaryText });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// Dummy summarize function
function summarizeArticle(content) {
  return `This is a summary of: ${content}`;
}
