FROM node:lts-alpine AS build
WORKDIR /app
COPY . .
RUN npm install

RUN npx ng build --configuration production

FROM nginx:alpine
COPY --from=build /app/dist/front-end /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
