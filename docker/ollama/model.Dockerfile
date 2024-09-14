FROM node:lts-slim 

# Set working directory
WORKDIR /app

# Copy HTTP request to pull model.
COPY docker/ollama/pull_llm.js ./pull_llm.js 

# Runs pull script.
ENTRYPOINT ["node", "pull_llm.js"]