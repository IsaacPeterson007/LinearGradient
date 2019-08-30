const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const fsExtra = require('fs-extra');
var cors = require('cors');
app.use(cors());
app.use(express.json());

var path = '../../src/Temp.svg';

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
  fsExtra.outputFile(path, JSON.stringify(req.body), 'utf-8', (err) =>{ 
      if(err) console.log(err);
  })
})

//make it listen
app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})