module.exports = function(app) {

  /********  Api details  **********/
  app.get('/api', function(req, res) {
    res.json({message : 'Internado' , version : 'v1.0.0'});
  });
  /********************************/

  app.get('/express_backend', (req, res) => {
    res.send({express: 'React client is connected to Express server'});
  });

};
