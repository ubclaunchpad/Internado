let appConfig = {}

appConfig.app          = process.env.APP   || 'development';
appConfig.port         = process.env.PORT  ||  '1337';

module.exports = appConfig;
