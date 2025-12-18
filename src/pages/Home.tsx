import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Target, Eye, Heart, Users, TrendingUp, Shield, Award, CheckCircle, ArrowRight, FileText, BarChart3 } from 'lucide-react';
import QuizModal from '../components/QuizModal';
// Cloudinary URLs for hero slider images
const life01 = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1757994780/life01_uktmdt.jpg';
const life02 = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1757994780/life02_dclbl3.jpg';
const travel01 = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1757994779/travel01_thofwk.jpg';
const rich01 = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1757994783/rich01_veivmw.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  // Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Quiz Modal State
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const heroSlides = [
    {
      image: life01,
      quote: "From 9-to-5 Hustle to Freedom at 45. Early retirement isn’t just a dream. It’s a plan with Helios.",
      author: "Helios Investment Advisory"
    },
    {
      image: life02,
      quote: "From Ordinary to Extraordinary. Let your money take you there.",
      author: "Smart Investing Philosophy"
    },
    {
      image: travel01,
      quote: "Dream Home. Beach Vacations. Early Retirement. What’s your next big milestone? Let’s get there together.",
      author: "Wealth Creation Strategy"
    },
    {
      image: rich01,
      quote: "From SIP to VIP. Let your investments take you from saving small to living large.",
      author: "Long-term Vision"
    }
  ];

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const journeySteps = [
    {
      icon: "🌱",
      title: "Discovery and Onboarding",
      subtitle: "Apne Sapne Bataiye"
    },
    {
      icon: "🗺️",
      title: "Building the Framework",
      subtitle: "Sapne se Strategy tak"
    },
    {
      icon: "🚀",
      title: "Investment in Action",
      subtitle: "Strategy to Implementation"
    },
    {
      icon: "🎯",
      title: "Achievements and Beyond",
      subtitle: "Goals to Growth"
    }
  ];

  const advantages = [
    {
      icon: <Users className="w-8 h-8 text-[#fbb81f]" />,
      title: "Client Centric Approach",
      description: "Every recommendation is tailored to your unique financial situation and life goals."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#fbb81f]" />,
      title: "Research Driven Recommendations",
      description: "Our investment decisions are backed by thorough market analysis and data-driven insights."
    },
    {
      icon: <Shield className="w-8 h-8 text-[#fbb81f]" />,
      title: "Ethics over Everything",
      description: "Transparency, honesty, and your best interests guide every interaction and recommendation."
    },
    {
      icon: <Award className="w-8 h-8 text-[#fbb81f]" />,
      title: "Certified Expertise",
      description: "Our team of certified financial experts brings years of experience and proven track records."
    }
  ];

  const handleStartJourney = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1750]/80 via-[#1a1750]/60 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="max-w-3xl">
              {/* <h1 className="hero-text animate-fade-in">
                Your Dreams, <br />
                <span className="text-[#fbb81f]">Our Guidance</span>
              </h1> */}
              <p className="hero-subtitle animate-fade-in text-center">
                {heroSlides[currentSlide].quote}
              </p>
              {/* <p className="text-lg text-gray-300 mt-2 animate-fade-in text-center">
                — {heroSlides[currentSlide].author}
              </p> */}
              
              <div className="mt-8 space-y-4 sm:space-y-0 sm:flex sm:space-x-4 justify-center">
                <button 
                  onClick={handleStartJourney}
                  className="btn-accent w-full sm:w-auto text-center"
                >
                  Start Your Journey
                  
                </button>
                
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-[#fbb81f] scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Foundation</h2>
            <p className="section-subtitle">
              Built on trust, driven by your success, guided by unwavering principles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="card p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1a1750] to-[#2a1f70] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="card-title">Our Vision</h3>
              <p className="card-description">
                To be the guiding light that turns dreams into financial reality, 
                empowering every client to achieve their life's most important goals.
              </p>
            </div>

            {/* Values */}
            <div className="card p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1a1750] to-[#fbb81f] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="card-title">Our Values</h3>
              <p className="card-description">
                Trust, transparency, and client-first approach form the cornerstone of every relationship. 
                Your success is our success.
              </p>
            </div>

            {/* Mission */}
            <div className="card p-8 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#fbb81f] to-[#f59e0b] flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="card-title">Our Mission</h3>
              <p className="card-description">
                Through disciplined investing, personalized guidance, and a focus on what truly matters, 
                we simplify wealth creation and help our clients grow, protect, and attain financial freedom.
              </p>
            </div>

            
          </div>
        </div>
      </section>

      

      {/* Take a Quiz Section */}
      <section className="section-padding bg-blue-100">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            {/* <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#fbb81f] flex items-center justify-center">
              <FileText className="w-10 h-10 text-white" />
            </div> */}
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Discover Your Financial Health
            </h2>
            <p className="text-xl text-black-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take our comprehensive 10-question assessment to understand where you stand financially 
              and receive personalized recommendations for your investment journey.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-[#fbb81f]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Get Your Score</h3>
                <p className="text-black-300">Receive a personalized financial health score out of 30 points</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Target className="w-8 h-8 text-[#fbb81f]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Expert Analysis</h3>
                <p className="text-black-300">Get tailored recommendations based on your current situation</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#fbb81f]" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">Free Consultation</h3>
                <p className="text-black-300">Get personalized investment strategies</p>
              </div>
            </div>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="btn-accent bg-white text-[#1a1750] hover:bg-gray-100 text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
            >
              {/* <FileText className="w-6 h-6 mr-2" /> */}
              Take the Quiz
            </button>
            
            
          </div>
        </div>
      </section>

      {/* Start Your Journey Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="section-title">Start Your Journey</h2>
            <p className="section-subtitle">
              Discover how we transform your financial aspirations into achievable milestones through our proven process.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#fbb81f] via-[#1a1750] to-[#fbb81f] transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {journeySteps.map((step, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Node - positioned above the card */}
                  {/* <div className="hidden lg:block absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#fbb81f] rounded-full border-4 border-white shadow-lg z-20"></div> */}
                  
                  {/* Flip Card Container */}
                  <div className="relative w-full h-48 perspective-1000 cursor-pointer" onClick={() => handleCardFlip(index)}>
                    <div className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${flippedCards.has(index) ? 'rotate-y-180' : ''}`}>
                      {/* Front of card - Step Number */}
                      <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1a1750] to-[#2a1f70] rounded-xl shadow-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white text-sm font-medium">Step</div>
                          <div className="text-6xl font-bold text-[#fbb81f] mb-2">{index + 1}</div>
                          
                          {/* <div className="text-white text-xs mt-2 opacity-75">Click to flip</div> */}
                        </div>
                      </div>
                      
                      {/* Back of card - Content */}
                      <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center rotate-y-180">
                        <div className="text-4xl mb-3">{step.icon}</div>
                        <h3 className="text-lg font-semibold text-[#1a1750] mb-2 text-center">{step.title}</h3>
                        <p className="text-sm font-medium text-[#fbb81f] text-center">{step.subtitle}</p>
                        <div className="text-gray-500 text-xs mt-2 text-center">Click again to flip back</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Helios Advantage Section */}
      <section className="section-padding bg-[#1a1750]">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="section-title text-white">The Helios Advantage</h2>
            <p className="section-subtitle text-white">
              What sets us apart in your journey towards financial success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{advantage.title}</h3>
                <p className="text-gray-300 leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-xl text-black-800 mb-8 leading-relaxed">
            Join thousands of satisfied clients who have achieved their financial goals with Helios. 
            Your journey to financial freedom starts with a single step.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleStartJourney}
              className="btn-accent px-8 py-4 text-lg"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      <QuizModal 
        isOpen={isQuizModalOpen} 
        onClose={() => setIsQuizModalOpen(false)} 
      />
    </div>
  );
};

export default Home; 