FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./


FROM base AS dev

ENV NODE_ENV=development

RUN npm install
COPY . .
CMD npm run start:dev



FROM dev AS test

ENV NODE_ENV=test

CMD npm run test



FROM test AS test-cov

ENV NODE_ENV=test

CMD npm run test:cov


FROM test AS test-watch

ENV NODE_ENV=test
ENV GIT_WORK_TREE=/usr/src/app GIT_DIR=/usr/src/app/.git
RUN apk add git
CMD npm run test:watch



FROM base AS prod

ENV NODE_ENV=production
RUN npm install --only=production

RUN npm install -g @nestjs/cli
RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main" ]