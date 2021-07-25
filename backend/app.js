const express = require("express");
const mongoose= require('mongoose')
const cors = require("cors");


mongoose
  .connect(
    `mongodb+srv://nouran:239mYB-6_D_dgb!@Cluster0.oudbr.mongodb.net/covidTracker?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
const users = require("./routes/User");
app.use("/routes/User", users);
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on ${port}`));

