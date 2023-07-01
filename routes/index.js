const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

/* GET home page. */
router.get('/', async function (req, res, next) {
  // Create a document
  const doc = new PDFDocument();

  // Pipe the document directly to the response stream
  res.setHeader('Content-Disposition', 'attachment; filename="output.pdf"');
  doc.pipe(res);

  // Add content to the document
  doc
    .fontSize(25)
    .text('Some text with an embedded font!', 100, 100)
    .addPage()
    .fontSize(25)
    .text('Here is some vector graphics... high level', 100, 100)
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300')
    .scale(0.6)
    .translate(470, -380)
    .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    .fill('red', 'even-odd')
    .restore()
    .addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize the PDF document
  doc.end();
});

module.exports = router;
