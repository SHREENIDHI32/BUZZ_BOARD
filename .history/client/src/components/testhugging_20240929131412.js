const axios = require('axios');

async function testHuggingFaceAPI() {
  try {
    const response = await axios.get('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
      headers: {
        Authorization: `Bearer your_api_key_here`, // Replace with your API key
      },
    });
    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error accessing Hugging Face API:', error.response ? error.response.data : error.message);
  }
}

testHuggingFaceAPI();
