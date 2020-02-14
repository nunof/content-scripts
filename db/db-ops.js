const loki = require('lokijs')
const fs = require('fs');

var db = new loki('poemizer.db');

// ADD
/*
db.loadDatabase({}, function(err) {
  if (err) console.log("error : " + err); 
  else {
	var adjectives = db.addCollection('adjectives');
	console.log(JSON.stringify(db.listCollections()));
	console.log("database loaded.");
	//var adjectives = db.getCollection('adjectives');

	fs.readFileSync('adjectives.txt').toString().split(/\r?\n/).forEach(function(line){
  		adjectives.insert( { entry : line } );
	})

	db.saveDatabase(function(err) {
  		if (err) console.log("error : " + err); 
  		else console.log("database saved."); 
	});
  }
});
*/

//LOAD
/*
let rawdata = fs.readFileSync('data'); 
db.loadJSON(rawdata);
nouns = db.getCollection('nouns');
verbs = db.getCollection('verbs');
adverbs = db.getCollection('adverbs');
adjectives = db.getCollection('adjectives');
*/

//LIST

db.loadDatabase({}, function(err) {
  if (err) console.log("error : " + err); 
  else { 
	console.log("database loaded."); 
	nouns = db.getCollection('nouns');
	//verbs = db.getCollection('verbs');
	//adverbs = db.getCollection('adverbs');
	adjectives = db.getCollection('adjectives');
	console.log(JSON.stringify(db.listCollections()));
	console.log(JSON.stringify(adjectives));
  }
});

//OUTPUT
//console.log(JSON.stringify(db.listCollections()));
//console.log(JSON.stringify(nouns));

