const axios = require('axios');

async function testHuggingFaceAPI() {
  try {
    const response = await axios.get('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      headers: {
        Authorization: `Bearer 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`, // Replace with your actual API key
      },
    });
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error accessing Hugging Face API:', error.response ? error.response.data : error.message);
  }
}
const response = await fetch('http://localhost:5000/summarize', {

testHuggingFaceAPI();
