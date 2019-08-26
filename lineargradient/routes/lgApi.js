var express = require('express');
var app = express();
const port = 8000;
var cors = require('cors');
const fs = require('fs');

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//default get
app.get('/', (req, res) => {
	res.send('PORT 8000');
})

//write svg out to file
app.post('/upload', (req, res) => {

  var s = JSON.stringify(req.body);

  //get rid of {" "}
  var result = '';
  for(var i = 2; i < s.length-2; i++){
      result += s[i];
  }

  //write the file
  fs.writeFile('./Test.svg', result, 'utf-8', (err) =>{ 
      if(err) console.log(err);
  })
})

//read in svg from file and return contents
app.get('/svg', (req, res) => {
  fs.readFile('./Test.svg', 'utf-8', function(err, contents){
    if(err) console.log(err);
    res.send(contents);
  })
})

//make it listen
app.listen(port, (err) => {
	if(err) { console.log(err) };
	console.log('Listening on port ' + port);
})