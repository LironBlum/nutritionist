"use strict";
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../start');
const expect = chai.expect;
chai.use(chaiHttp);


describe('post /nutritionist/v1/updateUserData', function() {
    describe(' correct request', function () {
        let error, result;
        before(function (done) {
            chai.request(app)
                .post('/nutritionist/v1/updateUserData')
                .set('accept', 'application/json')
                .end(function (err, res) {
                    error = err;
                    result = res;
                    done();
                });
        });

        it('Should not fail', function () {
            expect(error).to.be.null;
        });
        it('Should return status code 200', function () {
            expect(result).to.have.status(200);
        });
    });
});