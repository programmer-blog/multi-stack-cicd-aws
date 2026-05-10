# Use a light version of Node
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Open the port and start
EXPOSE 3000
CMD ["node", "index.js"]