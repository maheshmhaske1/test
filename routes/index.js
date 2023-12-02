const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const fs = require('fs');

/* GET home page. */
router.get('/', async function (req, res, next) {
 return res.json({
  status:1
 })
});

module.exports = router;
