require('dotenv').config();
const express  		          = require('express');
const app      		    	  = express();
const morgan            	  = require('morgan');
const bodyParser       		  = require('body-parser');
const passport          	  = require('passport');
const appConfig    	       	  = require('./configurations/app');
const dbConfig    	       	  = require('./configurations/db');


/*Application Configurations*/
app.use(morgan('dev')); //req logging
app.use(bodyParser.json()); //parsing json req formats
app.use(bodyParser.urlencoded({ extended: true })); //parsing form req formats
app.disable('etag');
require('./configurations/passport')(passport);


/*Database Configurations*/
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to database:', dbConfig.db_name);
})
.catch(err => {
    console.error('Unable to connect to database:',dbConfig.db_name, err);
});
if(appConfig.app==='dev'){
    //models.sequelize.sync();//creates table if they do not already exist
    models.sequelize.sync({ force: true });//deletes all tables then recreates them
}

/*Routes*/
require('./routes/v1.js')(app,passport);

/*RunServer*/
const internado = app.listen(appConfig.port);
console.log('Server has successfully started on PORT: ' + appConfig.port);
module.exports = internado;