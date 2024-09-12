FROM node:lts-slim 

# Set working directory
WORKDIR /app

# Installing dependency.
RUN npm install axios@1.7.7

# Copy HTTP request to pull model.
COPY docker/ollama/pull_model.js ./pull_model.js 

ENTRYPOINT ["node", "pull_model.js"]