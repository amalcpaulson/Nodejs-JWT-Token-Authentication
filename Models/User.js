const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  userfisrtname: String,
  userlastname: String,
  useremail: String,
  userpassword: String,
  userid: String,
  usersex: String,
  phone: String,
  DOB: String,
  Job: String,
});

module.exports = mongoose.model("User", UserSchema);
