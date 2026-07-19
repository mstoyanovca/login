# Stage 1: Build the Angular Application
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the application with NGINX
FROM nginx:alpine
# Copy our customized unprivileged configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Wipe default static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy production assets from Stage 1
COPY --from=build /app/dist/front-end/browser /usr/share/nginx/html

# Grant read/write access to the root group for NGINX paths (OpenShift random user compliance)
RUN chgrp -R 0 /var/cache/nginx /var/log/nginx /var/run && \
    chmod -R g=u /var/cache/nginx /var/log/nginx /var/run

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
