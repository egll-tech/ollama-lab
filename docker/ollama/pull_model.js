const axios = require('axios');

async function pullModel() {
  try {
    const llm = process.env.LLM;
    const url = process.env.OLLAMA_BASE_URL;

    console.log(`Pulling model ${llm} using ${url}`);

    if (llm && url && !['gpt-4', 'gpt-3.5', 'claudev2'].includes(llm)) {
      const apiUrl = new URL('./api/pull', url);

      // Prepare the request payload
      const payload = {
        name: llm,
        // Optionally, add insecure and stream parameters if needed
        // insecure: true,
        stream: true,
      };

      // Make the POST request
      const response = await axios.post(apiUrl, payload, {
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
    } else {
      console.log(
        'OLLAMA model only pulled if both LLM and OLLAMA_BASE_URL are set and the LLM model is not gpt.'
      );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

pullModel();
