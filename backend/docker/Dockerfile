# Stage 1: install the dependencies
FROM node:12-alpine as dependencyInstaller

# Specify the "working directory" for the rest of the stage
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

# Stage 2: run the server
FROM node:12-alpine

## Add metadata
LABEL version=1.0
LABEL maintainer="Omar Doma"

## Specify the "working directory" for the rest of the stage
WORKDIR /app

## Copy built node modules and binaries without including the toolchain
COPY --from=dependencyInstaller /app/node_modules node_modules

## Add application code
COPY . .

# Transpile TypeScript into JavaScript
RUN npm run build

## Allows port 3000 to be publicly available
EXPOSE 3000

## Run the server
CMD ["npm", "run", "start:prod"]