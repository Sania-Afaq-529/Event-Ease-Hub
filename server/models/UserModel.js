const mongoose = require("mongoose");
const crypto = require("crypto");
const { createToken } = require("../services/authentication");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "SERVICE_PROVIDER"],
      default: "USER",
    },
    profileImageUrl: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/256/206/206853.png",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next(); // Only hash the password if it has been modified

  const salt = crypto.randomBytes(16).toString();

  const hashedPassword = crypto
    .createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

UserSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });

  const salt = user.salt;
  const hashedPassword = user.password;

  const userProvidedHashed = crypto
    .createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedHashed)
    throw new Error("Password incorrect");

  const token = createToken(user);

  return { user, token: token };
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
