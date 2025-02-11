if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const router = require("../routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/", router);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
