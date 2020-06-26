//jshint esversion:6

// Required for setting up express and body parsers
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
// Assignments for express, body Parser, and Mongoose
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
// sets view engine to ejs
app.set('view engine', 'ejs');
// sets how to use body parser and express
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Assignment for schema and models in mongoose
const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Article = new mongoose.model("Article", articleSchema);

// Assigns port to listen to when fired up
app.listen(3000, function(){
  console.log("The server has been started on port 3000");
});
