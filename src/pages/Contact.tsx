import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, User, MessageSquare, BarChart3, Target, Users } from 'lucide-react';
import QuizModal from '../components/QuizModal';
import { submitContactForm } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Quiz Modal State
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('📝 Contact form submission started...');
      
      const contactData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      };

      console.log('📊 Contact data prepared:', contactData);

      await submitContactForm(contactData);
      console.log('✅ Contact data sent to backend successfully');
      
      setIsSubmitted(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error('❌ Contact submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1750] mb-4">Thank You!</h2>
          <p className="text-gray-600 leading-relaxed">
            We've received your message and will get back to you within 24 hours. 
            Our team is excited to help you achieve your financial goals.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1750] to-[#2a1f70] text-white py-20">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Ready to start your journey towards financial freedom? 
              We're here to guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-[#1a1750] mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="form-label">
                    <User className="inline w-4 h-4 mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="form-label">
                    <Mail className="inline w-4 h-4 mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="form-label">
                    <Phone className="inline w-4 h-4 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="form-label">
                    <MessageSquare className="inline w-4 h-4 mr-2" />
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your financial goals or any questions you have..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.fullName || !formData.email || !formData.phone}
                  className="btn-accent w-full disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {isSubmitting ? (
                    'Sending Message...'
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-4">
                * Required fields. We respect your privacy and will never share your information.
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Contact Details */}
              <div className="card p-8">
                <h3 className="text-xl font-bold text-[#1a1750] mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1750]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#1a1750]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1750] mb-1">Phone</h4>
                      <p className="text-gray-600">+91 7507751180</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1750]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#1a1750]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1750] mb-1">Email</h4>
                      <p className="text-gray-600">investmentsathelios@gmail.com</p>
                      <p className="text-sm text-gray-500">We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1750]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#1a1750]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1750] mb-1">Office</h4>
                      <p className="text-gray-600">Pune, Maharashtra</p>
                      <p className="text-sm text-gray-500">India</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[#1a1750]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#1a1750]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1750] mb-1">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="card p-8 bg-gradient-to-br from-[#1a1750] to-[#2a1f70] text-white">
                <h3 className="text-xl font-bold mb-6">Why Choose Helios?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#fbb81f] flex-shrink-0" />
                    <span>AMFI Registered Mutual Fund Distributor</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#fbb81f] flex-shrink-0" />
                    <span>Personalized investment strategies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#fbb81f] flex-shrink-0" />
                    <span>Transparent and ethical practices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#fbb81f] flex-shrink-0" />
                    <span>Ongoing portfolio monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-[#fbb81f] flex-shrink-0" />
                    <span>Expert financial guidance</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm text-gray-200 leading-relaxed">
                    "We don't just manage your investments – we partner with you to achieve your dreams."
                  </p>
                </div>
              </div>
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

      

      {/* Quiz Modal */}
      <QuizModal 
        isOpen={isQuizModalOpen} 
        onClose={() => setIsQuizModalOpen(false)} 
      />
    </div>
  );
};

export default Contact; 