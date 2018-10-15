module.exports = function(app) {

  /********  Api details  **********/
  app.get('/api', function(req, res) {
    res.json({message : 'Internado' , version : 'v1.0.0'});
  });
  /********************************/


};
