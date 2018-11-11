# Node TODO App

This is an example of TODO web application based on Node.js and MongoDB.

## Requirements

- NodeJS (v8.7.0)
- MongoDB (v3.4.10)

## Installation

1. Clone the repository: `https://github.com/Una13/TODO-App.git`
2. Install the application: `npm install`
3. Install apidoc: `npm install apidoc -g`
4. Generate apidoc: `npm run-script doc`
5. Configure app parameters in `config/config.js`
6. Configure log level, default is `info`: export `LOGG_LEVEL=debug`
7. Start the server: `npm start`
8. Open apidoc in browser: `http://localhost:3000/apidoc/`

### Test environment

7. Install mocha: `npm install mocha -g`
8. Run tests: `env NODE_ENV=test mocha 'test/task.js'`