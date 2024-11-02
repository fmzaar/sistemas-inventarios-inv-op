const glob = require('glob');

module.exports = {
  apps: [
    ...glob.sync('./docker/*/ecosystem.config.js').map(p => require(p)),
    ...glob.sync('./packages/*/ecosystem.config.js').map(p => require(p))
  ].flat(),
};
