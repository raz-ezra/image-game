FROM node:18-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/


FROM base AS dev

ENV NODE_ENV=development

EXPOSE 3000
EXPOSE 5173

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

COPY . .

EXPOSE 3000

RUN npm install -g @nestjs/cli
RUN npm install -g turbo

RUN npm run build -- --no-cache

CMD [ "node", "server/dist/main" ]