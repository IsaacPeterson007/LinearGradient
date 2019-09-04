const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const fsExtra = require('fs-extra');
var cors = require('cors');
app.use(cors());
app.use(rawBody);
//app.use(express.json());

var path = '../../src/Temp.svg';

//raw body function for text not json
//source: https://stackoverflow.com/questions/12345166/how-to-force-parse-request-body-as-plain-text-instead-of-json-in-express
function rawBody(req, res, next){
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}

//default get
app.get('/', (req, res) => {
	res.send('PORT 8000');
})

//GET the svg from server (just local files for now)
app.get('/svg', (req, res) => {
  fs.readFile(path, 'utf-8', function(err, contents){
    if(err) console.log(err);

    //check for nti tag
    expr = /nti-linear-gradient/;
    if(expr.test(contents)){
      res.send(contents);
    }else{
      res.status(500).send('svg not marked by nextthought');
    }
  })
})

//POST svg to server (just local files for now)
app.post('/upload', (req, res) => {
  fsExtra.outputFile(path, JSON.stringify(req.rawBody), 'utf-8', (err) =>{ 
      if(err) console.log(err);
  })
})

//make it listen
app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})