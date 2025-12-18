// A small helper to send data to a Google Apps Script Web App that writes to Google Sheets.
// Configure the Web App URL and optional sheet names via Vite env vars.

// export type GoogleSheetsPayload = Record<string, unknown>;

export interface GoogleSheetsPayload {
	type: string;
	fullName?: string;
	email?: string;
	phone?: string;
	message?: string;
	totalScore?: number;
	resultTitle?: string;
	resultMessage?: string;
	answers?: any[];
	source?: string;
	sheet?: string;
	timestamp?: string;
  }

interface SendOptions {
	/** Override the target sheet name if your Apps Script supports it */
	sheetName?: string;
	/** Use no-cors mode for environments where CORS headers are not set on the Apps Script */
	noCors?: boolean;
}

const WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL as string | undefined;
const DEFAULT_NO_CORS = (import.meta.env.VITE_SHEETS_NO_CORS as string | undefined)?.toLowerCase() === 'true';

// Debug environment variables
console.log('🔍 Google Sheets Service - Environment Check:', {
	WEB_APP_URL: WEB_APP_URL || 'NOT SET',
	DEFAULT_NO_CORS,
	QUIZ_SHEET: import.meta.env.VITE_SHEETS_QUIZ_SHEET || 'NOT SET',
	CONTACT_SHEET: import.meta.env.VITE_SHEETS_CONTACT_SHEET || 'NOT SET',
	allEnvVars: Object.keys(import.meta.env).filter(key => key.startsWith('VITE_GOOGLE_SHEETS'))
});

export async function sendToGoogleSheets(data: GoogleSheetsPayload, options: SendOptions = {}): Promise<void> {
	console.log('🚀 sendToGoogleSheets called with:', { data, options });
	
	if (!WEB_APP_URL) {
		console.error('❌ Missing VITE_GOOGLE_SHEETS_WEB_APP_URL environment variable');
		console.log('💡 Please create a .env file with VITE_GOOGLE_SHEETS_WEB_APP_URL=your_web_app_url');
		throw new Error('Missing VITE_GOOGLE_SHEETS_WEB_APP_URL. Set it in your .env file.');
	}

	const { sheetName, noCors } = options;

	const body: Record<string, unknown> = {
		...data,
		// Many Apps Script templates look for a sheet parameter to route writes
		...(sheetName ? { sheet: sheetName } : {}),
	};

	// Debug logging
	console.log('🔄 Sending to Google Sheets:', {
		url: WEB_APP_URL,
		sheetName: sheetName || 'default',
		payload: body,
		options: { noCors: noCors ?? DEFAULT_NO_CORS }
	});

	// Use simple form submission method
	try {
		// Create a form and submit it to bypass CORS
		const form = document.createElement('form');
		form.method = 'POST';
		form.action = WEB_APP_URL;
		form.target = '_blank'; // Open in new tab to avoid navigation
		form.style.display = 'none';

		// Add the data as a hidden input
		const dataInput = document.createElement('input');
		dataInput.type = 'hidden';
		dataInput.name = 'data';
		dataInput.value = JSON.stringify(body);
		form.appendChild(dataInput);

		// Add form to document, submit, and remove
		document.body.appendChild(form);
		form.submit();
		document.body.removeChild(form);

		console.log('✅ Data sent to Google Sheets via form submission');
		return;
	} catch (err) {
		console.error('❌ Form submission failed:', err);
		throw new Error('Failed to send data to Google Sheets.');
	}
}

// export async function sendToGoogleSheets(payload: GoogleSheetsPayload, options: SendOptions = {}) {
// 	const url = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL;
  
// 	try {
// 	  const response = await fetch(url, {
// 		method: 'POST',
// 		headers: {
// 		  'Content-Type': 'application/json', // ✅ strict JSON header
// 		},
// 		body: JSON.stringify(payload), // ✅ strict JSON body
// 	  });
  
// 	  if (!response.ok) {
// 		throw new Error(`HTTP error! Status: ${response.status}`);
// 	  }
  
// 	  const result = await response.json();
// 	  console.log('✅ Google Sheets response:', result);
  
// 	  if (!result.ok) {
// 		throw new Error(result.error || 'Google Sheets returned an error');
// 	  }
  
// 	  return result;
// 	} catch (err) {
// 	  console.error('❌ Error sending to Google Sheets:', err);
// 	  throw err;
// 	}
//   }

export function getConfiguredSheetName(kind: 'quiz' | 'contact'): string | undefined {
	if (kind === 'quiz') {
		return (import.meta.env.VITE_SHEETS_QUIZ_SHEET as string | undefined) ?? 'QuizResponses';
	}
	if (kind === 'contact') {
		return (import.meta.env.VITE_SHEETS_CONTACT_SHEET as string | undefined) ?? 'ContactMessages';
	}
	return undefined;
}

