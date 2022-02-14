FROM node:latest as builder
WORKDIR /app
COPY . .

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

RUN npm i && npm run ng build


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/capstone-frontend .

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'