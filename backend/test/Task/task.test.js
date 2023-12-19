const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../index"); // Import your Express app instance
const jwt = require("jsonwebtoken");
const Task = require("../../app/models/tasks"); // Adjust the path accordingly

const expect = chai.expect;
chai.use(chaiHttp);

describe("Task API", () => {
  let authToken;
  let task = null;
  // Before running the tests, create a user and obtain an auth token
  before(async () => {
    // Generate a JWT token for the created user
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
        authToken = res.body.data;
      });
  });

  it("should create a new task with title and description", (done) => {
    const newTask = {
      title: "Task Title",
      description: "Task Description",
      status: "todo",
    };

    chai
      .request(app)
      .post("/api/task/")
      .set("Authorization", `${authToken}`)
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(200); // Assuming 200 is the status code for successful creation
        expect(res.body)
          .to.have.property("message")
          .equal("Task Created Successfully");
        expect(res.body.data).to.have.property("title").equal(newTask.title);
        expect(res.body.data)
          .to.have.property("description")
          .equal(newTask.description);
        task = res.body.data;
        done();
      });
  });

  it("should update title, description and status", (done) => {
    const newTask = {
      task_id: task?._id,
      title: "Task Title2",
      description: "Task Description2",
      status: "inPending",
    };

    chai
      .request(app)
      .put("/api/task/")
      .set("Authorization", `${authToken}`)
      .send(newTask)
      .end((err, res) => {
        expect(res).to.have.status(200); // Assuming 200 is the status code for successful creation
        expect(res.body)
          .to.have.property("message")
          .equal("Task Updated Successfully");
        expect(res.body.data).to.have.property("title").equal(newTask.title);
        expect(res.body.data)
          .to.have.property("description")
          .equal(newTask.description);
        done();
      });
  });

  it("should delete task", (done) => {
    chai
      .request(app)
      .delete(`/api/task/${task?._id}`)
      .set("Authorization", `${authToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200); // Assuming 200 is the status code for successful creation
        expect(res.body)
          .to.have.property("message")
          .equal("Task Deleted Successfully");
        done();
      });
  });

  // Add more test cases as needed
});
