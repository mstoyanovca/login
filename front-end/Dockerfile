# === STAGE 1: Build the Angular App ===
FROM node:20-alpine AS build
WORKDIR /app
# Copy package files separately to leverage Docker build cache
COPY package*.json ./
RUN npm ci
# Copy the rest of the application source code
COPY . .
# Compile the Angular app into production static files
RUN npm run build --configuration=production

# === STAGE 2: Serve the App using OpenShift-safe Nginx ===
FROM nginx:alpine
# Remove default configuration and static files
RUN rm -rf /usr/share/nginx/html/* && rm /etc/nginx/conf.d/default.conf
# Copy custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy compiled static assets from the build stage
COPY --from=build /app/dist/front-end/browser /usr/share/nginx/html
# Adjust file and directory permissions for OpenShift's arbitrary non-root user
RUN chmod -R g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chown -R nginx:root /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html
# Expose an unprivileged port (8080 is standard for OpenShift)
EXPOSE 8080
# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
