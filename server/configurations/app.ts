let appConfig: any = {};

appConfig.app          = process.env.APP   || 'development';
appConfig.port         = process.env.PORT  ||  5000;

appConfig.dbConnectionString  = "postgres://internado@postgres-develop:UBClaunchpad!" +
    "@postgres-develop.postgres.database.azure.com:5432/internado?ssl=false";

export default appConfig;
