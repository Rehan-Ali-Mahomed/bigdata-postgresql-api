FROM node:18

# Working dir
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Get the app source code
COPY index.js .

# Port to expose
EXPOSE 8080

# Run the server
CMD ["node", "index.js"]
