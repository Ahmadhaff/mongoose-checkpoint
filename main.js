const mongoose = require("mongoose");
const Person = require("./models/person");
const express = require("express");
const app = express();

app.use(express.json());

mongoose.connect(
    "mongodb+srv://haffoudhi:haffoudhi@cluster0.3odwltl.mongodb.net/mongooseCheckPoint?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

  app.use('/api' , require('./routes/PersonRoutes'));


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
