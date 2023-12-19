const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index"); // Import your Express app instance

const expect = chai.expect;
chai.use(chaiHttp);

describe("Login API", () => {
  it("should return a valid JWT token on successful login", (done) => {
    const credentials = {
      email: "test@gmail.com",
      password: "test123",
    };

    chai
      .request(app)
      .post("/api/account/login")
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User Login Successfully");
        done();
      });
  });

  it("should return an error for invalid credentials", (done) => {
    const invalidCredentials = {
      email: "test@gmail12.com",
      password: "test123",
    };

    chai
      .request(app)
      .post("/api/account/login")
      .send(invalidCredentials)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  // Add more test cases as needed
});
