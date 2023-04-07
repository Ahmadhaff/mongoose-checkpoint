const mongoose = require("mongoose");
const Person = require("./models/person");
const express = require("express");
const app = express();
require('dotenv').config();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


  app.use('/api' , require('./routes/PersonRoutes'));


app.listen(3000, () => {
  console.log("Server started on port 3000");
});
