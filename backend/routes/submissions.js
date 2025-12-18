import { appendToSheet } from '../services/googleSheets.js';

/**
 * Handle contact form submissions
 */
export async function submitContactForm(req, res) {
  try {
    const { fullName, email, phone, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, and phone are required'
      });
    }

    // Prepare data for Google Sheets
    const sheetData = {
      type: 'contact_form',
      fullName,
      email,
      phone,
      message: message || '',
      timestamp: new Date().toISOString(),
      source: 'ContactPage'
    };

    console.log('📝 Contact form submission:', sheetData);

    // Send to Google Sheets
    await appendToSheet('contact', sheetData);

    res.json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit contact form'
    });
  }
}

/**
 * Handle quiz submissions
 */
export async function submitQuiz(req, res) {
  try {
    const { 
      fullName, 
      email, 
      phone, 
      totalScore, 
      resultTitle, 
      resultMessage, 
      answers 
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, and phone are required'
      });
    }

    if (totalScore === undefined || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: 'Missing quiz data: totalScore and answers are required'
      });
    }

    // Prepare data for Google Sheets
    const sheetData = {
      type: 'quiz_submission',
      fullName,
      email,
      phone,
      totalScore,
      resultTitle: resultTitle || '',
      resultMessage: resultMessage || '',
      answers: JSON.stringify(answers), // Store as JSON string for Google Sheets
      timestamp: new Date().toISOString(),
      source: 'QuizModal'
    };

    console.log('📝 Quiz submission:', sheetData);

    // Send to Google Sheets
    await appendToSheet('quiz', sheetData);

    res.json({
      success: true,
      message: 'Quiz submitted successfully'
    });
  } catch (error) {
    console.error('❌ Quiz submission error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit quiz'
    });
  }
}

