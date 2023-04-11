const { google } = require("googleapis");
const path = require("path");

const credentialsPath = path.join(__dirname, "..", "sheets_secret.json");

// const credentials = require(`./${process.env.SECRET_GOOGLE_KEY_NAME}`);
const spreadsheetId = process.env.SPREADSHEET_ID;

async function writeDataToSheet(values) {
  const auth = new google.auth.GoogleAuth({
    // credentials,
    keyFile: credentialsPath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();

  const sheets = google.sheets({ version: "v4", auth: client });

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${process.env.SHEET_NAME}!A2`,
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
    range: `${process.env.SHEET_NAME}!A2:H`,
  });
}

module.exports = { writeDataToSheet, readSheet };
