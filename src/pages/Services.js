import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import { 
  Wrench, 
  Home, 
  TrendingUp, 
  Shield, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Hammer,
  Paintbrush,
  Zap,
  Droplets,
  Building,
  Calculator
} from 'lucide-react';

export default function Services() {
  const mainServices = [
    {
      icon: Hammer,
      title: 'In-House Renovations',
      description: 'Complete property transformations from our expert renovation crew.',
      features: [
        'Kitchen & bathroom remodels',
        'Flooring installation',
        'Painting & finishing',
        'Fixture upgrades',
        'Full unit turnover renovations'
      ],
      color: 'from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-500',
      link: '/services/renovations'
    },
    {
      icon: Wrench,
      title: '24/7 Maintenance',
      description: 'Rapid response maintenance team available around the clock.',
      features: [
        'Emergency repairs',
        'Preventive maintenance',
        'Appliance servicing',
        'HVAC maintenance',
        'Seasonal property prep'
      ],
      color: 'from-indigo-50 to-indigo-100',
      iconBg: 'bg-indigo-500',
      link: '/services/maintenance'
    },
    {
      icon: TrendingUp,
      title: 'Rent Maximization',
      description: 'Strategic pricing to ensure maximum return on your investment.',
      features: [
        'Market analysis',
        'Competitive pricing strategy',
        'Property improvements ROI',
        'Lease optimization',
        'Revenue forecasting'
      ],
      color: 'from-amber-50 to-amber-100',
      iconBg: 'bg-amber-500',
      link: '/services/rent-maximization'
    }
  ];

  const additionalServices = [
    {
      icon: Users,
      title: 'Tenant Screening',
      description: 'Thorough background checks and verification to find quality tenants.'
    },
    {
      icon: FileText,
      title: 'Financial Reporting',
      description: 'Detailed monthly statements and annual tax documentation.'
    },
    {
      icon: Shield,
      title: 'Legal Compliance',
      description: 'Stay compliant with all local and provincial regulations.'
    },
    {
      icon: Clock,
      title: 'Rent Collection',
      description: 'Automated rent collection with on-time payment tracking.'
    },
    {
      icon: Building,
      title: 'Property Marketing',
      description: 'Professional photos, listings, and tenant acquisition.'
    },
    {
      icon: Calculator,
      title: 'Investment Analysis',
      description: 'Detailed ROI analysis and property performance metrics.'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We assess your property and discuss your goals.'
    },
    {
      number: '02',
      title: 'Custom Plan',
      description: 'We create a tailored management strategy.'
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Our teams handle renovations and improvements.'
    },
    {
      number: '04',
      title: 'Management',
      description: 'Ongoing management with regular reporting.'
    }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="services-page">
      <SEO 
        title="Property Management Services - Renovations, Maintenance, Rent Maximization"
        description="Full-service property management in New Brunswick. In-house renovations, 24/7 maintenance, tenant screening, rent maximization, and financial reporting. Call (506) 962-RENT(7368)."
        keywords="property management services, renovation services NB, 24/7 maintenance, rent maximization, tenant screening, property marketing"
      />
      {/* Hero */}
      <section className="py-24 lg:py-32">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Full-Service Property Management
              <span className="gradient-text"> Under One Roof</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              From renovations to rent collection, our in-house teams handle every aspect of property management. No third-party contractors, no delays, no surprises.
            </p>
            <Link to="/contact">
              <Button className="btn-primary flex items-center gap-2" data-testid="services-contact-cta">
                Get a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24 section-gray" data-testid="main-services">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600">What sets us apart from traditional property managers</p>
          </div>

          <div className="space-y-8">
            {mainServices.map((service, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-r ${service.color} rounded-3xl p-8 lg:p-12 animate-fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {service.title}
                    </h3>
                    <p className="text-gray-700 text-lg mb-6">{service.description}</p>
                    <Link to={service.link}>
                      <Button variant="ghost" className="text-gray-800 hover:text-indigo-600 p-0">
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3 bg-white/60 rounded-xl p-4">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Grid */}
      <section className="py-24" data-testid="additional-services">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Additional Services
            </h2>
            <p className="text-lg text-gray-600">Everything else you need for worry-free property ownership</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-gray-700" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 section-gray" data-testid="process-section">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Getting started with NB Rents is simple</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-indigo-100 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-indigo-200" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-24 bg-gray-900" data-testid="services-cta">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Custom Solutions for Every Property
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Our pricing is tailored to your specific needs. Contact us for a free property assessment and custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-accent flex items-center gap-2" data-testid="services-get-quote">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:5069627368">
              <Button variant="outline" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-8 py-4">
                Call (506) 962-RENT(7368)
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
