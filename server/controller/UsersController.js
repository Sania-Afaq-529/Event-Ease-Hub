const UserModel = require("../models/UserModel");
const crypto = require("crypto");

async function userRegister(req, res) {

    const check_email = await UserModel.findOne({ email: req.body.email });
    if (check_email) return res.status(400).send({
    status:400,
    message:"Email already exists"
    });
  const user_register = await UserModel.create(req.body);

  if(!user_register) return res.status(400).send("User not created");

  return res.send({
    status:200,
    message:"User created successfully",
    data:user_register
  });
}

async function userUpdate(req, res) {
  const user_update = await UserModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  return res.send(user_update);
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    const check_user = await UserModel.findOne({ email: email, });

    if (!check_user) return res.status(400).send({
        status:400,
        message:"User does not exist please go to register page to create an account"
        });

    const userProvidedHashed = crypto
    .createHmac("sha256", check_user.salt)
    .update(password)
    .digest("hex");

    console.log("check_user",check_user)

    if (userProvidedHashed != check_user.password) return res.status(400).send({
        status:400,
        message:"Incorrect email or password"
        });
    const user_login = await UserModel.matchPassword(email, password);

    return res.send(user_login);
  } catch (error) {
    return { error: "Incorrect email or password" };
  }
}

async function userDelete(req, res) {
  const user_delete = await UserModel.findByIdAndDelete(req.params.id);

  return res.send(user_delete);
}

async function getAllUsers(req, res) {
  const user_login = await UserModel.find({});

  return res.send(user_login);
}

module.exports = {
  userRegister,
  userLogin,
  getAllUsers,
  userUpdate,
  userDelete,
};