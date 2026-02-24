import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import { 
  Hammer, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Home,
  Paintbrush,
  Wrench,
  Sparkles,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react';

export default function RenovationService() {
  const benefits = {
    owners: [
      {
        title: 'Increased Property Value',
        description: 'Our renovations typically increase property values by 15-30%, giving you a stronger asset and higher resale potential.'
      },
      {
        title: 'Higher Rental Income',
        description: 'Updated properties command premium rents. Our clients see an average 23% increase in rental income after renovations.'
      },
      {
        title: 'Faster Tenant Placement',
        description: 'Modern, renovated units rent 3x faster than outdated ones, minimizing your vacancy periods.'
      },
      {
        title: 'Lower Maintenance Costs',
        description: 'New fixtures, appliances, and systems mean fewer repairs and emergency calls down the road.'
      },
      {
        title: 'Tax Benefits',
        description: 'Many renovation expenses can be depreciated or deducted, improving your tax position.'
      }
    ],
    tenants: [
      {
        title: 'Modern Living Spaces',
        description: 'Enjoy updated kitchens, bathrooms, and living areas with contemporary finishes and fixtures.'
      },
      {
        title: 'Energy Efficiency',
        description: 'Renovated units feature better insulation, efficient appliances, and lower utility bills.'
      },
      {
        title: 'Safety & Comfort',
        description: 'New electrical, plumbing, and HVAC systems ensure a safe, comfortable living environment.'
      },
      {
        title: 'Pride in Your Home',
        description: 'Live in a space that looks and feels new, making it a place you\'re proud to call home.'
      }
    ]
  };

  const whatSetsUsApart = [
    {
      icon: Users,
      title: 'Fully In-House Team',
      description: 'Unlike other property managers who outsource to random contractors, our renovation crew is 100% in-house. This means consistent quality, accountability, and faster turnaround times.'
    },
    {
      icon: DollarSign,
      title: 'No Markup on Materials',
      description: 'We pass our contractor-level pricing directly to you. No hidden fees, no inflated material costs—just honest pricing.'
    },
    {
      icon: Clock,
      title: 'Minimal Vacancy Time',
      description: 'Our dedicated team works efficiently to complete renovations quickly, getting your property back on the market faster than traditional contractors.'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Every renovation comes with our workmanship guarantee. If something isn\'t right, we fix it—no questions asked.'
    },
    {
      icon: TrendingUp,
      title: 'ROI-Focused Approach',
      description: 'We don\'t just renovate—we strategically improve. Every dollar spent is calculated to maximize your return on investment.'
    },
    {
      icon: Sparkles,
      title: 'One Point of Contact',
      description: 'No juggling multiple contractors. Your property manager coordinates everything, keeping you informed every step of the way.'
    }
  ];

  const services = [
    { icon: Paintbrush, name: 'Full Interior Painting', description: 'Professional painting with premium paints that last' },
    { icon: Home, name: 'Kitchen Remodels', description: 'Cabinet refacing, countertops, backsplashes, and appliances' },
    { icon: Wrench, name: 'Bathroom Renovations', description: 'Modern vanities, fixtures, tile work, and more' },
    { icon: Hammer, name: 'Flooring Installation', description: 'Hardwood, LVP, tile, and carpet installation' },
    { icon: Sparkles, name: 'Fixture Upgrades', description: 'Lighting, hardware, faucets, and smart home features' },
    { icon: Home, name: 'Full Unit Turnovers', description: 'Complete transformations between tenants' }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="renovation-service-page">
      <SEO 
        title="Property Renovation Services"
        description="In-house renovation services by NB Rents. Professional kitchen and bathroom remodels, flooring, painting, and more. Increase your property value today."
        keywords="property renovation New Brunswick, kitchen remodel, bathroom renovation, property improvement NB Rents"
      />
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="container-main">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-200 text-emerald-800 text-sm font-medium mb-6">
              <Hammer className="w-4 h-4" />
              In-House Service
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              In-House
              <span className="text-emerald-600"> Renovations</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Transform your property with our expert renovation crew. From kitchen remodels to complete unit turnovers, our in-house team delivers quality workmanship that maximizes your property's value and rental potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="btn-primary flex items-center gap-2">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:5069627368">
                <Button variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                  Call (506) 962-RENT(7368)
                </Button>
              </a>
            </div>
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
              Most property managers outsource renovations. We do it all in-house—and that makes all the difference.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatSetsUsApart.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-emerald-600" />
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

      {/* Our Services */}
      <section className="py-24 bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Renovation Services
            </h2>
            <p className="text-lg text-gray-600">Everything you need under one roof</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
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
                <span className="text-emerald-600"> Property Owners</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Renovations aren't just about aesthetics—they're strategic investments that pay dividends for years to come.
              </p>
              <div className="space-y-6">
                {benefits.owners.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-3xl p-8 lg:p-12">
              <div className="text-center">
                <div className="text-6xl font-bold text-emerald-600 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  23%
                </div>
                <p className="text-emerald-800 font-medium mb-6">Average Rent Increase After Renovation</p>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-emerald-300">
                  <div>
                    <div className="text-3xl font-bold text-emerald-700">3x</div>
                    <p className="text-sm text-emerald-700">Faster Tenant Placement</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-700">15-30%</div>
                    <p className="text-sm text-emerald-700">Property Value Increase</p>
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
              <span className="text-emerald-600"> Tenants</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our renovations create homes people love to live in.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.tenants.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center"
              >
                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-emerald-600">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to Transform Your Property?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
            Get a free consultation and quote from our renovation experts. No obligation, just honest advice on maximizing your property's potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 rounded-full px-8 py-4 font-bold">
                Get Your Free Quote
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
