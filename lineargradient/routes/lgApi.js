var express = require('express');
var router = express.Router();

/* GET lg page. */
router.get('/', function(req, res, next) {
  res.send('tis working');
});


module.exports = router;