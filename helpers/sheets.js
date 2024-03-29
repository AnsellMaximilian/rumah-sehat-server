const { google } = require("googleapis");
const path = require("path");
const moment = require("moment");

const credentialsPath = path.join(__dirname, "..", "sheets_secret.json");

// const credentials = require(`./${process.env.SECRET_GOOGLE_KEY_NAME}`);
const spreadsheetId = process.env.SPREADSHEET_ID;

async function writeDataToSheet(values, sheetName, range) {
  const auth = new google.auth.GoogleAuth({
    // credentials,
    keyFile: credentialsPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();

  const sheets = google.sheets({ version: "v4", auth: client });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!${range}`,
    valueInputOption: "RAW",
    resource: {
      values,
    },
  });
}

async function readSheet() {
  const auth = new google.auth.GoogleAuth({
    // credentials,
    keyFile: credentialsPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();

  const sheets = google.sheets({ version: "v4", auth: client });

  return await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${process.env.SHEET_NAME}!A2:I`,
  });
}

module.exports = { writeDataToSheet, readSheet };
