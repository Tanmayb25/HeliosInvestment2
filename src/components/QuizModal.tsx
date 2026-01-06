import React, { useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from '@uidotdev/usehooks';
import { submitQuiz } from '../services/api';


interface QuizAnswer {
  text: string;
  score: number;
}

interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width, height } = useWindowSize();

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "At the end of the month, do you know exactly where your money went?",
      answers: [
        { text: "Yes, I track every expense", score: 3 },
        { text: "I have a rough idea", score: 2 },
        { text: "Not really, it feels like it disappears", score: 1 }
      ]
    },
    {
      id: 2,
      question: "Do you know where all your investments are and what they’re worth today?",
      answers: [
        { text: "Yes, I regularly check and review them", score: 3 },
        { text: "I have a general idea, but not in detail ", score: 2 },
        { text: "No, I’m not sure about the details", score: 1 }
      ]
    },
    {
      id: 3,
      question: "Are your investments linked to life goals (like a child's education, retirement, dream home)?",
      answers: [
        { text: "Yes, each goal has a clear plan", score: 3 },
        { text: "Somewhat, but not fully planned", score: 2 },
        { text: "No, I just invest whenever possible", score: 1 }
      ]
    },
    {
      id: 4,
      question: "Do you have adequate life and health insurance coverage for your family?",
      answers: [
        { text: "Yes, fully covered", score: 3 },
        { text: "Partially covered, not sure if it’s enough", score: 2 },
        { text: "No, or I haven’t reviewed it in years", score: 1 }
      ]
    },
    {
      id: 5,
      question: "If there’s a market crash tomorrow, how would you feel about your investments?",
      answers: [
        { text: "Confident, I have a long-term plan", score: 3 },
        { text: "A little anxious, but I might hold on", score: 2 },
        { text: "Worried, I’d consider pulling out", score: 1 }
      ]
    },
    {
      id: 6,
      question: "Do you review your financial portfolio and insurance regularly?",
      answers: [
        { text: "Yes, every 6-12 months", score: 3 },
        { text: "Occasionally, when I remember", score: 2 },
        { text: "Never, or I rely on luck", score: 1 }
      ]
    },
    {
      id: 7,
      question: "How confident are you about achieving your financial goals on time?",
      answers: [
        { text: "Very confident", score: 3 },
        { text: "Somewhat confident, but unsure about the details", score: 2 },
        { text: "Not confident at all", score: 1 }
      ]
    },
    {
      id: 8,
      question: "Would you find it helpful to have an expert keeping your finances and investments on track?",
      answers: [
        { text: "I already have one and it helps a lot", score: 3 },
        { text: "I’m considering it", score: 2 },
        { text: "Definitely, I need guidance", score: 1 }
      ]
    },
    {
      id: 9,
      question: "Do you know the difference between saving and investing?",
      answers: [
        { text: "Yes, and I actively invest for growth", score: 3 },
        { text: "I think so, but I mostly save", score: 2 },
        { text: "Not really, I prefer to keep money in savings accounts/FDS", score: 1 }
      ]
    },
    {
      id: 10,
      question: "How prepared are you financially for unexpected medical expenses?",
      answers: [
        { text: "Fully covered with insurance + emergency fund", score: 3 },
        { text: "Partially prepared", score: 2 },
        { text: "Not prepared at all", score: 1 }
      ]
    }
  ];

  const totalQuestions = quizQuestions.length;
  const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
  const progress = ((currentSlide + 1) / totalQuestions) * 100;

  const getScoreResult = (score: number) => {
    if (score >= 25) {
      return {
        title: "You're On The Right Path (But Reviews Are Key)",
        message: "Your finances show discipline and planning. But even the best plans need periodic reviews to stay aligned with your life goals and changing markets.",
        cta: "Get a Free Portfolio Review",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        // icon: <CheckCircle className="w-8 h-8 text-green-600" />
      };
    } else {
      return {
        title: "You're Doing Well, But Gaps Remain",
        message: "You're moving in the right direction, but there are areas like tax efficiency, insurance, and portfolio reviews that could use expert attention. Let Helios help fine-tune your plan.",
        cta: "Get Started Today",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
        // icon: <Target className="w-8 h-8 text-amber-600" />
      };
    }
  };

  const handleAnswerSelect = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentSlide] = score;
    setAnswers(newAnswers);

    // Auto advance to next slide after a short delay
    setTimeout(() => {
      if (currentSlide < totalQuestions - 1) {
        setCurrentSlide(currentSlide + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      console.log('📝 Quiz submission started...');
      
      const selectedAnswers = answers.map((score, index) => {
        const q = quizQuestions[index];
        const answer = q.answers.find(a => a.score === score);
        return {
          questionId: q.id,
          question: q.question,
          selectedScore: score,
          selectedAnswer: answer ? answer.text : ''
        };
      });

      const quizData = {
        fullName: userDetails.fullName,
        email: userDetails.email,
        phone: userDetails.phone,
        totalScore,
        resultTitle: getScoreResult(totalScore).title,
        resultMessage: getScoreResult(totalScore).message,
        answers: selectedAnswers
      };

      console.log('📊 Quiz data prepared:', quizData);

      await submitQuiz(quizData);
      console.log('✅ Quiz data sent to backend successfully');

      alert('Thank you! Your results have been sent to your email, and our team will contact you soon.');
      
      // Reset and close modal
      resetQuiz();
      onClose();
      
      
    } catch (error) {
      console.error('❌ Quiz submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetQuiz = () => {
    setCurrentSlide(0);
    setAnswers([]);
    setShowResult(false);
    setUserDetails({ fullName: '', email: '', phone: '' });
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header with Progress Bar */}
        <div className="relative">
          <div className="bg-gradient-to-r from-[#1a1750] to-[#2a1f70] px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Discover Your Financial Health</h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            {!showResult && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-300">
                    Question {currentSlide + 1} of {totalQuestions}
                  </span>
                  <span className="text-sm text-gray-300">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-[#fbb81f] h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
          {showResult ? (
            // Results Slide
            <div className="text-center">
              <div className="mb-8 ">
              {totalScore >= 25 && (
                  <Confetti width={width ?? 0} height={height ?? 0} />
                )}

              <div className="text-6xl font-extrabold text-[#1a1750] drop-shadow-lg shadow-[#fbb81f]/50 mb-6">
                {totalScore}
              </div>
                {/* {getScoreResult(totalScore).icon} */}
                <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${getScoreResult(totalScore).color}`}>
                  {getScoreResult(totalScore).title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed max-w-xl mx-auto mb-8">
                  {getScoreResult(totalScore).message}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <h4 className="text-xl font-semibold text-[#1a1750] mb-6">
                  Thank you for completing the quiz!
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userDetails.fullName}
                    onChange={(e) => setUserDetails({...userDetails, fullName: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userDetails.phone}
                    onChange={(e) => setUserDetails({...userDetails, phone: e.target.value})}
                    className="form-input"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!userDetails.fullName || !userDetails.email || !userDetails.phone || isSubmitting}
                  className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Results'}
                </button>
              </div>
            </div>
          ) : (
            // Question Slide
            <div className="min-h-[400px] flex flex-col justify-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#1a1750] mb-8 leading-relaxed text-center">
                  {quizQuestions[currentSlide].question}
                </h3>

                <div className="space-y-4">
                  {quizQuestions[currentSlide].answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(answer.score)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 group ${
                        answers[currentSlide] === answer.score
                          ? 'border-[#1a1750] bg-[#1a1750]/5'
                          : 'border-gray-200 hover:border-[#1a1750] hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          answers[currentSlide] === answer.score
                            ? 'text-[#1a1750]'
                            : 'text-gray-700 group-hover:text-[#1a1750]'
                        }`}>
                          {answer.text}
                        </span>
                        {/* <div className="flex items-center space-x-1">
                          {[...Array(answer.score)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-[#fbb81f] fill-current" />
                          ))}
                        </div> */}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button
                  onClick={handlePrevious}
                  disabled={currentSlide === 0}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <ChevronLeft className="mr-2 w-5 h-5" />
                  Previous
                </button>

                {/* <div className="text-sm text-gray-500 text-center">
                  <span className="block">Score guide:</span>
                  <span>1 = Needs Help • 2 = Partially On Track • 3 = On Track</span>
                </div> */}

                {/* <button
                  onClick={handleNext}
                  disabled={currentSlide >= totalQuestions - 1 || answers[currentSlide] === undefined}
                  className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Next
                  <ChevronRight className="ml-2 w-5 h-5" />
                </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;