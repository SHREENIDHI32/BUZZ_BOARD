import React, { useState } from 'react';
import axios from 'axios';

const SummarizeArticle = () => {
  const [articleContent, setArticleContent] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset any previous error

    try {
      const response = await axios.post('http://localhost:5000/summarize', {
        articleContent,
      });

      // Assuming the API returns the summary in response.data.summary_text
      const summaryText = response.data.summary_text; // Ensure this matches your backend response
      setSummary(summaryText);
      console.log('Summary:', summaryText); // Log for debugging
    } catch (error) {
      console.error('Error fetching summary:', error);
      setError('Failed to summarize the article.');
    }
  };

  return (
    <div className="summarize-article">
      <h2>Summarize Article</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={articleContent}
          onChange={(e) => setArticleContent(e.target.value)}
          placeholder="Enter your article content here"
          required
        />
        <button type="submit">Summarize</button>
      </form>

      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p> {/* Display the summary here */}
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p> {/* Display error message if any */}
        </div>
      )}
    </div>
  );
};

export default SummarizeArticle;
