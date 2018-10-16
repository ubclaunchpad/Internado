import server from './web.server'

require('dotenv').config();
const express  		          = require('express');
const app      		    	  = express();
const appConfig    	       	  = require('./configurations/app');
const morgan            		= require('morgan');
const bodyParser       		  = require('body-parser');


/*Configuration*/
app.use(morgan('dev')); //req logging
app.use(bodyParser.json()); //parsing json req formats
app.use(bodyParser.urlencoded({ extended: true })); //parsing form req formats

/*Routes*/
require('./routes/v1.js')(app);

/*RunServer*/
app.listen(appConfig.port);
console.log('Server has successfully started on PORT: ' + appConfig.port);

let webServer = new server();
webServer.start(() => {
    console.log('Started Internado Webserver')
})
    
