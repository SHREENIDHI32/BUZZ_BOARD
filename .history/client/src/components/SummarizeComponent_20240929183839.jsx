// SummarizeComponent.js
import React, { useState } from 'react';
import './SummarizeComponent.css'; // You will create this CSS file

const SummarizeComponent = () => {
  const [articleContent, setArticleContent] = useState('');
  const [summary, setSummary] = useState('');

  const handleSummarize = () => {
    if (!articleContent.trim()) {
      alert('Please enter some article content.');
      return;
    }

    // Simulating API call and response
    const simulatedResponse = {
      success: true,
      summary_text: "As a high schooler, Trae Stephens vowed to find a career that would let him defend his country. He applied to colleges with programs that could prep him for that heroic role. None were interested in a kid from a hardscrabble Ohio town. So he traveled uninvited to Washington, DC, and talked his way into the School of Foreign Service."
    };

    // Check response and update summary text
    if (simulatedResponse.success && simulatedResponse.summary_text) {
      setSummary(simulatedResponse.summary_text);
    } else {
      alert('Failed to summarize the article');
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
