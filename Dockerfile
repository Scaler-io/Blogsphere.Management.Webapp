# syntax=docker/dockerfile:1

FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build -- --configuration production

FROM nginx:1.25-alpine AS runtime

RUN apk add --no-cache gettext dos2unix

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.d/99-runtime-env.sh
COPY --from=build /app/dist/Blogsphere.Management.Webapp /usr/share/nginx/html

RUN dos2unix /docker-entrypoint.d/99-runtime-env.sh && chmod +x /docker-entrypoint.d/99-runtime-env.sh

EXPOSE 80
