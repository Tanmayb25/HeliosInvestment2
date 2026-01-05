import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Mail, Phone, MapPin, X, Shield } from 'lucide-react';
// import HeliosLogo from '../assets/HeliosIcon.png';
// import PlayStoreIcon from '../assets/playstore.png'; // adjust path if needed

const HeliosLogo = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516440/HeliosIcon_klalpp.png';
const PlayStoreIcon = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767632176/playstore_ohgvpo.png';

const Footer = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const PrivacyPolicyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl max-h-[80vh] overflow-y-auto shadow-strong">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#1a1750] flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            Privacy Policy
          </h2>
          <button
            onClick={() => setShowPrivacyPolicy(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-xl font-semibold text-[#1a1750] mb-3">Information We Collect</h3>
            <p className="text-gray-600 leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, 
              request investment advice, or contact us. This includes your name, email address, 
              phone number, financial information, and investment preferences.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#1a1750] mb-3">How We Use Your Information</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Provide personalized investment advice and recommendations</li>
              <li>• Process and manage your investment transactions</li>
              <li>• Send you important updates about your portfolio</li>
              <li>• Improve our services and develop new features</li>
              <li>• Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#1a1750] mb-3">Information Sharing</h3>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share your information with trusted partners who assist us in providing 
              our services, subject to strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#1a1750] mb-3">Data Security</h3>
            <p className="text-gray-600 leading-relaxed">
              We implement robust security measures to protect your personal information, 
              including encryption, secure servers, and regular security audits. 
              Your financial data is handled with bank-level security standards.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#1a1750] mb-3">Your Rights</h3>
            <p className="text-gray-600 leading-relaxed">
              You have the right to access, update, or delete your personal information. 
              You may also opt out of marketing communications at any time. 
              Contact us at privacy@helios.com for any privacy-related requests.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-[#1a1750] mb-3">Contact Information</h3>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-2 text-gray-600">
              <p>Email: privacy@helios.com</p>
              <p>Phone: +91 9876543210</p>
              <p>Address: Mumbai, Maharashtra, India</p>
            </div>
          </section>

          <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
            Last updated: January 2024
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <footer className="bg-[#1a1750] text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4 group">
                  <div className="w-15 h-15  flex items-center justify-center  overflow-hidden">
                    <img src={HeliosLogo} alt="Helios Logo" className="max-w max-h object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold">HELIOS</span>
                    <span className="text-sm text-gray-300">Trust. Grow. Achieve.</span>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-4 max-w-md">
                  Your guiding light to turn dreams into financial reality. 
                  Through disciplined investing and personalized guidance, we help you achieve financial freedom.
                </p>
                
                <p className="text-xs text-gray-400 mb-4">
                  AMFI Registered Mutual Fund Distributor
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-300 hover:text-[#fbb81f] transition-colors duration-200">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/investment-planner" className="text-gray-300 hover:text-[#fbb81f] transition-colors duration-200">
                      Investment Planner
                    </Link>
                  </li>
                  <li>
                    <Link to="/blogs" className="text-gray-300 hover:text-[#fbb81f] transition-colors duration-200">
                      Blogs
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-300 hover:text-[#fbb81f] transition-colors duration-200">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-[#fbb81f]" />
                    <span className="text-gray-300 text-sm">investmentsathelios@gmail.com</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-[#fbb81f]" />
                    <span className="text-gray-300 text-sm">Pune, Maharashtra</span>
                  </div>
                </div>
              </div>

              
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm">
                © 2024 Helios Investment Advisory. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-6">
                {/* External Website Link */}
                <a
                  href="https://fundzbazar.com/Link/s8SrXqJzd2s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#fbb81f] text-sm transition-colors duration-200"
                >
                  Visit Our Website
                </a>

                {/* Play Store Link */}
                <a
                  href="https://fundzbazar.com/Link/8eqClfG8mew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src={PlayStoreIcon}
                    alt="Get it on Google Play"
                    className="h-10 w-auto"
                  />
                </a>

                {/* Privacy Policy */}
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="text-gray-400 hover:text-[#fbb81f] text-sm transition-colors duration-200 flex items-center space-x-1"
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </button>

                <span className="text-gray-400 text-sm">
                  Terms & Conditions
                </span>
              </div>

            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && <PrivacyPolicyModal />}
    </>
  );
};

export default Footer; 