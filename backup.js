var express = require('express'),
    path = require('path'),
    app = express();

var bodyParser = require('body-parser')
var fs = require('fs')

var index = 
// Express Middleware for serving static files
app.use(express.static('public'))

var thingo = false;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

app.post('/', function(request, response) {
  console.log('POST /')
  console.dir(request.body)
  let data = request.body;
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(JSON.stringify(data));
  console.log(data.somekey)
  console.log(JSON.stringify(data.somekey));
  if (JSON.stringify(data.somekey) == JSON.stringify("somevalue")) {
    
    console.log("SEXX")
    thingo = !thingo
  }
  //response.end('thanks')
})

const port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)