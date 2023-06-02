# build backend
FROM node:lts-alpine as backend

RUN npm install pnpm -g

WORKDIR /app

COPY ./package.json /app

COPY ./pnpm-lock.yaml /app

RUN pnpm install

COPY ./ /app

RUN pnpm build

# service
FROM node:lts-alpine

WORKDIR /app

COPY ./package.json /app

COPY --from=backend /app/node_modules ./node_modules

COPY --from=backend /app/build /app/build

EXPOSE 3002

CMD ["npm", "run", "prod"]
