var express = require('express');
var router = express.Router();
var fs = require('fs');
var pdf = require('html-pdf');
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  var htmlFilePath = path.join(__dirname, 'index.html');
  var html = fs.readFileSync(htmlFilePath, 'utf8');
  var options = { format: 'Letter' };

  pdf.create(html, options).toFile('./businesscard.pdf', function (err, result) {
    if (err) return console.log(err);
    console.log(result); // { filename: '/app/businesscard.pdf' }
  });
});

module.exports = router;
