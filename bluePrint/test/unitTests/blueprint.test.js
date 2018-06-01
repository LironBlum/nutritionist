'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../start');
const expect = chai.expect;
chai.use(chaiHttp);


describe('GET /blueprintexample', () => {
  describe(' correct request', () => {
    let error, result;
    before(done => {
      chai.request(app)
        .get('/blueprintexample')
        .set('accept', 'application/json')
        .end((err, res) => {
          error = err;
          result = res;
          done();
        });
    });

    it('Should not fail', () => {
      expect(error).to.be.null;
    });
    it('Should return status code 200', () => {
      expect(result).to.have.status(200);
    });

  });
});