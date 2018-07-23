const express=require('express');
const bodyParser=require('body-Parser');
const MongoClient=require('mongodb').MongoClient
const app=express();


app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine','ejs');

app.get('/', (req, res) => {
  //res.sendFile('D:/Programs/Projects'+'/index.html');
  db.collection('quotes').find().toArray(function(err, results) {
  res.render('index.ejs',{quotes:results})
})
});

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body,(err,result) => {
  	if(err) return console.log(err)

  	console.log('\n Your new quote has been saved to the database\n')
  res.redirect('/');
  })
});

var db;

MongoClient.connect('mongodb://localhost:27017/',(err,client) => {

  if (err) return console.log(err);
    db = client.db('zell');

  app.listen(3000, () => {
	 console.log("Listening on 3000");
  })

});

console.log("May node be with you");
