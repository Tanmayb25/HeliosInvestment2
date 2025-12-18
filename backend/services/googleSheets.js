import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

// Sheet name mappings
const SHEET_NAMES = {
  contact: process.env.CONTACT_SHEET_NAME || 'ContactMessages',
  quiz: process.env.QUIZ_SHEET_NAME || 'QuizResponses'
};

/**
 * Get authenticated Google Sheets client
 */
function getSheetsClient() {
  if (!SPREADSHEET_ID) {
    throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID environment variable is not set');
  }

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error('Google Service Account credentials are not set. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY');
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  return google.sheets({ version: 'v4', auth });
}

/**
 * Ensure the sheet exists, create if it doesn't
 */
async function ensureSheetExists(sheets, sheetName) {
  try {
    // Try to get the sheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID
    });

    const sheetExists = spreadsheet.data.sheets?.some(
      sheet => sheet.properties.title === sheetName
    );

    if (!sheetExists) {
      // Create the sheet
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetName
              }
            }
          }]
        }
      });

      // Add headers based on sheet type
      const headers = sheetName === SHEET_NAMES.contact
        ? ['Timestamp', 'Type', 'Full Name', 'Email', 'Phone', 'Message', 'Source']
        : ['Timestamp', 'Type', 'Full Name', 'Email', 'Phone', 'Total Score', 'Result Title', 'Result Message', 'Answers', 'Source'];

      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetName}!A1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      });

      console.log(`✅ Created sheet: ${sheetName}`);
    }
  } catch (error) {
    console.error(`❌ Error ensuring sheet exists: ${error.message}`);
    throw error;
  }
}

/**
 * Append data to a Google Sheet
 * @param {string} sheetType - 'contact' or 'quiz'
 * @param {object} data - Data to append
 */
export async function appendToSheet(sheetType, data) {
  try {
    const sheets = getSheetsClient();
    const sheetName = SHEET_NAMES[sheetType];

    if (!sheetName) {
      throw new Error(`Invalid sheet type: ${sheetType}. Must be 'contact' or 'quiz'`);
    }

    // Ensure sheet exists
    await ensureSheetExists(sheets, sheetName);

    // Prepare row data based on sheet type
    let rowData;
    if (sheetType === 'contact') {
      rowData = [
        data.timestamp || new Date().toISOString(),
        data.type || 'contact_form',
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.message || '',
        data.source || ''
      ];
    } else if (sheetType === 'quiz') {
      rowData = [
        data.timestamp || new Date().toISOString(),
        data.type || 'quiz_submission',
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.totalScore || '',
        data.resultTitle || '',
        data.resultMessage || '',
        data.answers || '',
        data.source || ''
      ];
    } else {
      throw new Error(`Unknown sheet type: ${sheetType}`);
    }

    // Append the row
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData]
      }
    });

    console.log(`✅ Data appended to ${sheetName}:`, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error appending to Google Sheets:', error);
    throw error;
  }
}

