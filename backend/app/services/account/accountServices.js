const Account = require("../../models/accounts");
const ObjectId = require("mongoose").Types.ObjectId;

const error = new Error();
error.status = "NOT_FOUND";
error.message = null;
error.data = null;

const accountService = {
  login: async (body) => {
    const { email, password } = body;
    const selectedUser = await Account.findOne({ email }).lean();
    if (helper.decrypt(selectedUser?.password) === password) {
      delete selectedUser?.password;
      const user = { ...selectedUser };
      return await helper.jwt.createJWT(null, user);
    }
    error.status = "UNAUTHORIZED";
    error.message = `Account unauthorize to access system`;
    throw error;
  },

  addUser: async (body) => {
    const { email, password, first_name, last_name } = body;

    const userExist = await Account.findOne({ email });
    if (!userExist) {
      const addUser = new Account({
        first_name,
        last_name,
        email,
        password,
      });
      await addUser.save();
      const token = await accountService.login({
        email,
        password,
      });
      return token;
    } else {
      error.status = "VALIDATION_ERR";
      error.message = `User Not Created (Email Already Exist)`;
      throw error;
    }
  },

  getUsers: async () => {
    return await Account.find().lean();
  },

  getUser: async (body) => {
    const { user_id } = body;
    return await Account.findOne({
      _id: new ObjectId(user_id),
    })
      .select("-password")
      .lean();
  },

  updateUser: async (body) => {
    const { first_name, last_name, user_id } = body;
    const getuser = await Account.findById({ _id: user_id });
    if (getuser) {
      return Account.findByIdAndUpdate(
        { _id: user_id },
        { first_name, last_name },
        { new: true }
      );
    }

    error.status = "BAD_REQUEST";
    error.message = `User Not Found`;
    throw error;
  },

  deleteUser: async (body) => {
    const { user_id, authAccount } = body;

    if (user_id?.toString() === authAccount?.toString()) {
      return await Account.delete({ _id: user_id });
    }
    error.status = "BAD_REQUEST";
    error.message = `you have no permission to delete the user`;
    throw error;
  },
};

module.exports = accountService;
