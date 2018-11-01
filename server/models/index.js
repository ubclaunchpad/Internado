'use strict';
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const dbConfig                = require('./../configurations/db');
const basename  = path.basename(__filename);
const db        = {};


const sequelize = new Sequelize(dbConfig.db_name, dbConfig.db_user, dbConfig.db_password, {
  host: dbConfig.db_host,
  dialect: dbConfig.db_dialect,
  port: dbConfig.db_port,
  operatorsAliases: false
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;