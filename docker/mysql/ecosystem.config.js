const config = require('../load-env');

module.exports = {
  name: 'mysql-mongodb',
  cwd: __dirname,
  script: 'docker-compose',
  args: 'up',
  env: {
    ...(config || {})
  },
}
