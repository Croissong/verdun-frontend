FROM node:latest AS builder
WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install
Add ./ ./
RUN yarn build

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/public .
CMD cp
