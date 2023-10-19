
FROM node:20-alpine AS base
WORKDIR /app
COPY . /app
RUN npm install \
&& npm run build \
&& rm -rf node_modules

FROM node:20-alpine AS dev
WORKDIR /app
COPY --from=base ./app/dist ./dist
COPY package.json .
COPY package-lock.json .
RUN npm install --production
EXPOSE 9000
ENTRYPOINT ["npm","start"]


# FROM base as dev

# ENV PORT 9000
# ENV NETWORK homestead
# ENV ALCHEMY_API_KEY 2vu62g7HCFXTWiQE0LX9DwyArfA15oEK

# EXPOSE ${PORT}

# COPY ./package.json /app/package.json

# RUN npm install

# COPY . /app

# ENTRYPOINT ["npm","run", "dev"]

FROM base as test

ENV PORT 9000
ENV NETWORK homestead
ENV ALCHEMY_API_KEY 2vu62g7HCFXTWiQE0LX9DwyArfA15oEK

EXPOSE ${PORT}

COPY ./package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run test
