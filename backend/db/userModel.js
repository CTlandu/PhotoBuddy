const mongoose = require("mongoose");

const ModelInfoSchema = new mongoose.Schema({
  model_bio: { type: String, default: null },
  model_images: { type: Array, default: [] },
  model_experience: { type: String, default: null },
  model_lookingfor: { type: [String], default: [] },
});

const PhotographerInfoSchema = new mongoose.Schema({
  photographer_bio: { type: String, default: null },
  photographer_images: { type: Array, default: [] },
  photographer_experience: { type: String, default: null },
  photographer_lookingfor: { type: [String], default: [] },
});

const ContactSchema = new mongoose.Schema({
  // phoneNumber: { type: String, default: null },
  // phoneNumber_preferred: { type: Boolean, default: false },
  instagram: { type: String, default: null },
  instagram_preferred: { type: Boolean, default: false },
  linkedin: { type: String, default: null },
  linkedin_preferred: { type: Boolean, default: false },
  twitter: { type: String, default: null },
  twitter_preferred: { type: Boolean, default: false },
  facebook: { type: String, default: null },
  facebook_preferred: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema(
  {
    // identifier
    id: {
      type: String,
      required: [true, "please provide an id"],
      unique: [true, "id already exists!"],
    },
    email: { type: String, required: [true, "please provide an email!"] },

    timeJoined: { type: Date, default: null },
    preferredName: { type: String, default: null },
    lastName: { type: String, default: null },
    pronouns: { type: String, default: null },
    birthday: { type: Date, default: null },
    zipcode: { type: String, default: null },
    addresses: [
      {
        formattedAddress: String,
        placeId: String,
        lat: Number,
        lng: Number,
      },
    ],

    // 头像
    avatar: { type: String, default: null },

    // Contact
    contact: { type: ContactSchema, default: {} },

    // consolidated model info
    model_info: { type: ModelInfoSchema, default: {} },

    // consolidated photographer info
    photographer_info: { type: PhotographerInfoSchema, default: {} },
  },
  { timestamps: true }
);

// "create a user table or collection if there is no table with that name already".
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
