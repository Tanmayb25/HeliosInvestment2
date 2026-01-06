// import HeliosLogo from '../assets/HeliosIcon.png';
// import adityaBirlaLogo from '../assets/amc/adityabirla.webp';
// import axisLogo from '../assets/amc/axis.webp';
// import hdfcLogo from '../assets/amc/hdfc.webp';
// import iciciLogo from '../assets/amc/icici.webp';
// import kotakLogo from '../assets/amc/kotak.webp';
// import miraeLogo from '../assets/amc/mirae.webp';
// import motilalOswalLogo from '../assets/amc/motilaloswal.webp';
// import nipponLogo from '../assets/amc/nippon.png';
// import sbiLogo from '../assets/amc/sbi.webp';
// import utiLogo from '../assets/amc/uti.webp';

const HeliosLogo  ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516440/HeliosIcon_klalpp.png';
const adityaBirlaLogo ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516551/adityabirla_urrnbk.webp';
const axisLogo  = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516552/axis_fz5smp.webp';
const hdfcLogo ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516553/hdfc_ysevj8.webp';
const iciciLogo  = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516554/icici_ucocaq.webp';
const kotakLogo  ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516556/kotak_tob9hj.webp';
const miraeLogo  ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516556/mirae_c01tox.webp';
const motilalOswalLogo ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516558/motilaloswal_sil3ao.webp';
const nipponLogo  ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516559/nippon_gdjkqu.webp';
const sbiLogo  ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516561/sbi_v7ttr4.webp';
const utiLogo ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516562/uti_juflay.webp';
// import AboutUs from '../assets/AboutUsimg.jpg';
import { Target, Sun, TrendingUp, Award, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// const AboutUs= 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1757994777/AboutUsimg_rxt5vn.jpg';
const About = () => {
  const teamMembers = [
    {
      name: "Vandita Sanghvi",
      role: "Co - Founder",
      experience:"2+ years",
      expertise: "Portfolio Management, Wealth Planning",
      image: "",
      contribution: "Vandita brings a deep understanding of financial planning and investments, with global exposure and strong technical expertise.Vandita represents a new generation of financial advisors who combine global perspectives with a deep understanding of Indian markets.",
      qualifications: "CFA Level II, BBA in Finance and Economics from FLAME University",
      linkedin: "#",
      email: "sanghvivandita8@gmail.com.com"
    },
    
    {
      name: "Om Balai",
      role: "Co - Founder",
      experience: "2+ years",
      expertise: "Accounting and Audit",
      image: "",
      contribution: "Om’s meticulous approach and strong understanding of financial systems provide a solid foundation for building trust and delivering reliable solutions for our clients.",
      qualifications: "CA Finalist professional",
      linkedin: "#",
      email: "ombalai03@gmail.com"
    },
    
  ];

  const amcLogos = [
    { src: adityaBirlaLogo, alt: 'Aditya Birla Sun Life AMC' },
    { src: axisLogo, alt: 'Axis Mutual Fund' },
    { src: hdfcLogo, alt: 'HDFC Mutual Fund' },
    { src: iciciLogo, alt: 'ICICI Prudential Mutual Fund' },
    { src: kotakLogo, alt: 'Kotak Mutual Fund' },
    { src: miraeLogo, alt: 'Mirae Asset Mutual Fund' },
    { src: motilalOswalLogo, alt: 'Motilal Oswal Mutual Fund' },
    { src: nipponLogo, alt: 'Nippon India Mutual Fund' },
    { src: sbiLogo, alt: 'SBI Mutual Fund' },
    { src: utiLogo, alt: 'UTI Mutual Fund' },
  ];

  const handleCopy = (
    e: React.MouseEvent<HTMLAnchorElement>,
    email: string
  ) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  };
  
  

  const companyValues = [
    {
      icon: <Target className="w-8 h-8 text-[#fbb81f]" />,
      title: "Trust",
      description: "Building relationships on transparency, honesty, and reliability. Every recommendation is made with your best interests at heart."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#fbb81f]" />,
      title: "Growth",
      description: "Focusing on sustainable wealth creation through disciplined investing and strategic planning for long-term success."
    },
    {
      icon: <Award className="w-8 h-8 text-[#fbb81f]" />,
      title: "Achievement",
      description: "Enabling you to reach life's most important financial milestones through expert guidance and proven strategies."
    }
  ];

  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1750] to-[#2a1f70] text-white py-20">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Helios</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in wealth creation and financial planning. 
              We are the guiding light that transforms your dreams into financial reality.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1750] mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Helios was born from a simple yet powerful belief: everyone deserves access to professional 
                  financial guidance that puts their dreams first. Founded with the vision of democratizing 
                  wealth creation, we set out to bridge the gap between complex financial markets and 
                  individual aspirations.
                </p>
                <p>
                  As an AMFI Registered Mutual Fund Distributor, we combine regulatory compliance with 
                  personalized service. Our journey began with the commitment to simplify investing while 
                  maintaining the highest standards of transparency and ethics.
                </p>
                <p>
                  Today, we serve hundreds of families across India, helping them navigate their financial 
                  journey with confidence. Our success is measured not just in returns, but in the peace 
                  of mind and financial freedom our clients achieve.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516440/AboutUsimg_vpegru.jpg"
                alt="Team collaboration"
                className="w-full h-80 object-cover rounded-2xl shadow-strong"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#fbb81f] rounded-full opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#1a1750] rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Meaning Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="section-title">More Than Just a Logo</h2>
            <p className="section-subtitle">
              Every element of our identity reflects our commitment to your financial success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Logo Display */}
            <div className="text-center lg:text-center">
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 rounded-2xl  p-6 shadow-strong ">
                  <img src={HeliosLogo} alt="Helios Logo" className="w-full h-full object-contain" />
                </div>
                {/* <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#fbb81f] rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#1a1750] rounded-full animate-pulse" style={{animationDelay: '1s'}}></div> */}
              </div>
              
              <h3 className="text-3xl font-bold text-[#1a1750] mb-6">Helios - Inspired by the Sun</h3>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                For us, it symbolizes being the guiding light for our clients' financial journeys. 
                Just like the sun nurtures life, we aim to nurture your wealth with clarity, 
                discipline, and a long-term perspective.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-medium border-l-4 border-[#1a1750] hover:shadow-strong transition-all duration-300">
                  <h4 className="font-bold text-[#1a1750] text-lg mb-2 flex items-center">
                    {/* <div className="w-3 h-3 rounded-full bg-[#1a1750] mr-3"></div> */}
                    The Circle & Wave
                  </h4>
                  <p className="text-gray-600">
                    The flowing shape of a hand cradling a coin symbolizes protection, care, and trust—core values at the heart of our client relationships.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-medium border-l-4 border-[#fbb81f] hover:shadow-strong transition-all duration-300">
                  <h4 className="font-bold text-[#1a1750] text-lg mb-2 flex items-center">
                    {/* <div className="w-3 h-3 rounded-full bg-[#fbb81f] mr-3"></div> */}
                    The Left Bar
                  </h4>
                  <p className="text-gray-600">
                    This strong, rising form represents steady growth and upward progress, echoing our focus on helping clients build wealth systematically.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-medium border-l-4 border-gradient-to-b from-[#1a1750] to-[#fbb81f] hover:shadow-strong transition-all duration-300">
                  <h4 className="font-bold text-[#1a1750] text-lg mb-2 flex items-center">
                    {/* <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#1a1750] to-[#fbb81f] mr-3"></div> */}
                    The Gradient of Blues
                  </h4>
                  <p className="text-gray-600">
                    The transition from deep to light blue conveys clarity, stability, and optimism, illustrating how we guide clients from financial uncertainty to confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* Tagline and Values */}
            <div className="space-y-8">
              <div className="card p-8 bg-gradient-to-br from-[#1a1750] to-[#2a1f70] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#fbb81f]/20 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <Sun className="w-8 h-8 mr-3 text-[#fbb81f]" />
                    Our Tagline
                  </h3>
                  <p className="text-gray-300 mb-6 text-lg">
                    Our tagline encapsulates the essence of our relationship with every client:
                  </p>
                  
                  <div className="space-y-4">
                    {companyValues.map((value, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex-shrink-0">
                          {value.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#fbb81f] text-lg">{value.title}</h4>
                          <p className="text-gray-300">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card p-8 border-2 border-[#fbb81f] bg-gradient-to-br from-[#fbb81f]/5 to-[#f59e0b]/5 relative">
                <div className="absolute top-4 right-4 text-4xl opacity-10">"</div>
                <p className="text-center text-gray-700 italic leading-relaxed text-lg relative z-10">
                  "Together, these elements form a visual story of trust, growth, and success—the same journey we envision for every investor who partners with Helios."
                </p>
                <div className="absolute bottom-4 left-4 text-4xl opacity-10">"</div>
              </div>

              
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Expert Team</h2>
            <p className="section-subtitle">
            "Your wealth deserves more than just a distributor; it deserves a strategy. We are a team of young financial professionals, dedicated to managing your wealth with the same precision used by institutions. We offer the energy to grow with you and the expertise to guide you." 
            </p>
            <p className="section-subtitle">ARN NO - 333736</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card p-8 text-center group hover:shadow-strong transition-all duration-300">
                <div className="relative inline-block mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-md object-cover mx-auto border-4 border-[#1a1750]/10 group-hover:border-[#fbb81f] transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#fbb81f] rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1a1750] mb-2">{member.name}</h3>
                <p className="text-[#fbb81f] font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.experience} | {member.expertise}</p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{member.contribution}</p>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  <strong>Qualifications:</strong> {member.qualifications}
                </div>

                <div className="flex justify-center space-x-4">
                  {/* <a href={`mailto:${member.email}`} className="text-[#1a1750] hover:text-[#fbb81f] transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </a> */}
                  <a
                    href={`mailto:${member.email}`}
                    onClick={(e) => handleCopy(e, member.email)}
                    className="text-[#1a1750] hover:text-[#fbb81f] transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5" />
                  </a>



                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Partners Marquee Section */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-10">
            <h2 className="section-title">We help you invest with</h2>
            <p className="section-subtitle">
              Some of India&apos;s leading asset management companies, so your money works across trusted mutual fund partners.
            </p>
          </div>

          <div className="amc-marquee-wrapper py-6">
            <div className="amc-marquee-inner">
              {[0, 1].map(copyIndex => (
                <div
                  key={copyIndex}
                  className="amc-marquee-track"
                  aria-hidden={copyIndex === 1}
                >
                  {amcLogos.map((logo, index) => (
                    <div
                      key={`${logo.alt}-${index}-${copyIndex}`}
                      className="amc-logo-item flex items-center justify-center px-6"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        className="h-16 md:h-20 w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" bg-blue-100 section-padding">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Start Your Journey with Helios?
          </h2>
          <p className="text-xl text-black/90 leading-relaxed">
            Join our family of satisfied clients and experience the difference that personalized financial guidance can make in achieving your dreams.
          </p>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleStartJourney}
              className="btn-accent px-8 py-4 text-lg"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 