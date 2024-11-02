const path = require('path');
const fs = require('fs');

const defaultEnvPath = path.join(__dirname, '.env.defaults');
const envPath = path.join(__dirname, '.env');

const config = require('dotenv-defaults').parse(
  fs.existsSync(envPath) ? fs.readFileSync(envPath) : '',
  fs.existsSync(defaultEnvPath) ? fs.readFileSync(defaultEnvPath) : '',
);

module.exports = config;
