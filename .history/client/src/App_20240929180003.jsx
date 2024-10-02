import React, { useState } from 'react';
import axios from 'axios';

const SummarizeArticle = () => {
  const [articleContent, setArticleContent] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState(null); // To handle errors

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Reset any previous error

    try {
      const response = await axios.post('http://localhost:5000/summarize', {
        articleContent,
      });

      // Assuming the API returns the summary in response.data.summary_text
      setSummary(response.data.summary_text);
      console.log('Summary:', response.data.summary_text); // Log for debugging
    } catch (error) {
      console.error('Error fetching summary:', error);
      setError('Failed to summarize the article.'); // Set an error message
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
          <p>{summary}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizeArticle;
