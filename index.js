const express = require("express");
const database = require("./db/db");
require("dotenv").config();
const app = express();
const router = require("./routes/route");
const bodyParser = require("body-parser");
const cors = require("cors");

database();

const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
  });  