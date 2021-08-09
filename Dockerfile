FROM node:14.15.5 AS builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build


FROM node:14.15.5-alpine
WORKDIR /app
COPY --from=builder /app ./

ENV PORT=80

EXPOSE 80
CMD ["yarn", "start:prod"]