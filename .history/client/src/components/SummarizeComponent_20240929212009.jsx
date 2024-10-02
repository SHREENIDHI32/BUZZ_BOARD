// SummarizeComponent.js
import React, { useState } from 'react';
import './SummarizeComponent.css'; // You will create this CSS file

const SummarizeComponent = () => {
  const [articleContent, setArticleContent] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    if (!articleContent.trim()) {
      alert('Please enter some article content.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ article: articleContent }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Check response and update summary text
      if (data.success && data.summary_text) {
        setSummary(data.summary_text);
      } else {
        alert('Failed to summarize the article');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error summarizing the article');
    }
  };

  const handleClear = () => {
    setArticleContent('');
    setSummary('');
  };

  return (
    <div className="container">
      <h2>Summarize Article</h2>
      <textarea
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Paste your article content here..."
      />
      <br />
      <button onClick={handleSummarize}>Summarize</button>
      <button onClick={handleClear}>Clear</button>

      {summary && (
        <div className="summary-container">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizeComponent;
