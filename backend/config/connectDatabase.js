const mongoose = require("mongoose");

exports.bootstrap = async () => {
  let connectionString = `${process.env.DATABASE_CONNECTION}`;
  try {
    let dbName =
      process.env.TEST_ENV && process.env.TEST_ENV === "test"
        ? process.env.DATABASE_NAME_TEST
        : process.env.DATABASE_NAME;

    return await mongoose.connect(connectionString, {
      dbName: dbName,
      autoIndex: true,
    });
  } catch (e) {
    console.log("----- E ------", e);
    throw new Error(
      "Database is not connect on given string >> " + connectionString
    );
  }
};
