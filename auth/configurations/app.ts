let appConfig: any = {};

appConfig.app = process.env.APP || "development";
appConfig.port = process.env.PORT || 5000;

export default appConfig;
