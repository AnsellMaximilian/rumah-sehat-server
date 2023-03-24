const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const HBS = require("../helpers/HBS");

const generateHTML = (templatePath, data) => {
  const template = fs.readFileSync(templatePath, "utf-8");

  const createHTML = HBS.compile(template);
  const html = createHTML(data);

  return html;
};

const createPDFStream = async (templateName, data, dynamicPage = false) => {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();

    const html = generateHTML(templateName, data);

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    await page.emulateMediaType("screen");

    const dynamicHeight = await page.evaluate(() => {
      return document.documentElement.offsetHeight;
    });

    const pdfStream = await page.createPDFStream({
      ...(dynamicPage ? { height: dynamicHeight + "px" } : { format: "A4" }),
      printBackground: true,
    });

    pdfStream.on("end", async () => {
      await browser.close();
    });

    return pdfStream;
  } catch (error) {
    console.log(error);
    await browser.close();
  }
};

const savePDF = async (templateName, data, savePath) => {
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();

    const html = generateHTML(templateName, data);

    await page.setContent(html, {
      waitUntil: "domcontentloaded",
    });

    await page.emulateMediaType("screen");

    const pdf = await page.pdf({
      format: "A4",
      path: savePath,
      printBackground: true,
    });

    browser.close();
  } catch (error) {
    await browser.close();
    throw new Error(error);
  }
};

module.exports = { generateHTML, createPDFStream, savePDF };
