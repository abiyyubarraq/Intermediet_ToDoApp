//exporting any tools (express & mongodb)
let express = require('express')
const { Script } = require('vm')
let mongodb = require('mongodb').MongoClient
//mongo versi 3.0++ ke atas tambahin .MongoClient
let mongoObjectId = require('mongodb').ObjectId;
//mongo versi 3.0++ perlu juga import objectId kaya gini

//root system (server and database)
let app = express()
let db
//open public folder as root
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//connect to my mongodb
let connectionString = //your mongodb connect string here
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
  db = client.db()
  app.listen(3000)
})


app.get('/', function(req, res) {
  //convert db t array on js
    db.collection('items').find().toArray(function (err,items){
        res.send(`<!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple-Intermediet To-Do App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
  <div class="container">
  <h1 class="display-4 text-center py-1">Simple-Intermediet To-Do App</h1>
  
  <div class="jumbotron p-3 shadow-sm">
  <form class= "formClass" action="/create-item" method="POST">
  <div class="d-flex align-items-center">
  <input class="fieldClass" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
  <button class="btn btn-primary">Add New Item</button>
  </div>
  </form>
  </div>
  
  <ul class="ulClass list-group pb-5">
 
  </ul>
  
  </div>
  <script>
 let items = ${JSON.stringify(items)}
  </script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script src='./browser.js'></script>
  </body>
  </html>`)
        })
 
})

//export to db

app.post('/create-item', function(req, res) {
  db.collection('items').insertOne({text: req.body.text}, function(err,info) {
    //ni juga agak dimodif di vers 3.0++
    res.json({ _id: info.insertedId.toString(), text: req.body.text })
  })
})



app.post('/update-item', function(req, res) {
  db.collection('items').findOneAndUpdate({_id: new mongoObjectId(req.body.id)}, {$set: {text: req.body.text}}, function() {
    res.send("Success")
   
  })
})


app.post('/delete-item', function(req, res) {
  db.collection('items').deleteOne({_id: new mongoObjectId(req.body.id)} ,function () {
    res.send("succes")
  })
})
