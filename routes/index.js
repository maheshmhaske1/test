const express = require('express');
const router = express.Router();
const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Get HTML content from HTML file
    const htmlPath = path.join(__dirname, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Generate the PDF
    const pdf = await page.pdf({
      path: 'result.pdf',
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    });

    // Close the browser instance
    await browser.close();

    // Send the PDF as a response to the API request
    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
