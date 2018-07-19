var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://Harkesh:a1a2a3a4a5@ds139841.mlab.com:39841/item_list";
const cors = require("cors")
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}))
app.use(cors())
var list


app.get('/', function (req, res) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("item_list");
  dbo.collection("items").find({}).toArray(function(err, result) {
    if (err) throw err;
    list=result;
    db.close();
  });
})
  res.send(list);
})
app.post("/",function(req,res){
  console.log(req.body)
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("item_list");
  var myobj = req.body;
  dbo.collection("items").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log(" document inserted");
    db.close();
  });
});
  res.send("document added")
})
 
app.delete("/",function(req,res){
  console.log(req.body)
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("item_list");
  var myobj = req.body;
  dbo.collection("items").deleteOne(myobj, function(err, res) {
    if (err) throw err;
    console.log(" document deleted");
    db.close();
  });
});
  res.send("document deleted")
})


 
app.listen(3005)