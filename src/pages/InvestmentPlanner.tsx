import React, { useState } from 'react';
import { Calculator, TrendingUp, GraduationCap, Heart, Home, Shield, PiggyBank, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface CalculationResult {
  monthlyInvestment: number;
  investmentPeriod: number;
  expectedReturn: number;
  targetAmount: number;
  totalInvested: number;
  maturityAmount: number;
  gains: number;
  chartData: any[];
}

const InvestmentPlanner = () => {
  const [selectedCalculator, setSelectedCalculator] = useState('sip');
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  const calculators = [
    {
      id: 'sip',
      name: 'SIP Calculator',
      icon: <TrendingUp className="w-6 h-6" />,
      description: 'Calculate returns on Systematic Investment Plans'
    },
    {
      id: 'education',
      name: 'Education Calculator',
      icon: <GraduationCap className="w-6 h-6" />,
      description: 'Plan for your child\'s education expenses'
    },
    {
      id: 'goal',
      name: 'Goal Calculator',
      icon: <PiggyBank className="w-6 h-6" />,
      description: 'Calculate investment needed for specific goals'
    },
    {
      id: 'marriage',
      name: 'Marriage Calculator',
      icon: <Heart className="w-6 h-6" />,
      description: 'Plan for marriage and wedding expenses'
    },
    {
      id: 'retirement',
      name: 'Retirement Calculator',
      icon: <Home className="w-6 h-6" />,
      description: 'Plan for your retirement corpus'
    },
    {
      id: 'hlv',
      name: 'HLV Calculator',
      icon: <Shield className="w-6 h-6" />,
      description: 'Calculate Human Life Value for insurance'
    }
  ];

  const calculateSIP = (monthlyAmount: number, years: number, annualReturn: number) => {
    const monthlyReturn = annualReturn / 12 / 100;
    const totalMonths = years * 12;
    const futureValue = monthlyAmount * (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn));
    const totalInvested = monthlyAmount * totalMonths;
    
    // Generate chart data
    const chartData = [];
    let investedAmount = 0;
    let currentValue = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
      investedAmount += monthlyAmount;
      currentValue = monthlyAmount * (((Math.pow(1 + monthlyReturn, month) - 1) / monthlyReturn) * (1 + monthlyReturn));
      
      if (month % 12 === 0 || month === totalMonths) {
        chartData.push({
          year: Math.floor(month / 12),
          invested: Math.round(investedAmount),
          maturity: Math.round(currentValue)
        });
      }
    }

    return {
      monthlyInvestment: monthlyAmount,
      investmentPeriod: years,
      expectedReturn: annualReturn,
      targetAmount: 0,
      totalInvested: Math.round(totalInvested),
      maturityAmount: Math.round(futureValue),
      gains: Math.round(futureValue - totalInvested),
      chartData
    };
  };

  const calculateGoal = (targetAmount: number, years: number, annualReturn: number) => {
    const monthlyReturn = annualReturn / 12 / 100;
    const totalMonths = years * 12;
    const monthlyInvestment = targetAmount / (((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn) * (1 + monthlyReturn));
    const totalInvested = monthlyInvestment * totalMonths;
    
    // Generate chart data
    const chartData = [];
    let investedAmount = 0;
    let currentValue = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
      investedAmount += monthlyInvestment;
      currentValue = monthlyInvestment * (((Math.pow(1 + monthlyReturn, month) - 1) / monthlyReturn) * (1 + monthlyReturn));
      
      if (month % 12 === 0 || month === totalMonths) {
        chartData.push({
          year: Math.floor(month / 12),
          invested: Math.round(investedAmount),
          maturity: Math.round(currentValue)
        });
      }
    }

    return {
      monthlyInvestment: Math.round(monthlyInvestment),
      investmentPeriod: years,
      expectedReturn: annualReturn,
      targetAmount,
      totalInvested: Math.round(totalInvested),
      maturityAmount: targetAmount,
      gains: Math.round(targetAmount - totalInvested),
      chartData
    };
  };

  const renderCalculatorForm = () => {
    switch (selectedCalculator) {
      case 'sip':
        return <SIPCalculatorForm onCalculate={calculateSIP} setResult={setCalculationResult} />;
      case 'education':
        return <EducationCalculatorForm onCalculate={calculateGoal} setResult={setCalculationResult} />;
      case 'goal':
        return <GoalCalculatorForm onCalculate={calculateGoal} setResult={setCalculationResult} />;
      case 'marriage':
        return <MarriageCalculatorForm onCalculate={calculateGoal} setResult={setCalculationResult} />;
      case 'retirement':
        return <RetirementCalculatorForm onCalculate={calculateGoal} setResult={setCalculationResult} />;
      case 'hlv':
        return <HLVCalculatorForm onCalculate={calculateGoal} setResult={setCalculationResult} />;
      default:
        return <SIPCalculatorForm onCalculate={calculateSIP} setResult={setCalculationResult} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <section className="bg-gradient-to-br from-[#1a1750] to-[#2a1f70] text-white py-20">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Investment Planner</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Plan your financial future with our comprehensive calculators. 
              Visualize your investment growth and make informed decisions.
            </p>
          </div>
        </div>
      </section> */}

      {/* Calculator Selection */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a1750] mb-4">Choose Your Calculator</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the calculator that best fits your financial planning needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {calculators.map((calc) => (
              <button
                key={calc.id}
                onClick={() => {
                  setSelectedCalculator(calc.id);
                  setCalculationResult(null);
                }}
                className={`card p-6 text-left transition-all duration-200 transform hover:scale-105 ${
                  selectedCalculator === calc.id
                    ? 'border-2 border-[#1a1750] bg-[#1a1750]/5'
                    : 'hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
                  selectedCalculator === calc.id 
                    ? 'bg-[#1a1750] text-white' 
                    : 'bg-gray-100 text-[#1a1750]'
                }`}>
                  {calc.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1a1750] mb-2">{calc.name}</h3>
                <p className="text-gray-600 text-sm">{calc.description}</p>
              </button>
            ))}
          </div>

          {/* Calculator Form and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <div className="card p-8">
              {renderCalculatorForm()}
            </div>

            {/* Results and Chart */}
            {calculationResult && (
              <div className="card p-8">
                <h3 className="text-xl font-bold text-[#1a1750] mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2" />
                  Investment Growth Projection
                </h3>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-[#1a1750] to-[#2a1f70] p-4 rounded-lg text-white">
                    <p className="text-sm text-gray-300">Total Invested</p>
                    <p className="text-xl font-bold">₹{calculationResult.totalInvested.toLocaleString()}</p>
                  </div>
                  <div className="bg-gradient-to-br from-[#fbb81f] to-[#f59e0b] p-4 rounded-lg text-white">
                    <p className="text-sm text-white/80">Maturity Amount</p>
                    <p className="text-xl font-bold">₹{calculationResult.maturityAmount.toLocaleString()}</p>
                  </div>
                  <div className="bg-green-600 p-4 rounded-lg text-white col-span-2">
                    <p className="text-sm text-green-200">Total Gains</p>
                    <p className="text-2xl font-bold">₹{calculationResult.gains.toLocaleString()}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={calculationResult.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="year" 
                        tickFormatter={(value) => `Year ${value}`}
                      />
                      <YAxis 
                        tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                      />
                      <Tooltip 
                        formatter={(value: number, name: string) => [
                          `₹${value.toLocaleString()}`,
                          name === 'invested' ? 'Total Invested' : 'Maturity Value'
                        ]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="invested"
                        stackId="1"
                        stroke="#1a1750"
                        fill="#1a1750"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="maturity"
                        stackId="2"
                        stroke="#fbb81f"
                        fill="#fbb81f"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-100 section-padding">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-black/90  leading-relaxed">
            Our expert advisors can help you choose the right investment strategy based on your calculations.
          </p>
          
        </div>
      </section>
    </div>
  );
};

// SIP Calculator Form Component
const SIPCalculatorForm = ({ onCalculate, setResult }: any) => {
  const [formData, setFormData] = useState({
    monthlyAmount: 5000,
    years: 10,
    annualReturn: 12
  });

  const handleCalculate = () => {
    const result = onCalculate(formData.monthlyAmount, formData.years, formData.annualReturn);
    setResult(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1a1750] mb-6">SIP Calculator</h3>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">Monthly Investment Amount (₹)</label>
          <input
            type="number"
            value={formData.monthlyAmount}
            onChange={(e) => setFormData({ ...formData, monthlyAmount: Number(e.target.value) })}
            className="form-input"
            min="500"
            step="500"
          />
        </div>

        <div>
          <label className="form-label">Investment Period (Years)</label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => setFormData({ ...formData, years: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="50"
          />
        </div>

        <div>
          <label className="form-label">Expected Annual Return (%)</label>
          <input
            type="number"
            value={formData.annualReturn}
            onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="30"
            step="0.5"
          />
        </div>

        <button onClick={handleCalculate} className="btn-accent w-full flex justify-center items-center">
          <Calculator className="w-5 h-5 mr-2" />
          <div>
          Calculate SIP Returns
          </div>
        </button>
      </div>
    </div>
  );
};

// Goal Calculator Form Component
const GoalCalculatorForm = ({ onCalculate, setResult }: any) => {
  const [formData, setFormData] = useState({
    targetAmount: 1000000,
    years: 10,
    annualReturn: 12
  });

  const handleCalculate = () => {
    const result = onCalculate(formData.targetAmount, formData.years, formData.annualReturn);
    setResult(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1a1750] mb-6">Goal Calculator</h3>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">Target Amount (₹)</label>
          <input
            type="number"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
            className="form-input"
            min="10000"
            step="10000"
          />
        </div>

        <div>
          <label className="form-label">Time to Achieve Goal (Years)</label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => setFormData({ ...formData, years: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="50"
          />
        </div>

        <div>
          <label className="form-label">Expected Annual Return (%)</label>
          <input
            type="number"
            value={formData.annualReturn}
            onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="30"
            step="0.5"
          />
        </div>

        <button onClick={handleCalculate} className="btn-accent w-full flex justify-center items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Monthly Investment
        </button>
      </div>
    </div>
  );
};

// Education Calculator (similar to Goal Calculator)
const EducationCalculatorForm = ({ onCalculate, setResult }: any) => {
  const [formData, setFormData] = useState({
    targetAmount: 2000000,
    years: 15,
    annualReturn: 12
  });

  const handleCalculate = () => {
    const result = onCalculate(formData.targetAmount, formData.years, formData.annualReturn);
    setResult(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1a1750] mb-6">Education Calculator</h3>
      <p className="text-gray-600 mb-6">Plan for your child's future education expenses.</p>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">Expected Education Cost (₹)</label>
          <input
            type="number"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
            className="form-input"
            min="100000"
            step="50000"
          />
        </div>

        <div>
          <label className="form-label">Years Until Admission</label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => setFormData({ ...formData, years: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="25"
          />
        </div>

        <div>
          <label className="form-label">Expected Annual Return (%)</label>
          <input
            type="number"
            value={formData.annualReturn}
            onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="30"
            step="0.5"
          />
        </div>

        <button onClick={handleCalculate} className="btn-accent w-full flex justify-center items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Education Fund
        </button>
      </div>
    </div>
  );
};

// Marriage Calculator
const MarriageCalculatorForm = ({ onCalculate, setResult }: any) => {
  const [formData, setFormData] = useState({
    targetAmount: 1500000,
    years: 8,
    annualReturn: 12
  });

  const handleCalculate = () => {
    const result = onCalculate(formData.targetAmount, formData.years, formData.annualReturn);
    setResult(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1a1750] mb-6">Marriage Calculator</h3>
      <p className="text-gray-600 mb-6">Plan for marriage and wedding expenses.</p>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">Expected Marriage Cost (₹)</label>
          <input
            type="number"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
            className="form-input"
            min="100000"
            step="50000"
          />
        </div>

        <div>
          <label className="form-label">Years Until Marriage</label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => setFormData({ ...formData, years: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="30"
          />
        </div>

        <div>
          <label className="form-label">Expected Annual Return (%)</label>
          <input
            type="number"
            value={formData.annualReturn}
            onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="30"
            step="0.5"
          />
        </div>

        <button onClick={handleCalculate} className="btn-accent w-full flex justify-center items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Marriage Fund
        </button>
      </div>
    </div>
  );
};

// Retirement Calculator
const RetirementCalculatorForm = ({ onCalculate, setResult }: any) => {
  const [formData, setFormData] = useState({
    targetAmount: 10000000,
    years: 25,
    annualReturn: 12
  });

  const handleCalculate = () => {
    const result = onCalculate(formData.targetAmount, formData.years, formData.annualReturn);
    setResult(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1a1750] mb-6">Retirement Calculator</h3>
      <p className="text-gray-600 mb-6">Plan your retirement corpus for financial independence.</p>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">Retirement Corpus Needed (₹)</label>
          <input
            type="number"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
            className="form-input"
            min="1000000"
            step="500000"
          />
        </div>

        <div>
          <label className="form-label">Years Until Retirement</label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => setFormData({ ...formData, years: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="40"
          />
        </div>

        <div>
          <label className="form-label">Expected Annual Return (%)</label>
          <input
            type="number"
            value={formData.annualReturn}
            onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="30"
            step="0.5"
          />
        </div>

        <button onClick={handleCalculate} className="btn-accent w-full flex justify-center items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Retirement Fund
        </button>
      </div>
    </div>
  );
};

// HLV Calculator
const HLVCalculatorForm = ({ onCalculate, setResult }: any) => {
  const [formData, setFormData] = useState({
    targetAmount: 5000000,
    years: 20,
    annualReturn: 8
  });

  const handleCalculate = () => {
    const result = onCalculate(formData.targetAmount, formData.years, formData.annualReturn);
    setResult(result);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[#1a1750] mb-6">Human Life Value Calculator</h3>
      <p className="text-gray-600 mb-6">Calculate insurance coverage needed for your family's financial security.</p>
      
      <div className="space-y-6">
        <div>
          <label className="form-label">Insurance Coverage Needed (₹)</label>
          <input
            type="number"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
            className="form-input"
            min="500000"
            step="100000"
          />
        </div>

        <div>
          <label className="form-label">Working Years Remaining</label>
          <input
            type="number"
            value={formData.years}
            onChange={(e) => setFormData({ ...formData, years: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="40"
          />
        </div>

        <div>
          <label className="form-label">Expected Return on Investment (%)</label>
          <input
            type="number"
            value={formData.annualReturn}
            onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) })}
            className="form-input"
            min="1"
            max="20"
            step="0.5"
          />
        </div>

        <button onClick={handleCalculate} className="btn-accent w-full flex justify-center items-center">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate HLV Insurance
        </button>
      </div>
    </div>
  );
};

export default InvestmentPlanner; 