import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  DollarSign,
  BarChart3,
  Target,
  Search,
  Users,
  FileText,
  Camera,
  Globe,
  Zap,
  Shield,
  Star
} from 'lucide-react';

export default function RentMaximizationService() {
  const benefits = {
    owners: [
      {
        title: 'Data-Driven Pricing',
        description: 'We analyze hundreds of comparable properties, market trends, and seasonal factors to find your optimal rent price—not too high to sit vacant, not too low to leave money on the table.'
      },
      {
        title: 'Strategic Improvements',
        description: 'We identify which upgrades deliver the best ROI. Sometimes a $500 improvement can increase rent by $100/month—a 240% annual return.'
      },
      {
        title: 'Reduced Vacancy',
        description: 'Proper pricing and marketing means faster placement. Our average days-on-market is 60% lower than the regional average.'
      },
      {
        title: 'Quality Tenants',
        description: 'Higher rents attract better tenants. Our screening process ensures you get reliable, long-term renters who care for your property.'
      },
      {
        title: 'Annual Rent Reviews',
        description: 'We proactively review rents annually and recommend adjustments based on market conditions, ensuring you never fall behind.'
      }
    ],
    tenants: [
      {
        title: 'Fair Market Pricing',
        description: 'Our data-driven approach means fair, competitive rents—not inflated prices or hidden fees.'
      },
      {
        title: 'Quality Properties',
        description: 'Properties managed for maximum value are well-maintained and regularly updated.'
      },
      {
        title: 'Transparent Process',
        description: 'Clear pricing, clear terms, no surprises. What you see is what you get.'
      },
      {
        title: 'Responsive Management',
        description: 'Properties optimized for rent are also optimized for tenant satisfaction—it\'s how we keep occupancy high.'
      }
    ]
  };

  const whatSetsUsApart = [
    {
      icon: BarChart3,
      title: 'Real Market Data',
      description: 'We don\'t guess. Our pricing recommendations are based on analysis of current listings, recent rentals, and market trends—not just what the owner hopes to get.'
    },
    {
      icon: Target,
      title: 'ROI-Focused Strategy',
      description: 'Every recommendation we make is tied to return on investment. We\'ll tell you exactly what an improvement will cost and what rent increase it will generate.'
    },
    {
      icon: Camera,
      title: 'Professional Marketing',
      description: 'Professional photography, compelling descriptions, and listings syndicated to 20+ platforms ensure maximum exposure for your property.'
    },
    {
      icon: Search,
      title: 'Competitive Analysis',
      description: 'We continuously monitor what comparable properties are renting for, ensuring your property stays competitively positioned.'
    },
    {
      icon: Users,
      title: 'Tenant Quality Focus',
      description: 'Higher rents attract better tenants. We\'ve found that properties priced at market rate (not below) attract more responsible renters.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'We balance maximizing rent with minimizing vacancy risk. An extra $50/month means nothing if the unit sits empty for two months.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Property Assessment',
      description: 'We evaluate your property\'s condition, features, and location to understand its market position.'
    },
    {
      step: '02',
      title: 'Market Analysis',
      description: 'Deep dive into comparable rentals, vacancy rates, and trends in your specific area.'
    },
    {
      step: '03',
      title: 'Pricing Strategy',
      description: 'We develop a pricing recommendation with supporting data and ROI projections.'
    },
    {
      step: '04',
      title: 'Improvement Plan',
      description: 'If applicable, we identify strategic upgrades that will increase rent beyond their cost.'
    },
    {
      step: '05',
      title: 'Marketing Launch',
      description: 'Professional photos, optimized listings, and multi-platform syndication.'
    },
    {
      step: '06',
      title: 'Ongoing Optimization',
      description: 'Annual rent reviews and market monitoring to keep your income maximized.'
    }
  ];

  const results = [
    { metric: '23%', label: 'Average Rent Increase', description: 'For new clients in year one' },
    { metric: '14 Days', label: 'Average Days to Rent', description: 'vs. 35 day regional average' },
    { metric: '96%', label: 'Occupancy Rate', description: 'Across our managed portfolio' },
    { metric: '$2.4M', label: 'Additional Revenue', description: 'Generated for owners last year' }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="rent-maximization-service-page">
      <SEO 
        title="Rent Maximization Services"
        description="Maximize your rental income with NB Rents. Market analysis, strategic pricing, professional photography, and tenant screening. Average 23% rent increase."
        keywords="rent maximization New Brunswick, increase rental income, property pricing strategy, tenant screening"
      />
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="container-main">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-200 text-amber-800 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              Maximize Returns
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Rent
              <span className="text-amber-600"> Maximization</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Stop leaving money on the table. Our data-driven approach to pricing and marketing ensures your property generates maximum rental income while maintaining high occupancy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="btn-accent flex items-center gap-2">
                  Get a Free Analysis
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:5069627368">
                <Button variant="outline" className="border-amber-600 text-amber-700 hover:bg-amber-50">
                  Call (506) 962-RENT(7368)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 bg-gray-900">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.metric}
                </div>
                <div className="text-white font-medium mb-1">{item.label}</div>
                <div className="text-gray-400 text-sm">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Anyone can list a property. We optimize it for maximum returns using data, strategy, and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatSetsUsApart.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Process
            </h2>
            <p className="text-lg text-gray-600">A systematic approach to maximizing your rental income</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-amber-100 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Owners */}
      <section className="py-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Benefits for
                <span className="text-amber-600"> Property Owners</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our rent maximization strategy is designed to increase your income while protecting your investment.
              </p>
              <div className="space-y-6">
                {benefits.owners.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-3xl p-8 lg:p-12">
              <div className="text-center">
                <div className="text-6xl font-bold text-amber-600 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  $347
                </div>
                <p className="text-amber-800 font-medium mb-6">Average Monthly Increase Per Property</p>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-amber-300">
                  <div>
                    <div className="text-3xl font-bold text-amber-700">$4,164</div>
                    <p className="text-sm text-amber-700">Extra Per Year</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-700">60%</div>
                    <p className="text-sm text-amber-700">Faster Placement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Tenants */}
      <section className="py-24 bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Benefits for
              <span className="text-amber-600"> Tenants</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A well-managed property is a well-maintained property. Here's what tenants can expect.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.tenants.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center"
              >
                <CheckCircle className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24">
        <div className="container-main">
          <div className="bg-gray-900 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  Success Story
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  "They increased our rent by $400/month and found a tenant in 8 days."
                </h3>
                <p className="text-gray-300 mb-6">
                  When the Thompsons came to us, their duplex had been rented at the same rate for 5 years. We identified $2,000 in strategic improvements, professionally marketed the units, and placed quality tenants at market rate.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-400">$800</div>
                    <div className="text-sm text-gray-400">Before</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-600" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-400">$1,200</div>
                    <div className="text-sm text-gray-400">After</div>
                  </div>
                  <div className="text-center ml-4 pl-4 border-l border-gray-700">
                    <div className="text-2xl font-bold text-emerald-400">$4,800</div>
                    <div className="text-sm text-gray-400">Extra/Year</div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-block bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8">
                  <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    50%
                  </div>
                  <p className="text-amber-100 font-medium">Rent Increase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-amber-500">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            How Much Rent Could You Be Getting?
          </h2>
          <p className="text-lg text-amber-100 mb-8 max-w-2xl mx-auto">
            Get a free rent analysis for your property. We'll show you exactly what your property could rent for and what improvements would make the biggest impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-amber-600 hover:bg-amber-50 rounded-full px-8 py-4 font-bold">
                Get Your Free Analysis
              </Button>
            </Link>
            <a href="tel:5069627368">
              <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4">
                Call (506) 962-RENT(7368)
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
