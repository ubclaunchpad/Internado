let appConfig = {}

appConfig.app          = process.env.APP   || 'development';
appConfig.port         = process.env.PORT  ||  5000;

module.exports = appConfig;
