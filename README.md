# API Service

The api layer that handles all backend functions. This service runs the main backend for the [UI project](https://github.com/fin-sazee/platform-backend).

## Dependencies

Docker

## Scripts

### `yarn`

Adds all the dependencies.

### `create .env file and copy contents of env.example`

Adds environment variables

### `yarn docker:dev`

Creates a docker container with the postgres db.

### `yarn migrate:latest`

Runs all the database migrations.

### `yarn dev`

Runs the API in dev mode. This uses `nodemon` to watch files and recompile and restart the server.

### `start http://localhost:4000`
