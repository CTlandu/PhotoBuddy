const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({

  // identifier
  id: { type: String, required: [true, "please provide an id"], unique: [true, "id already exists!"] },
  email: { type: String, required: [true, "please provide an email!"]},

  phoneNumber: {type: String, default: null},
  timeJoined: {type: Date, default: null},
  preferredName: { type: String, default: null},
  lastName: { type: String, default: null},
  pronouns: { type: String, default: null},
  birthday: { type: Date, default: null},
  zipcode: { type: String, default: null},

  // sociam media accounts
  instagram: {type: String, default: null},
  linkedin: {type: String, default: null},
  twitter: {type: String, default: null},
  facebook: {type: String, default: null},

  // images
  avatar: {type: String, default: null},
  

},{ timestamps: true })

// "create a user table or collection if there is no table with that name already".
module.exports = mongoose.model.User || mongoose.model("User", UserSchema);