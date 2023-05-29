var express = require('express'),
    path = require('path'),
    app = express();

var bodyParser = require('body-parser')
var fs = require('fs')

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
  //console.dir(request.body)
  let data = request.body;
  fs.writeFileSync('public/topShelf.json', JSON.stringify(data));
  response.writeHead(200, {'Content-Type': 'text/html'})
  response.end(JSON.stringify(data));
  //response.end('thanks')
})

const port = 3000
app.listen(port)
console.log(`Listening at http://localhost:${port}`)