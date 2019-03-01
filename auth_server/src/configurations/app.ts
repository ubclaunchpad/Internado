let appConfig: any = {};

appConfig.app = process.env.APP_ENVIROMENT || "development";
appConfig.port = process.env.APP_PORT || 5050;

export default appConfig;
