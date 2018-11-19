let appConfig: any = {};

appConfig.app          = process.env.APP   || "development";
appConfig.port         = process.env.PORT  ||  5000;

appConfig.dbConnectionString = "postgres://postgres:postgres1!@localhost:5432/internado?ssl=false";

export default appConfig;
