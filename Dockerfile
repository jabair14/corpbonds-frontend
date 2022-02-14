FROM node:latest as builder
WORKDIR /app
COPY . .
RUN npm i && npm run ng build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/capstone-frontend .
ENTRYPOINT ["nginx", "-g", "daemon off;"]