let dbConfig = {};

dbConfig.db_dialect   = process.env.DB_DIALECT    || 'postgres';
dbConfig.db_host      = process.env.DB_HOST       || 'localhost';
dbConfig.db_port      = process.env.DB_PORT       || '5432';
dbConfig.db_name      = process.env.DB_NAME       || 'Internado';
dbConfig.db_user      = process.env.DB_USER       || 'postgres';
dbConfig.db_password  = process.env.DB_PASSWORD   || 'ad,om';


module.exports = dbConfig;
