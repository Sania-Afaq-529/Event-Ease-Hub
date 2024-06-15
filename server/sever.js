require("dotenv").config();

const express = require("express");
const db_connection = require("./db_connection/db");
const { user_routes } = require("./routes/UserRoutes");
const path = require("path");
const cors = require("cors");
const { deal_routes } = require("./routes/DealRoutes");

const app = express();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.resolve("./Public")));

app.use("/users", user_routes);
app.use("/deals",deal_routes)

const PORT = process.env.PORT || 8080;

db_connection(
  app.listen(PORT, () => {
    console.log("Mongo DB connected");
    console.log(`App is Start Running on port ${PORT}`);
  })
);