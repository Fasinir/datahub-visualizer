# syntax=docker/dockerfile:1

FROM node:18-alpine3.14 as builder

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm install --force

COPY . ./

CMD [ "npm" "run" "build" "--prod"]

FROM nginx:1.21-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

