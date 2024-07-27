const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
  email: { type: String, required: [true, "please provide an email!"], unique: [true, "email already exists!"] },
  password: { type: String, required: [true, "please provide a password"], unique: false },
})

// "create a user table or collection if there is no table with that name already".
module.exports = mongoose.model.User || mongoose.model("User", UserSchema);