const express = require("express");
const {
  userRegister,
  userLogin,
  getAllUsers,
  userDelete,
  userUpdate,
} = require("../controller/UsersController");

const user_routes = express.Router();

user_routes.post("/register", userRegister);

user_routes.post("/login", userLogin);

user_routes.get("/get-all", getAllUsers);

user_routes.put("/update", userUpdate);

user_routes.delete("/delete/:id", userDelete);

module.exports = {
  user_routes,
};