import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, AlertTriangle, Phone } from 'lucide-react';

const questions = [
  {
    question: "How many rental properties do you currently own?",
    options: [
      { text: "1 property", score: 1 },
      { text: "2-4 properties", score: 2 },
      { text: "5-10 properties", score: 3 },
      { text: "More than 10", score: 4 }
    ]
  },
  {
    question: "How many hours per week do you spend on property management tasks?",
    options: [
      { text: "Less than 2 hours", score: 1 },
      { text: "2-5 hours", score: 2 },
      { text: "5-10 hours", score: 3 },
      { text: "More than 10 hours", score: 4 }
    ]
  },
  {
    question: "How do you currently handle maintenance and repair requests?",
    options: [
      { text: "I fix everything myself", score: 3 },
      { text: "I call contractors each time", score: 2 },
      { text: "I have a handyman on call", score: 1 },
      { text: "I often delay or ignore them", score: 4 }
    ]
  },
  {
    question: "How do you find and screen new tenants?",
    options: [
      { text: "Word of mouth / Kijiji ads", score: 2 },
      { text: "I do background and credit checks", score: 1 },
      { text: "I accept whoever applies first", score: 4 },
      { text: "I struggle to fill vacancies", score: 3 }
    ]
  },
  {
    question: "Do you know the current market rent for your area?",
    options: [
      { text: "Yes, I research it regularly", score: 1 },
      { text: "I have a rough idea", score: 2 },
      { text: "Not really, I haven't raised rent in years", score: 3 },
      { text: "No, I'm probably charging too little", score: 4 }
    ]
  },
  {
    question: "How do you handle late rent payments?",
    options: [
      { text: "I have a clear policy and enforce it", score: 1 },
      { text: "I send reminders but often let it slide", score: 2 },
      { text: "It's awkward, I avoid confrontation", score: 3 },
      { text: "Late payments are a constant issue", score: 4 }
    ]
  },
  {
    question: "Are you familiar with New Brunswick's landlord-tenant laws?",
    options: [
      { text: "Yes, I stay up to date", score: 1 },
      { text: "Somewhat, I know the basics", score: 2 },
      { text: "Not really, I wing it", score: 3 },
      { text: "No, it stresses me out", score: 4 }
    ]
  },
  {
    question: "How would you describe your experience as a landlord?",
    options: [
      { text: "I enjoy it and have it under control", score: 1 },
      { text: "It's manageable but time-consuming", score: 2 },
      { text: "It's stressful and overwhelming", score: 3 },
      { text: "I'm ready to hand it off to someone", score: 4 }
    ]
  }
];

const results = [
  {
    range: [8, 14],
    title: "You're Doing Great!",
    color: "emerald",
    icon: CheckCircle2,
    summary: "You seem to have a good handle on property management. You're organized, informed, and proactive.",
    detail: "That said, even experienced landlords can benefit from professional support. As your portfolio grows, a property manager can free up your time and help maximize your returns.",
    cta: "Want to explore how we can help you grow?"
  },
  {
    range: [15, 22],
    title: "You Could Use Some Help",
    color: "amber",
    icon: AlertTriangle,
    summary: "You're managing, but there are areas where professional help could save you time, money, and stress.",
    detail: "From tenant screening to maintenance coordination and rent optimization, a property manager handles the heavy lifting so you can enjoy the benefits of your investment without the headaches.",
    cta: "Let us take the stress off your plate"
  },
  {
    range: [23, 32],
    title: "You Definitely Need a Property Manager",
    color: "red",
    icon: AlertTriangle,
    summary: "Based on your answers, property management is taking a real toll on your time and peace of mind.",
    detail: "You're likely leaving money on the table with below-market rents, dealing with avoidable maintenance emergencies, and risking legal issues. A professional property manager like NB Rents can transform your experience from stressful to profitable.",
    cta: "Let's talk about how we can help"
  }
];

function getResult(score) {
  for (const result of results) {
    if (score >= result.range[0] && score <= result.range[1]) return result;
  }
  return results[results.length - 1];
}

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQ) / questions.length) * 100;
  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const result = getResult(totalScore);

  const handleSelect = (score) => {
    setSelectedOption(score);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQ + 1 >= questions.length) {
      setShowResults(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      const newAnswers = [...answers];
      const prevAnswer = newAnswers.pop();
      setAnswers(newAnswers);
      setSelectedOption(prevAnswer);
      setCurrentQ(currentQ - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <SEO 
        title="Should I Hire a Property Manager? | Free Quiz | NB Rents"
        description="Take our free quiz to find out if hiring a property manager is right for you. Get personalized results in under 2 minutes."
      />

      <div className="container-main py-12 sm:py-20">
        <div className="max-w-2xl mx-auto">

          {!showResults ? (
            <>
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Should I Hire a Property Manager?
                </h1>
                <p className="text-gray-500">Answer {questions.length} quick questions to find out</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Question {currentQ + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQ + (selectedOption !== null ? 1 : 0)) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8" data-testid="quiz-question-card">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
                  {questions[currentQ].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQ].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(option.score)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedOption === option.score
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                          : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
                      }`}
                      data-testid={`quiz-option-${idx}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedOption === option.score ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'
                        }`}>
                          {selectedOption === option.score && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="font-medium">{option.text}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    disabled={currentQ === 0}
                    data-testid="quiz-back-btn"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button 
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    data-testid="quiz-next-btn"
                  >
                    {currentQ + 1 === questions.length ? 'See Results' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Your Results
                </h1>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden" data-testid="quiz-results">
                {/* Score Banner */}
                <div className={`p-6 sm:p-8 text-center ${
                  result.color === 'emerald' ? 'bg-emerald-50' : 
                  result.color === 'amber' ? 'bg-amber-50' : 'bg-red-50'
                }`}>
                  <result.icon className={`w-16 h-16 mx-auto mb-4 ${
                    result.color === 'emerald' ? 'text-emerald-600' : 
                    result.color === 'amber' ? 'text-amber-600' : 'text-red-600'
                  }`} />
                  <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                    result.color === 'emerald' ? 'text-emerald-900' : 
                    result.color === 'amber' ? 'text-amber-900' : 'text-red-900'
                  }`}>
                    {result.title}
                  </h2>
                  <p className="text-gray-600">Score: {totalScore} / {questions.length * 4}</p>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 space-y-4">
                  <p className="text-lg font-medium text-gray-900">{result.summary}</p>
                  <p className="text-gray-600 leading-relaxed">{result.detail}</p>
                  
                  {/* CTA */}
                  <div className="bg-indigo-50 rounded-xl p-6 mt-6">
                    <h3 className="font-bold text-indigo-900 text-lg mb-2">{result.cta}</h3>
                    <p className="text-indigo-700 text-sm mb-4">
                      NB Rents offers full-service property management with in-house renovation and maintenance crews. We've helped owners increase rent by an average of 23%.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to="/contact">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto" data-testid="quiz-contact-btn">
                          Get a Free Consultation
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                      <a href="tel:5069627368">
                        <Button variant="outline" className="w-full sm:w-auto" data-testid="quiz-call-btn">
                          <Phone className="w-4 h-4 mr-2" />
                          Call (506) 962-RENT
                        </Button>
                      </a>
                    </div>
                  </div>

                  {/* Restart */}
                  <div className="text-center pt-4">
                    <button 
                      onClick={handleRestart}
                      className="text-indigo-600 hover:text-indigo-800 font-medium text-sm inline-flex items-center gap-2"
                      data-testid="quiz-restart-btn"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Take the quiz again
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
