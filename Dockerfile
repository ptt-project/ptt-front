FROM node:16-alpine

WORKDIR /app

ENV NODE_ENV=development

COPY . .

RUN yarn install

CMD ["yarn", "dev"]
