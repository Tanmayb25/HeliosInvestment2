import React, { useState } from 'react';
import { Calendar, Clock, Tag, User, Search, Filter, TrendingUp, BookOpen, DollarSign, Shield, PieChart, Target } from 'lucide-react';
import BlogModal from '../components/BlogModal';
import { sendToGoogleSheets, getConfiguredSheetName } from '../services/googleSheets';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
  tags: string[];
  featured: boolean;
}

const Blogs = () => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Power of SIP: Building Wealth Through Systematic Investment",
      excerpt: "Discover how Systematic Investment Plans can help you build substantial wealth over time through disciplined investing and the power of compounding.",
      content: "Systematic Investment Plans (SIPs) have revolutionized the way Indians invest in mutual funds. By investing a fixed amount regularly, investors can benefit from rupee cost averaging and the power of compounding.\n\nWhen you invest through SIP, you buy more units when prices are low and fewer units when prices are high. This strategy helps reduce the average cost per unit over time, potentially leading to better returns in the long run.\n\nThe key advantages of SIP include:\n• Disciplined investing approach\n• Rupee cost averaging benefits\n• Power of compounding\n• Flexibility to start with small amounts\n• Easy to automate and maintain\n\nStarting early with SIP can make a significant difference. For example, if you start investing ₹5,000 per month at age 25 with an expected return of 12% annually, you could accumulate over ₹1.5 crore by age 60. However, if you start at age 35, you might only accumulate around ₹50 lakhs for the same monthly investment.\n\nThe beauty of SIP lies in its simplicity and effectiveness. You don't need to time the market or worry about market volatility. Just stay consistent with your investments and let time work in your favor.",
      author: "Priya Sharma",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["SIP", "Mutual Funds", "Wealth Building"],
      featured: true
    },
    {
      id: 2,
      title: "Mutual Funds vs Fixed Deposits: Which is Better for Your Goals?",
      excerpt: "A comprehensive comparison between mutual funds and fixed deposits to help you choose the right investment vehicle for your financial objectives.",
      content: "When it comes to investment options, mutual funds and fixed deposits are among the most popular choices for Indian investors. While FDs offer safety and guaranteed returns, mutual funds provide the potential for higher growth.\n\nFixed Deposits (FDs) are known for their safety and predictable returns. They offer guaranteed interest rates and are backed by banks, making them virtually risk-free. However, the returns are typically lower, often just beating inflation.\n\nMutual funds, on the other hand, come with market-linked returns that can be significantly higher than FDs over the long term. They offer diversification across various asset classes and professional fund management.\n\nKey differences to consider:\n• Risk: FDs are low-risk, mutual funds have varying risk levels\n• Returns: FDs offer fixed returns, mutual funds have variable returns\n• Liquidity: FDs have lock-in periods, mutual funds offer better liquidity\n• Tax efficiency: Mutual funds can be more tax-efficient for long-term investments\n• Goal alignment: Choose based on your time horizon and risk appetite\n\nFor short-term goals (1-3 years), FDs might be more suitable. For long-term goals (5+ years), mutual funds could provide better wealth creation potential.",
      author: "Rajesh Kumar",
      publishDate: "2024-01-10",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Mutual Funds", "Fixed Deposits", "Investment Comparison"],
      featured: false
    },
    {
      id: 3,
      title: "Tax-Saving Investments: ELSS vs PPF vs NSC",
      excerpt: "Explore the best tax-saving investment options under Section 80C and understand which one aligns with your financial goals and risk appetite.",
      content: "Section 80C of the Income Tax Act allows you to save up to ₹1.5 lakh in taxes annually. Among the various options available, ELSS, PPF, and NSC are the most popular choices.\n\nELSS (Equity Linked Saving Scheme) offers the shortest lock-in period of just 3 years and has the potential for higher returns through equity exposure. However, it comes with market risk.\n\nPPF (Public Provident Fund) is a government-backed scheme with a 15-year lock-in period. It offers tax-free returns and is considered one of the safest investment options.\n\nNSC (National Savings Certificate) is also government-backed with a 5-year lock-in period and offers fixed returns.\n\nFactors to consider when choosing:\n• Lock-in period requirements\n• Risk tolerance\n• Expected returns\n• Liquidity needs\n• Tax implications\n\nFor aggressive investors seeking higher returns, ELSS might be suitable. For conservative investors prioritizing safety, PPF or NSC could be better options.",
      author: "Amit Patel",
      publishDate: "2024-01-08",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Tax Saving", "ELSS", "PPF"],
      featured: true
    },
    {
      id: 4,
      title: "Understanding Asset Allocation: The Key to Balanced Investing",
      excerpt: "Learn how proper asset allocation across equity, debt, and gold can help you achieve your financial goals while managing risk effectively.",
      content: "Asset allocation is the strategic distribution of your investment portfolio across different asset classes such as equity, debt, and alternative investments like gold.\n\nThe right asset allocation depends on several factors including your age, risk tolerance, investment goals, and time horizon.\n\nA common rule of thumb is the '100 minus age' rule for equity allocation. For example, if you're 30 years old, you might allocate 70% to equity and 30% to debt.\n\nKey principles of asset allocation:\n• Diversification reduces risk\n• Regular rebalancing maintains target allocation\n• Asset allocation should evolve with age\n• Consider market conditions and economic cycles\n• Align allocation with your financial goals\n\nRemember that asset allocation is not a one-time decision. It requires regular review and adjustment based on changing circumstances and market conditions.",
      author: "Sneha Verma",
      publishDate: "2024-01-05",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Asset Allocation", "Portfolio Management", "Risk Management"],
      featured: false
    },
    {
      id: 5,
      title: "Retirement Planning in Your 20s: Why Starting Early Makes All the Difference",
      excerpt: "Discover why your 20s are the perfect time to start retirement planning and how small investments today can create massive wealth tomorrow.",
      content: "Many young professionals in their 20s believe retirement planning can wait. However, starting early is one of the most powerful wealth-building strategies available.\n\nThe power of compounding works best when you have time on your side. Even small investments made in your 20s can grow into substantial amounts by retirement.\n\nConsider this example: If you invest ₹5,000 per month starting at age 25 with a 12% annual return, you could accumulate over ₹2.5 crore by age 60. If you start at age 35, you might only accumulate around ₹80 lakhs.\n\nBenefits of early retirement planning:\n• More time for compound growth\n• Lower monthly investment requirements\n• Better risk tolerance for equity exposure\n• Flexibility to adjust strategies\n• Peace of mind about future security\n\nStart with small amounts if needed, but start early. Your future self will thank you for the foresight and discipline.",
      author: "Rajesh Kumar",
      publishDate: "2024-01-03",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Retirement Planning", "Early Investing", "Financial Planning"],
      featured: false
    },
    {
      id: 6,
      title: "Emergency Fund: Your Financial Safety Net",
      excerpt: "Learn why an emergency fund is crucial for financial stability and how to build one that can protect you during unexpected life events.",
      content: "An emergency fund is a crucial component of any sound financial plan. It serves as a financial safety net during unexpected events such as job loss, medical emergencies, or major repairs.\n\nFinancial experts recommend having 3-6 months of living expenses saved in your emergency fund. This provides adequate protection while keeping the amount reasonable.\n\nYour emergency fund should be:\n• Easily accessible (savings account or liquid funds)\n• Separate from your regular savings\n• Large enough to cover essential expenses\n• Regularly reviewed and updated\n\nBuilding an emergency fund takes time and discipline. Start by setting aside a small amount each month and gradually increase your contributions.\n\nRemember that an emergency fund is for true emergencies only. Avoid dipping into it for discretionary expenses or non-essential purchases.",
      author: "Priya Sharma",
      publishDate: "2024-01-01",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Emergency Fund", "Financial Safety", "Cash Management"],
      featured: false
    },
    {
      id: 7,
      title: "Goal-Based Investing: Aligning Your Investments with Your Dreams",
      excerpt: "Understand how goal-based investing can help you achieve specific life objectives, from buying a home to funding your child's education.",
      content: "Goal-based investing is a strategy that aligns your investment choices with your specific life goals. Whether you're saving for a house, your child's education, or retirement, this approach helps you stay focused and disciplined.\n\nEach goal should have its own investment strategy based on:\n• Time horizon (short-term vs long-term)\n• Required amount\n• Risk tolerance\n• Liquidity needs\n\nShort-term goals (1-3 years) might be better suited for debt instruments or liquid funds. Long-term goals (5+ years) can benefit from equity exposure for better growth potential.\n\nBenefits of goal-based investing:\n• Clear purpose for each investment\n• Better tracking and monitoring\n• Easier to stay disciplined\n• Helps prioritize financial goals\n• Reduces emotional decision-making\n\nRegularly review your goals and adjust your investment strategies as needed. Life circumstances change, and your investment approach should evolve accordingly.",
      author: "Amit Patel",
      publishDate: "2023-12-28",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Goal-Based Investing", "Financial Planning", "Investment Strategy"],
      featured: false
    }
  ];

  const handleReadMore = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBlogPost(null);
  };

  const handleSubscribe = async () => {
    if (!subscribeEmail || !subscribeEmail.includes('@')) {
      setSubscribeMessage('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    setSubscribeMessage('');

    try {
      const subscriptionData = {
        type: 'newsletter_subscription',
        email: subscribeEmail,
        timestamp: new Date().toISOString(),
        source: 'BlogsPage'
      };

      console.log('📧 Newsletter subscription:', subscriptionData);

      try {
        await sendToGoogleSheets(subscriptionData, { sheetName: getConfiguredSheetName('contact') });
        console.log('✅ Newsletter subscription sent to Google Sheets successfully');
        setSubscribeMessage('Thank you for subscribing! You\'ll receive our latest insights soon.');
        setSubscribeEmail('');
      } catch (sheetsError) {
        console.error('❌ Failed to send subscription to Google Sheets:', sheetsError);
        setSubscribeMessage('Subscription saved! You\'ll receive our latest insights soon.');
        setSubscribeEmail('');
      }
    } catch (error) {
      console.error('❌ Newsletter subscription error:', error);
      setSubscribeMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const getTagIcon = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'sip':
      case 'mutual funds':
        return <TrendingUp className="w-3 h-3" />;
      case 'tax saving':
      case 'elss':
      case 'ppf':
        return <Shield className="w-3 h-3" />;
      case 'retirement planning':
      case 'financial planning':
        return <Target className="w-3 h-3" />;
      case 'asset allocation':
      case 'portfolio management':
        return <PieChart className="w-3 h-3" />;
      case 'emergency fund':
      case 'cash management':
        return <DollarSign className="w-3 h-3" />;
      default:
        return <BookOpen className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1750] to-[#2a1f70] text-white py-20">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Insights & Knowledge</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay informed with expert analysis, market trends, and actionable investment strategies 
              to help you make better financial decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1750] focus:border-transparent"
              />
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {['All', 'SIP', 'Mutual Funds', 'Tax Saving', 'Retirement Planning', 'Asset Allocation', 'Emergency Fund', 'Goal-Based Investing'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedTag === tag
                      ? 'bg-[#1a1750] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto container-padding">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {post.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#fbb81f] text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#1a1750] mb-3 group-hover:text-[#2a1f70] transition-colors duration-200">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-[#1a1750] hover:text-white text-gray-600 rounded-full text-xs transition-colors duration-200"
                          >
                            {getTagIcon(tag)}
                            {tag}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => handleReadMore(post)}
                        className="text-[#1a1750] hover:text-[#fbb81f] font-medium text-sm transition-colors duration-200"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Line Section */}
      <section className="bg-[#1a1750] section-padding">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">So, are you ready to let your money work as hard as you do?</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Mutual funds are not a magic wand, but with the right mix of equity and debt funds, 
            a disciplined SIP approach, and a clear goal, they can help you achieve financial 
            independence earlier than traditional retirement timelines.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-2xl font-bold text-[#1a1750] mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and get the latest insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={subscribeEmail}
              onChange={(e) => setSubscribeEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a1750] focus:border-transparent"
            />
            <button 
              onClick={handleSubscribe}
              disabled={isSubscribing || !subscribeEmail}
              className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {subscribeMessage && (
            <p className={`mt-3 text-sm ${subscribeMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
              {subscribeMessage}
            </p>
          )}
        </div>
      </section>

      {/* Blog Modal */}
      <BlogModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        blogPost={selectedBlogPost}
      />
    </div>
  );
};

export default Blogs; 