let appConfig: any = {};

appConfig.app = process.env.APP || "development";
appConfig.port = process.env.PORT || 5050;

export default appConfig;
