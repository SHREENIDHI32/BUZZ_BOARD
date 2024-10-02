import React, { useState } from 'react';

const SummarizeArticle = () => {
  const [articleContent, setArticleContent] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!articleContent.trim()) {
      setError('Please enter some article content.');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articleContent }),
      });

      const data = await response.json();
      console.log("Received data from API:", data); // Debug log to check the received data

      if (data.success && data.summary_text) {
        setSummary(data.summary_text); // Set the summary from summary_text
      } else {
        setError('Failed to summarize the article');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setArticleContent('');
    setSummary('');
    setError('');
  };

  return (
    <div style={styles.container}>
      <h2>Summarize Article</h2>
      <textarea
        style={styles.textarea}
        rows="10"
        cols="50"
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)}
        placeholder="Paste your article content here..."
      />
      <br />
      <button 
        onClick={handleSummarize} 
        disabled={loading} 
        style={styles.button}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>
      <button onClick={handleClear} style={styles.clearButton}>
        Clear
      </button>

      {/* This is where the summary is conditionally rendered */}
      {summary && (
        <div style={styles.summaryContainer}>
          <h3>Summary</h3>
          <p>{summary}</p> {/* This should display the summary text */}
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    marginTop: '80px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  clearButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  summaryContainer: {
    marginTop: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
};

export default SummarizeArticle;
