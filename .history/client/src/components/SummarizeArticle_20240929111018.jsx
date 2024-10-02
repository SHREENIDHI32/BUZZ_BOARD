import React, { useState } from 'react';

const SummarizeArticle = () => {
  const [articleContent, setArticleContent] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleContent }),
      });

      const data = await response.json();
      if (data.success) {
        setSummary(data.summary);
      } else {
        setError('Failed to summarize the article');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Summarize Article</h2>
      <textarea
        rows="10"
        cols="50"
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)}
        placeholder="Paste your article content here..."
      />
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {summary && (
        <div>
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SummarizeArticle;
