import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making requests

const SummarizeArticle = () => {
  const [articleContent, setArticleContent] = useState(''); // State for article content
  const [summary, setSummary] = useState(''); // State for summary text
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(''); // State for error messages

  const handleSummarize = async () => {
    if (!articleContent.trim()) {
      setError('Please enter some article content.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      // Use axios to send a POST request to the backend
      const response = await axios.post('http://localhost:5000/summarize', {
        articleContent: articleContent,
      });
  
      // Check the response data to set the summary
      if (response.data.success && response.data.summary_text) {
        setSummary(response.data.summary_text); // Set summarized content
      } else {
        setError('Failed to summarize the article.');
      }
    } catch (error) {
      setError('An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleClear = () => {
    setArticleContent(''); // Clear article input
    setSummary(''); // Clear summary
    setError(''); // Clear error
  };

  return (
    <div style={styles.container}>
      <h2>Summarize Article</h2>
      <textarea
        style={styles.textarea}
        rows="10"
        cols="50"
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)} // Update article content on change
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

      {/* Conditionally render the summary */}
      {summary && (
        <div style={styles.summaryContainer}>
          <h3>Summary</h3>
          <p>{summary}</p> {/* Display the summary here */}
        </div>
      )}

      {/* Display error messages if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

// Styles for the component
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
