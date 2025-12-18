# Helios Investment App

A modern investment planning application with contact forms and financial health quiz functionality. The app consists of a React frontend and a Node.js backend that integrates with Google Sheets.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Google account with access to Google Cloud Console
- A Google Spreadsheet (will be created/shared during setup)

### Step 1: Clone and Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Set Up Google Sheets API

1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
   - Create a new project or select an existing one
   - Enable the **Google Sheets API**:
     - Navigate to "APIs & Services" > "Library"
     - Search for "Google Sheets API"
     - Click "Enable"

2. **Create a Service Account:**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and create
   - Click on the created service account
   - Go to "Keys" tab > "Add Key" > "Create new key"
   - Choose **JSON** format and download the file

3. **Create and Share Google Spreadsheet:**
   - Create a new Google Spreadsheet
   - Copy the **Spreadsheet ID** from the URL (the long string between `/d/` and `/edit`)
   - Open the downloaded JSON file and find the `client_email` field
   - Share the spreadsheet with that email address
   - Give it **Editor** permissions

### Step 3: Configure Backend

1. **Create backend environment file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Edit `backend/.env` and add your credentials:**
   ```env
   PORT=3001
   NODE_ENV=development
   GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   CONTACT_SHEET_NAME=ContactMessages
   QUIZ_SHEET_NAME=QuizResponses
   ```

   **Important:** 
   - Get `GOOGLE_SHEETS_SPREADSHEET_ID` from your spreadsheet URL
   - Get `GOOGLE_SERVICE_ACCOUNT_EMAIL` from the JSON file (`client_email` field)
   - Get `GOOGLE_PRIVATE_KEY` from the JSON file (`private_key` field) - keep the quotes and `\n` characters

### Step 4: Configure Frontend (Optional)

If your backend runs on a different URL, create a `.env` file in the project root:

```bash
# In the project root (not backend folder)
VITE_API_BASE_URL=http://localhost:3001
```

**Note:** If you don't create this file, it will default to `http://localhost:3001`.

### Step 5: Start the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Helios Backend Server running on port 3001
📝 Environment: development
```

**Terminal 2 - Start Frontend:**
```bash
# Make sure you're in the project root
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 6: Open the App

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3001/health (to verify it's running)

## 📁 Project Structure

```
heliosInvestment/
├── backend/                 # Backend API server
│   ├── routes/             # API route handlers
│   ├── services/           # Google Sheets service
│   ├── server.js           # Express server entry point
│   ├── package.json        # Backend dependencies
│   └── .env                # Backend environment variables
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── services/           # API service (calls backend)
│   └── ...
├── package.json            # Frontend dependencies
└── README.md               # This file
```

## 🔧 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server

## 📡 API Endpoints

The backend provides the following endpoints:

### POST /api/contact
Submit contact form data.

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Optional message"
}
```

### POST /api/quiz
Submit quiz results.

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "totalScore": 25,
  "resultTitle": "You're On The Right Path",
  "resultMessage": "Your finances show discipline...",
  "answers": [...]
}
```

### GET /health
Health check endpoint.

## 🐛 Troubleshooting

### Backend won't start
- Check that all environment variables in `backend/.env` are set correctly
- Verify the Google Service Account email has access to the spreadsheet
- Check that the `GOOGLE_PRIVATE_KEY` includes the quotes and `\n` characters

### Frontend can't connect to backend
- Ensure the backend is running on port 3001
- Check that `VITE_API_BASE_URL` in frontend `.env` matches your backend URL
- Check browser console for CORS errors (backend should handle CORS automatically)

### Data not appearing in Google Sheets
- Verify the service account email has Editor permissions on the spreadsheet
- Check backend console logs for error messages
- Ensure the spreadsheet ID is correct in `backend/.env`

## 📚 Additional Documentation

- **Backend Setup:** See `backend/README.md` for detailed backend documentation
- **Google Sheets API:** [Official Documentation](https://developers.google.com/sheets/api)

## 🛠️ Technology Stack

**Frontend:**
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router

**Backend:**
- Node.js
- Express
- Google APIs (googleapis)

## 📝 License

ISC
