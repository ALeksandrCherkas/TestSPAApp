FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev --legacy-peer-deps --no-audit --no-fund

COPY --from=build-stage /app/build ./build

COPY server.js ./
COPY bd.js ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "server.js"]


