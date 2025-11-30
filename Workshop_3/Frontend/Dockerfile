# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Accept build arguments
ARG VITE_PYTHON_API_URL=http://localhost:8000
ARG VITE_JAVA_API_URL=http://localhost:8080

# Install dependencies
COPY package*.json ./
RUN npm ci  

# Copy all frontend files
COPY . .

# Create .env.production file with the build args
RUN echo "VITE_PYTHON_API_URL=${VITE_PYTHON_API_URL}" > .env.production && \
    echo "VITE_JAVA_API_URL=${VITE_JAVA_API_URL}" >> .env.production

RUN cat .env.production

# Build with production mode
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

