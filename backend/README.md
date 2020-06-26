# react-chat-backend

The socket.io backend for react-chat :tada:.

## Technology

- Node.js v12
- TypeScript
- Socket.io v2

## How to setup the environment manually

1. Install Node.js v12 if you don't have it installed on your machine
2. Clone the repo
3. Run `npm i`
4. Try to recreate the .env file by looking at the schema in `src/config/index.ts` or Ask the project's maintainer for the .env file and put in the project's root directory

## How to setup the environment with Docker

1. Install Docker if you don't have it installed on your machine
2. Try to recreate the .env file by looking at the schema in `src/config/index.ts` or Ask the project's maintainer for the .env file and put in the project's root directory

## How to run for Development manually

`npm run watch`

## How to run for Development with Docker

`docker-compose -f docker/docker-compose.dev.yml up --build --renew-anon-volumes`

## How to run for Production manually

`npm run build && npm run start:prod`

## How to run for Production with Docker

`docker-compose -f docker/docker-compose.yml up --build`

&#9400; Omar Doma 2020
