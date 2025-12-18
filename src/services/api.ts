// API service for communicating with the backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  message?: string;
}

export interface QuizSubmissionData {
  fullName: string;
  email: string;
  phone: string;
  totalScore: number;
  resultTitle: string;
  resultMessage: string;
  answers: Array<{
    questionId: number;
    question: string;
    selectedScore: number;
    selectedAnswer: string;
  }>;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Submit contact form data to the backend
 */
export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Contact form submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    throw error;
  }
}

/**
 * Submit quiz data to the backend
 */
export async function submitQuiz(data: QuizSubmissionData): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Quiz submitted successfully:', result);
    return result;
  } catch (error) {
    console.error('❌ Error submitting quiz:', error);
    throw error;
  }
}

