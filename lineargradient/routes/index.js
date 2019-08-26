// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

const fs = require('fs');
const path = require('path');

module.exports = (app) => {
	fs.readdirSync('routes/').forEach((file) => {
		require(`./${file.substr(0, file.indexOf('.'))}`)(app);
	})
}
