const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var fs = require('fs')
  var conversion = require("phantom-html-to-pdf")();
  conversion({ html: "<h1>Hello World</h1>" }, function (err, pdf) {
    var output = fs.createWriteStream('target.pdf')
    console.log(pdf.logs);
    console.log(pdf.numberOfPages);
    // since pdf.stream is a node.js stream you can use it
    // to save the pdf to a file (like in this example) or to
    // respond an http request.
    pdf.stream.pipe(output);
  });
});

module.exports = router;
