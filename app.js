const express = require ("express");

//Init app

const app = express();

//Views location
app.set('views', __dirname + '/views');

//Set tamplete engine
app.set('view engine', "ejs");

//Setup MongoDB
const MongoClient = require('mongodb').MongoClient;
const MongoURL= "mongodb://localhost:27017/todolist";

//Conecting to MongoDB
MongoClient.connect(MongoURL, function(error, db) {
	if (error) {
		console.log(error);
	}else
	{
		console.log('Database connected succesfully!');
		todos = db.collection('todos');
	}
});


//Routes
app.get('/', function(req, res) {
	res.render ("index", {name: "Faqja fillestare", title: "Index"});
});
app.get ('/todos/:id', function(req, res) {
	res.render("Show")
});
app.post ('/todos/add', function(req, res) {
	res.redirect ("/")
});
app.get ('/todos/edit/:id', function(req, res) {
	res.render("edit")
});
app.post('/todos/update/:id', function(req, res)
{
	res.redirect("/");
});
app.get ('/todos/delete/:id', function(req, res) {
	res.redirect("/");
});

					
//Runing app
app.listen( 3000, function(){
	console.log ("App running at http://localhost:3000");
});