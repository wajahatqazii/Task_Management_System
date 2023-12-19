var mongoose = require("mongoose");
const Account = require("../app/models/accounts");
const Task = require("../app/models/tasks");
exports.mochaHooks = {
  async beforeAll() {
    console.log("Before Test Start");
    await Account.deleteMany();
    await Task.deleteMany();
  },

  async afterAll() {
    console.log("After Test Start");
    // Account.deleteMany();
    // mongoose.connection.db.dropDatabase();
  },
};
