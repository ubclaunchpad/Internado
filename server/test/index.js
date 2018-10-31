const chai        = require('chai');
const landing      = require('./landing.test');
const chaiHttp = require('chai-http');
const server =  require('../');

chai.should();
chai.use(chaiHttp);



describe('Nexus API test', () => {

  describe('/GET api', () => {
      it('it should GET the api version', (done) => landing(done,chai,server));
  });

});