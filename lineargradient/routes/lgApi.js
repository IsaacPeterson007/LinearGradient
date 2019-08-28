const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const fsExtra = require('fs-extra');
var cors = require('cors');
app.use(cors());
app.use(express.json());

//default get
app.get('/', (req, res) => {
	res.send('PORT 8000');
})

//GET the svg from server (just local files for now)
app.get('/svg', (req, res) => {
  fs.readFile('../../src/Temp.svg', 'utf-8', function(err, contents){
    if(err) console.log(err);
    res.send(contents);
  })
})

//POST svg to server (just local files for now)
app.post('/upload', (req, res) => {

  var svg = req.body.svg;

  fsExtra.outputFile('../../src/Temp.svg', svg, 'utf-8', (err) =>{ 
      if(err) console.log(err);
  })
})

//make it listen
app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})