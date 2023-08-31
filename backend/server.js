const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/users");
const factsRouter = require("./routes/facts");

app.use("/users", usersRouter);
app.use("/facts", factsRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
