import React, { useState } from 'react';
import { Calendar, Clock, Tag, User, Search, Filter, TrendingUp, BookOpen, DollarSign, Shield, PieChart, Target } from 'lucide-react';
import BlogModal from '../components/BlogModal';
import { sendToGoogleSheets, getConfiguredSheetName } from '../services/googleSheets';
// import mfimg from '../assets/blogimg/mutualfunds.jpg';
// import sipimg from '../assets/blogimg/sip.jpg';
// import mythimg from '../assets/blogimg/myth.jpg';
// import moneyimg from '../assets/blogimg/money.jpg';
// import financeimg from '../assets/blogimg/finance.jpg';
// import lifeimg from '../assets/blogimg/lifeinsurance.jpg';

 const mfimg = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516477/mutualfunds_lonekw.jpg';
 const sipimg ='https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516478/sip_a7ceci.jpg';
 const mythimg = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516477/myth_d8ybqw.jpg';
 const moneyimg = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516477/money_yuzxuu.jpg';
 const financeimg = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516476/finance_wfwn9q.jpg';
 const lifeimg = 'https://res.cloudinary.com/dlfi4zq4f/image/upload/v1767516476/lifeinsurance_bu268c.jpg';
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
      title: "FIRE Up Your Future: Can Mutual Funds Help You Retire Early?",
      excerpt: "The idea of FIRE—Financial Independence, Retire Early—is catching on fast. But can mutual funds really fuel your journey to an early retirement? Let’s break it down.",
      content: "Why Mutual Funds Are Your FIRE Ally? \n Mutual funds give you access to diversified investments managed by experts. While the traditional retirement age is around 60-65 years, F.I.R.E. followers aim to achieve financial independence much earlier, sometimes in their 40s or even 30s. They do this by carving out 50-70% of their income and investing that percentage wisely to grow their wealth faster. \n\n Follow the F.I.R.E. Rule to Retire Early \n✨F – Focus on Savings: Start with a high savings rate. Early retirement means building a larger corpus since your money needs to last longer.\n ✨I – Invest Smartly: Use SIPs in equity and debt mutual funds to grow your wealth consistently.\n ✨R – Review Regularly: Keep an eye on your portfolio and rebalance as needed to manage risk.\n ✨E – Enjoy the Power of Compounding: The earlier you start, the more your money grows exponentially.\n\n Bottom Line Mutual funds are not a magic wand, but with the right mix of equity and debt funds, a disciplined SIP approach, and a clear goal, they can help you achieve financial independence earlier than traditional retirement timelines.So, are you ready to let your money work as hard as you do? ",
      author: "Vandita Sanghvi",
      publishDate: "2025-01-15",
      readTime: "2 min read",
      image: mfimg,
      tags: [ "Mutual Funds", "Wealth Building"],
      featured: true
    },
    {
      id: 2,
      title: "Your First SIP Is Like Hitting the Gym: Build Wealth One Step at a Time",
      excerpt: "We’ve all heard it—“The hardest part of working out is showing up.” The same holds true for investing. Starting your first SIP (Systematic Investment Plan) can feel intimidating, but like your first workout, it’s the first step towards long-term health—this time, financial health.We believe building wealth is not about big leaps but small, consistent actions. Let’s break it down.",
      content:"1️⃣ Starting Small is Powerful \nRemember your first day at the gym? You didn’t lift heavy weights or run a marathon. You started with lighter exercises, focusing on form and consistency. Similarly, your first SIP doesn’t have to be a large amount. Even ₹1,000 per month can set the foundation for your financial fitness.\nThe key is consistency. Over time, small SIPs grow with the power of compounding, much like regular workouts build stamina and strength.\n\n2️⃣ Discipline Beats Motivation\nMotivation gets you started; discipline keeps you going. Skipping a workout today won’t harm you, but making it a habit will. The same applies to SIPs.\nSetting up an automatic SIP ensures you’re investing regularly without overthinking market ups and downs. You’re building a routine that strengthens your financial muscles over time.\n\n3️⃣ Progress is Slow, But Visible\nYou don’t see abs after a week in the gym, and you won’t see a fortune after a month of SIPs. But with time, the results compound.\nFor instance, investing ₹5,000 monthly at an average 12% annual return can grow into ₹1 crore in 25 years. That’s the magic of patience and persistence.\n\n4️⃣ A Trainer Helps—In Fitness and Finance\nJust as a trainer guides you to the right exercises and helps avoid injuries, a financial expert helps you choose the right funds and avoid costly mistakes.\nOur goal-based approach ensures your SIPs align with your life goals—whether it’s buying a house, funding your child’s education, or planning an early retirement.\n\n🏋️‍♂️ The Bottom Line\nYour first SIP is more than an investment; it’s a commitment to your future self. Start small, stay consistent, and trust the process. Over time, these small steps will build the financial strength to help you live life on your terms.\nSo, are you ready to take the first step towards your financial fitness journey with Helios Investments?",
      author: "Vandita Sanghvi",
      publishDate: "2025-01-15",
      readTime: "3 min read",
      image: sipimg,
      tags: ["SIP"],
      featured: false
    },
    {
      id: 3,
      title: "It’s Time to Unlearn: Myths that hold you back",
      excerpt: "In India, conversations about money often come wrapped in cautionary tales. From dinner table advice to WhatsApp forwards, we’re surrounded by myths that keep many from taking the first step towards investing.",
      content: "🌱 Myth 1: “Investing is only for the rich.\n💡 Reality: Investing is for anyone with a goal.\nIn the past, stock markets and mutual funds may have felt like a playground for the wealthy. But today, with SIPs (Systematic Investment Plans), you can start investing with as little as ₹500 a month.\nThink about it: that’s less than your monthly chai-and-snacks budget! The earlier you start, the more time your money gets to grow through compounding.\n\nHelios Tip: Start small. Increase your SIP as your income grows. Even small steps today can lead to a big corpus tomorrow.\n\n📉 Myth 2: “The stock market is gambling.”\n💡 Reality: Investing is not gambling—it’s strategy.\nIt’s a common fear: “I’ll lose all my money if the market crashes.” But investing isn’t about betting on random stocks. It’s about disciplined planning, diversification, and staying invested for the long term.When you invest in mutual funds, professional fund managers spread your money across different sectors to reduce risk. Historically, Indian equity markets have delivered healthy returns over 10–15 years, despite short-term ups and downs.\n\nHelios Tip: Don’t try to time the market. Time in the market beats timing the market.\n\n🕰️ Myth 3: “I’ll start investing when I earn more.”\n💡 Reality: The best time to invest was yesterday; the second-best time is today.Waiting for a higher salary or a “right time” in the market only delays your goals. Starting early—even with small amounts—allows compounding to work its magic.\nFor example, if you invest ₹5,000 per month starting at age 25, you could have ₹2.5 crore by 55 (assuming 12% annual returns). Start at 35, and you’ll end up with less than half.\n\nHelios Tip: Treat investing like paying a monthly bill—non-negotiable. Your future self will thank you.\n\n🏦 Myth 4: “Fixed deposits are safer than mutual funds.”\n💡 Reality: FDs are safe, but they may not beat inflation.Indians love the security of fixed deposits, and rightly so—they’re low risk. But FD interest rates often lag behind inflation, meaning your money loses purchasing power over time.Mutual funds, especially debt and hybrid funds, can offer relatively stable returns while keeping pace with inflation. For long-term goals, equity funds offer growth potential that FDs simply can’t match.\n\nHelios Tip: Don’t put all your eggs in one basket. A mix of FDs, equity, and debt funds creates a balanced portfolio.\n\nThe Bottom Line\nIn India, myths about investing have held back generations from creating wealth. But times are changing. With technology, access, and expert guidance, building a secure financial future is within everyone’s reach.At the end of the day, it is not about choosing between saving and investing; it is about finding a balance. Savings may seem like they provide a safety net, but investments offer growth opportunities",
      author: "Vandita Sanghvi",
      publishDate: "2025-01-15",
      readTime: "5 min read",
      image: mythimg,
      tags: ["Goal-Based Investing", "retirement planning"],
      featured: true
    },
    {
      id: 4,
      title: "Where Should You Park Idle Money?",
      excerpt: "When it comes to parking short-term money, most of us instinctively turn to savings accounts or fixed deposits (FDs). After all, they’re “safe” and “easy,” right? But what if there was a smarter alternative that gives you better returns, easy access? \n Enter Liquid Funds—a lesser-known but highly effective option for short-term financial needs.",
      content: "The Traditional Approach: Savings Account & FDs \n Imagine Priya has received a bonus of ₹2 lakh. She doesn’t want to spend it immediately but plans to use it within 6 months for a vacation.\n Here’s what she considers:\n ✅ Savings Account – Easy to park money, instant access. But the average interest rate? Around 3%–4% p.a. That’s barely keeping up with inflation.\n✅ Fixed Deposit – Slightly better interest rates (5%–6%), but it locks her money for a fixed period. Breaking it early means penalties and reduced returns.\n Neither option seems ideal for a short-term goal like hers\n Now, let’s say Priya learns about Liquid Funds. She parks her ₹2 lakh here. What happens?\nInvestment Portfolio: Liquid funds primarily invest in debt and money market instruments with maturities of up to 91 days. This short duration reduces exposure to both interest rate fluctuations and credit risk.\n Liquidity: Investors enjoy faster redemption options, with T+1 (next business day) availability and instant redemption facilities up to ₹50,000, wherever available.\nEasy withdrawals: Redemptions made after seven days of investment incur no exit load, making liquid funds almost as accessible as a traditional saving option\nWhen Should One Choose a Liquid Fund?\nLiquid funds are ideal for those who:\n Are building an emergency fund and want it to grow while remaining easily accessible.\n Need to park surplus money for the short term.\n Have received unexpected cash but are unsure where to invest it.\n Wish to stagger their investments into the market.\n Are uncertain about the right time to make long-term investments.\n\nFinal Word\nYour short-term money deserves better than lying idle in a savings account or being locked away in an FD. Liquid funds offer a smarter alternative—keeping your funds accessible while earning better returns.",
      author: "Vandita Sanghvi",
      publishDate: "2025-01-15",
      readTime: "4 min read",
      image: moneyimg,
      tags: ["Asset Allocation", "Portfolio Management", "Risk Management"],
      featured: false
    },
    {
      id: 5,
      title: "5 Golden Rules of Financial Planning You Can’t Ignore",
      excerpt: "Money doesn’t come with a manual—but having a few golden rules can make your financial journey a lot smoother. Whether you’re just starting out or trying to get your finances in shape, these timeless principles will help you build a secure future.",
      content: "🌟 1. Spend Less Than You Earn\nSounds simple, but it’s the foundation of financial success. Track your expenses, avoid unnecessary debt, and make saving a habit. Remember, wealth isn’t about how much you earn—it’s about how much you keep.\n💰 2. Pay Yourself First\nThe moment your salary hits your account, set aside a portion for savings and investments before spending on anything else. Automate SIPs or transfers so saving becomes effortless.Think of it as your future self’s salary—it deserves priority.\n\n📈 3. Invest for Goals, Not Trends\nDon’t get distracted by hot stock tips or market noise. Define your life goals—buying a house, kids’ education, retirement—and align your investments accordingly. A goal-based plan keeps you focused through market ups and downs.\n\n🛡️ 4. Protect What You’re Building\nAn emergency fund and proper insurance (health, term life) are your financial safety nets. They ensure that unexpected events don’t derail your long-term plans.\n\n⏳ 5. Start Early, Stay Consistent\nThe earlier you start, the harder your money works for you thanks to compounding. Even small monthly SIPs can grow into a big corpus over time. Stay consistent and give your investments time to do their job.\n\n🚀 The Bottom Line\nFinancial planning isn’t about perfection—it’s about progress. These golden rules can help you take control of your money and secure the life you dream of.",
      author: "Vandita Sanghvi",
      publishDate: "2025-01-15",
      readTime: "4 min read",
      image: financeimg,
      tags: ["Retirement Planning", "Early Investing", "Financial Planning"],
      featured: true
    },
    {
      id: 6,
      title: "Traditional Insurance vs Term Insurance + Mutual Funds: What Works Better?",
      excerpt: "For decades, most Indian families equated “insurance” with “investment.” Endowment and money-back plans were seen as safe ways to save for the future while staying insured. But with rising awareness, many are now asking: Should I stick with traditional insurance policies, or combine Term Insurance with Mutual Funds?",
      content:"While both options aim to secure your future, they work very differently. Here is a direct comparison: \n\n" + 
           "• TRADITIONAL INSURANCE (Endowment/Money-back):\n" +
           "- Age : 35\n" +
           "- Sum Assured : 50,00,000\n" +
           "- Annual Premium : 2,51,210\n" +
           "- Monthly Premium : 20,934\n" +
           "- Policy Term : 25 years\n" +
           "- Future Value (Maturity benefit=SA + bonus) = 1,25,00,000\n" +
           "-------------------------------------------------\n" +
           "• TERM INSURANCE(Pure Insurance):\n" +
           "- Age : 35\n" +
           "- Sum Assured : 50,00,000\n" +
           "- Annual Premium : 11,210\n" +
           "- Monthly Premium : 934\n" +
           "- Policy Term : 25 years\n" +
           "-------------------------------------------------\n" +
           "• Mutual Funds (SIP) - Investments\n" +
           "- Monthly Investment (difference of term and traditional premium) : 20,000\n" +
           "- Sum Assured : 50,00,000\n" +
           "- Assumed Rate of Interest : 10%\n" +
           "- No. of Years : 25 years\n" +
           "- Future value : 2,65,36,668\n" +
           "If your goal is true financial protection + wealth creation, Term Insurance + Mutual Funds is far superior. Traditional plans may feel safe, but they compromise both – low cover and low returns.\nIn today’s India, where medical costs, inflation, and aspirations are rising, separating “protection” (via term insurance) from “investment” (via mutual funds) is often the smarter and more efficient choice.",
      author: "Vandita Sanghvi",
      publishDate: "2025-01-15",
      readTime: "2 min read",
      image: lifeimg,
      tags: [ "Financial Safety",],
      featured: false
    },
    
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
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
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