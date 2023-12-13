FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm i --silent
COPY . .
RUN npm run build
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 