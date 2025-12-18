# Helios Investment Backend API

Backend server for handling contact form and quiz submissions, and sending data to Google Sheets.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Google Sheets API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

4. Create a Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and create
   - Click on the created service account
   - Go to "Keys" tab > "Add Key" > "Create new key"
   - Choose JSON format and download

5. Create a Google Spreadsheet:
   - Create a new Google Spreadsheet
   - Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
   - Share the spreadsheet with the service account email (found in the JSON file you downloaded)
   - Give it "Editor" permissions

6. Configure Environment Variables:
   - Copy `.env.example` to `.env`
   - Fill in the values:
     - `GOOGLE_SHEETS_SPREADSHEET_ID`: Your spreadsheet ID
     - `GOOGLE_SERVICE_ACCOUNT_EMAIL`: From the JSON file (client_email)
     - `GOOGLE_PRIVATE_KEY`: From the JSON file (private_key) - keep the quotes and \n characters

### 3. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

### POST /api/contact
Submit contact form data.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

### POST /api/quiz
Submit quiz results.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "totalScore": 25,
  "resultTitle": "You're On The Right Path",
  "resultMessage": "Your finances show discipline...",
  "answers": [
    {
      "questionId": 1,
      "question": "How would you describe...",
      "selectedScore": 3,
      "selectedAnswer": "Well-diversified..."
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz submitted successfully"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Helios Backend API is running"
}
```

## Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `GOOGLE_SHEETS_SPREADSHEET_ID`: Your Google Spreadsheet ID
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Service account email
- `GOOGLE_PRIVATE_KEY`: Service account private key
- `CONTACT_SHEET_NAME`: Name of the contact sheet (default: ContactMessages)
- `QUIZ_SHEET_NAME`: Name of the quiz sheet (default: QuizResponses)

