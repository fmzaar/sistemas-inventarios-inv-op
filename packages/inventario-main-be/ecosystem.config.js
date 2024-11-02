const path = require('path');

module.exports = [
  {
    name: path.basename(__dirname),
    cwd: __dirname,
    //script: 'C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js',
    script: 'npm',
    args: 'run start:dev',
  },
];
