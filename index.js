const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/auth');
const crudRoute = require('./routes/CRUD');

//Connect to DB
//password should be stored in an env variable, but for the sake of the exam im leaving it here
mongoose.connect("mongodb+srv://leisure_exam:ilikepie@cluster0.cohyd.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true },
() => console.log("connected to database"));

//Middleware
app.use(express.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if ('OPTIONS' == req.method) {
     res.sendStatus(200);
   }
   else {
     next();
   }});



//Routes
app.use('/api/user', authRoute);
app.use('/api/crud', crudRoute);

app.listen(3000, () => console.log("Server is up at port 3000"));



