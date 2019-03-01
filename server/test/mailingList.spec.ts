import app from "../server";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Mailing list API tests", () => {
    it("should return email on valid add request", (done) => {
        const email: string = "test_email@gmail.com";
        chai.request(app)
            .post(`/mailing_list?email=${email}`)
            .end((err, res) => {
                expect(res.body.email).to.equal(email);
                expect(res.status).to.equal(201);
                done();
            });
    });

    it("should return error when adding invalid email", (done) => {
        const email: string = "invalid_email";
        chai.request(app)
            .post(`/mailing_list?email=${email}`)
            .end((err, res) => {
                expect(res.body.error).to.be.ok;
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("should return error when email is missing", (done) => {
        const email: string = "test_email@gmail.com";
        chai.request(app)
            .post(`/mailing_list?incorrect=${email}`)
            .end((err, res) => {
                expect(res.body.error).to.be.ok;
                expect(res.status).to.equal(400);
                done();
            });
    });

    after((done) => {
        app.close();
        done();
    });
});
