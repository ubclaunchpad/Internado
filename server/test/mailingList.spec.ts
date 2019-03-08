import app from "../server";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import "mocha";
import {createConnection} from "typeorm";

chai.use(chaiHttp);
const expect = chai.expect;
const testEmail: string = "test01@gmail.com";

describe("Mailing list API tests", () => {
    before((done) => {
        createConnection().then(() => {
            console.log("Created test connection");
            done();
        });
    });

    it("should return email on valid add request", (done) => {
        chai.request(app)
            .post(`/mailing_list?email=${encodeURIComponent(testEmail)}`)
            .end((err, res) => {
                expect(res.body.result.email).to.equal(testEmail);
                expect(res.status).to.equal(201);
                done();
            });
    });

    it("should return error when adding invalid email", (done) => {
        const email: string = "invalid_email";
        chai.request(app)
            .post(`/mailing_list?email=${encodeURIComponent(email)}`)
            .end((err, res) => {
                expect(res.body.error).to.be.ok;
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("should return error when email is missing", (done) => {
        const email: string = "test_email@gmail.com";
        chai.request(app)
            .post(`/mailing_list?incorrect=${encodeURIComponent(email)}`)
            .end((err, res) => {
                expect(res.body.error).to.be.ok;
                expect(res.status).to.equal(400);
                done();
            });
    });

    it("should return success when deleting email", (done) => {
        chai.request(app)
            .delete(`/mailing_list?email=${encodeURIComponent(testEmail)}`)
            .end((err, res) => {
                expect(res.body.result).to.be.ok;
                expect(res.status).to.equal(200);
                done();
            });
    });

    after((done) => {
        app.close();
        done();
    });
});
