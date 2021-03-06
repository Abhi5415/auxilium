const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const borrowers = require("./routes/api/borrowers");
const transactions = require("./routes/api/transactions");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/borrowers", borrowers);
app.use("/transactions", transactions);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`));
