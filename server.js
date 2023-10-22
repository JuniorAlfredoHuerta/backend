const express = require('express');
const mongoose = require("mongoose");
const router = require('./src/routes/user');
const app = express();
const port = process.env.PORT ||5000;
const userRoutes  = require('./src/routes/user');

require("dotenv").config();

//middleware 
app.use('/api', userRoutes)


app.get('/api', (req, res) => {
  //res.json({"users": ["A","B","C"]});
  res.send("WELCOME");  
});

mongoose
  .connect(process.env.MONGODB_ATLAS_URI)
  .then(() => console.log("Conectado a MongoDB ATLAS"))
  .catch((error) => console.error(error));

app.listen(port, () => {console.log("Server started on port 5000",port)})
