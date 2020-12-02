const mongoose = require("mongoose");

const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    last_name: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    city: { type: String },
    address: { type: String },
    salt: { type: String },
    privalages: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    console.log("Plain Password:-", plainpassword);
    console.log("Encrypted Password:-", this.encry_password);
    console.log("Plain Password:-", this.securePassword(plainpassword));
    return this.securePassword(plainpassword) === this.encry_password;
  },

  // this method takes the password from user
  // and then converts it into hashed version before saving it to database
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
