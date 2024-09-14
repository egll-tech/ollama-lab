import axios from 'axios';

/**
 * List of ollama models that can't be pulled.
 */
const BLACKLISTED_MODELS = ['gpt-4', 'gpt-3.5', 'claudev2'];

/**
 * API Endpoint to target to be able to pull a model.
 * {@see https://github.com/ollama/ollama/blob/main/docs/api.md#pull-a-model}
 */
const OLLAMA_PULL_API = './api/pull';
const main = async () => {
  const llm = process.env.LLM;
  const url = process.env.OLLAMA_BASE_URL;

  console.log(`Pulling model ${llm} into ${url}`);

  if (!llm || !url || BLACKLISTED_MODELS.includes(llm)) {
    console.error(
      'Script can only pull a model in ollama if both LLM and OLLAMA_BASE_URL are set and the LLM model is not gpt.'
    );
    return;
  }

  const targetURL = new URL(OLLAMA_PULL_API, url);

  // Prepare the request payload
  const payload = {
    name: llm,
    // Optionally, add insecure and stream parameters if needed
    // insecure: true,
    stream: true,
  };

  // Make the POST request
  const response = await axios.post(targetURL.href, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'stream', // For handling streamed responses
  });

  // Handle streaming responses
  response.data.on('data', (chunk) => {
    const data = JSON.parse(chunk.toString());
    console.log(`Status: ${data.status}`);
    if (data.status === 'success') {
      console.log('Model pull completed successfully.');
    }
  });

  response.data.on('end', () => {
    console.log('Streaming ended.');
  });
};

// Immediately invoke the async main function
main().catch((err) => {
  console.error('Unhandled error in main function:', err);
});
