
# #Creating Dockerfile for Frontend react using Vitejs
# FROM node:18-alpine
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]
# #React application use CMD ["npm", "start"]
 
# #running command  ----- > sudo docker build -t react
# #list --->  sudo docker images (check)
# #excute --> sudo docker run -p 80:80 react

FROM node:22-alpine
WORKDIR /app
COPY . .

# Define build arguments for API URLs
ARG REACT_APP_API_URL_LEAVE
ARG REACT_APP_API_URL_USER
ARG FRONTEND_PORT=3000  

# Set environment variables for the build process
ENV REACT_APP_API_URL_LEAVE=$REACT_APP_API_URL_LEAVE
ENV REACT_APP_API_URL_USER=$REACT_APP_API_URL_USER
ENV FRONTEND_PORT=$FRONTEND_PORT

RUN npm install
RUN npm run build

# Expose the port (metadata only, actual port mapping is in docker-compose.yml)
EXPOSE ${FRONTEND_PORT}

# Start the app (assuming a development server; adjust if using a production server)
CMD ["npm", "start"]
