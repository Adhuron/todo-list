const express = require ("express");

//Init app

const app = express();

//Views location
app.set('views', __dirname + '/views');

//Set tamplete engine
app.set('view engine', "ejs");

//body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



//Setup MongoDB
const MongoClient = require('mongodb').MongoClient;
const MongoURL= "mongodb://localhost:27017/todolist";
const ObjectId= require ('mongodb').ObjectId;

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
	
		todos.find().toArray(function(error, docs) {
		if (error) {
			console.log(error);
		}	else {
		res.render ("index", {docs: docs});		
		}
		});

	
});
app.get ('/todos/:id', function(req, res) {
	var id = ObjectId(req.params.id);
	todos.findOne({_id: id}, function(error, doc) {
		if(error) {
			console.log(error);
		}else {
			res.render("Show", {doc: doc});
		}
	});

	
});
app.post ('/todos/add', function(req, res) {
	todos.insert({ title: req.body.title, description: req.body.description }, function(error, result) {
		if (error) {
			console.log(error);
		}else {
		res.redirect ("/")	
		}
	} );


	
});

app.get('/todos/edit/:id', function(req, res) {
	var id = ObjectId(req.params.id);
	todos.findOne({_id: id}, function(error, doc) {

		if(error) {
			console.log(error);
		} else {
			res.render("edit", {doc: doc})
		}
	});
});


app.post('/todos/update/:id', function(req, res)
{
	var id = ObjectId(req.params.id);
	todos.updateOne({_id: id}, 
	{$set: {title: req.body.title, description: req.body.description}}, function(error, result) {
		if (error) {
			console.log(error);
		}else {
		res.redirect("/");	
		}
	});

	
});



app.get ('/todos/delete/:id', function(req, res) {
var id = ObjectId(req.params.id);

todos.deleteOne({_id: id}, function(error, result) {
	if(error) {
		console.log(error);
	}else {
		res.redirect("/");
	}
} )


	



});

					
//Runing app
app.listen( 3000, function(){
	console.log ("App running at http://localhost:3000");
});