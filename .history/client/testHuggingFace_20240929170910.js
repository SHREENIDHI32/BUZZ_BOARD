const { HfInference } = require('@huggingface/inference');
require("dotenv").config();

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);

async function testHuggingFaceSummarization() {
  const articleContent = "Your test content goes here.";
  try {
    const summary = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: articleContent,
    });
    console.log('Summary:', summary);
  } catch (error) {
    console.error('Hugging Face API Error:', error);
  }
}

testHuggingFaceSummarization();
