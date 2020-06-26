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

// handles all the "all articles" requests
app.route("/articles")
  .get(function(req, res) {
    Article.find(function(err, foundArticles){
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      };
    });
  })
  .post(function(req, res){
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(function(err){
      if (!err) {
        res.send("Successfully added a new article.")
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req,res){
    Article.deleteMany(function(err){
      if(!err){
        res.send("Successfully deleted all articles.");
      } else {
        res.send(err);
      }
    });
  });

// Handles the individual articles requests
app.route("/articles/:articleTitle")
  .get(function(req, res) {
    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No Articles with that title were found");
      }
    });
})
.put(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
      if (!err) {
        res.send("Article updated successfully!");
      }
    });
})
.patch(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  );
})
.delete(function(req, res){
  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if(!err){
        res.send("Successfully deleted article.");
      } else {
        res.send(err);
      }
    });
});

// Assigns port to listen to when fired up
app.listen(3000, function(){
  console.log("The server has been started on port 3000");
});
