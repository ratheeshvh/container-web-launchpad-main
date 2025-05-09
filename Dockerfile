
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies for better layer caching
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

# Copy nginx configuration
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html

# Create a non-root user
RUN adduser -D -H -u 1000 -s /sbin/nologin appuser

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q --spider http://localhost:8080/ || exit 1

# Command to run the server - this will get overridden by nginx's entrypoint
# but is included for documentation purposes
CMD ["nginx", "-g", "daemon off;"]
