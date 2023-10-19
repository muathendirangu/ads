
FROM node:20-alpine as base

WORKDIR /app

FROM base as dev

ENV PORT 9000
ENV NETWORK homestead
ENV ALCHEMY_API_KEY 2vu62g7HCFXTWiQE0LX9DwyArfA15oEK

EXPOSE ${PORT}

COPY ./package.json /app/package.json

RUN npm install

COPY . /app

ENTRYPOINT ["npm","run", "dev"]

FROM base as test

ENV PORT 9000
ENV NETWORK homestead
ENV ALCHEMY_API_KEY 2vu62g7HCFXTWiQE0LX9DwyArfA15oEK

EXPOSE ${PORT}

COPY ./package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run test
