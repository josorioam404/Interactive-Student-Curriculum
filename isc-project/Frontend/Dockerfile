# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Accept build argument
ARG BUILD_MODE=production

# Install dependencies
COPY package*.json ./
RUN npm ci  

# Copy all frontend files and build
COPY . .

RUN if [ "$BUILD_MODE" = "development" ]; then \
      cp .env.development .env.production; \
    fi

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

