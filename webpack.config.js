switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./webpack/config.cloud');
    break;
  case 'dev':
  case 'development':
  case 'local':
  default:
    module.exports = require('./webpack/config.local');
}
