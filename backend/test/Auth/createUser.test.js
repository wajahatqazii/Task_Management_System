const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index"); // Import your Express app instance

const expect = chai.expect;
chai.use(chaiHttp);

describe("Sign Up API", () => {
  it("should return a valid JWT token on successful login", (done) => {
    const credentials = {
      email: "test@gmail.com",
      password: "test123",
      first_name: "test",
      last_name: "test2",
    };

    chai
      .request(app)
      .post("/api/account/")
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("User Created Successfully");
        done();
      });
  });

  it("should return an error for invalid inputs", (done) => {
    const invalidInput = {
      email: "",
      password: "test123",
      first_name: "test",
      last_name: "test2",
    };

    chai
      .request(app)
      .post("/api/account/")
      .send(invalidInput)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.message).to.deep.include({
          email: "Please enter email",
        });
        done();
      });
  });

  // Add more test cases as needed
});
