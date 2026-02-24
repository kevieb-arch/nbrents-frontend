import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import { 
  Wrench, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Phone,
  Shield,
  Zap,
  Droplets,
  Thermometer,
  Home,
  AlertTriangle,
  Calendar,
  Users,
  Star
} from 'lucide-react';

export default function MaintenanceService() {
  const benefits = {
    owners: [
      {
        title: 'Protect Your Investment',
        description: 'Regular maintenance prevents small issues from becoming expensive repairs. We catch problems early, saving you thousands.'
      },
      {
        title: 'Happy Tenants = Long Tenancies',
        description: 'Quick response to maintenance requests keeps tenants satisfied and reduces turnover—your biggest expense.'
      },
      {
        title: 'No Contractor Headaches',
        description: 'Forget about finding reliable contractors, getting quotes, and coordinating schedules. We handle it all.'
      },
      {
        title: 'Transparent Pricing',
        description: 'No surprise bills. Our in-house team means consistent, fair pricing without contractor markups.'
      },
      {
        title: 'Preventive Care',
        description: 'We don\'t just fix problems—we prevent them with scheduled inspections and preventive maintenance programs.'
      }
    ],
    tenants: [
      {
        title: '24/7 Emergency Response',
        description: 'Burst pipe at 2 AM? We\'re there. True emergencies get immediate attention, any time of day or night.'
      },
      {
        title: 'Fast Resolution Times',
        description: 'Most routine requests are addressed within 24-48 hours. No waiting weeks for simple repairs.'
      },
      {
        title: 'Easy Request System',
        description: 'Submit requests through your tenant portal anytime. Track progress and get updates automatically.'
      },
      {
        title: 'Professional, Respectful Service',
        description: 'Our maintenance team treats your home with respect—arriving on time, working cleanly, and communicating clearly.'
      }
    ]
  };

  const whatSetsUsApart = [
    {
      icon: Users,
      title: '100% In-House Team',
      description: 'Our maintenance technicians are NB Rents employees, not random contractors. They know your property, they\'re accountable, and they care about their work.'
    },
    {
      icon: Clock,
      title: 'Guaranteed Response Times',
      description: 'Emergencies: 2 hours or less. Urgent issues: Same day. Routine requests: 24-48 hours. We put it in writing.'
    },
    {
      icon: Phone,
      title: 'True 24/7 Availability',
      description: 'Our emergency line is answered by real people, not voicemail. When you call at midnight, someone picks up.'
    },
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'All our technicians are fully licensed, insured, and background-checked for your peace of mind.'
    },
    {
      icon: Zap,
      title: 'Multi-Skilled Technicians',
      description: 'Our team handles plumbing, electrical, HVAC, appliances, and general repairs—one call covers it all.'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Not satisfied? We\'ll make it right. Our work is guaranteed, and our reputation depends on your satisfaction.'
    }
  ];

  const services = [
    { icon: Droplets, name: 'Plumbing', description: 'Leaks, clogs, faucets, toilets, water heaters' },
    { icon: Zap, name: 'Electrical', description: 'Outlets, switches, breakers, lighting, safety checks' },
    { icon: Thermometer, name: 'HVAC', description: 'Heating, cooling, ventilation, filter changes' },
    { icon: Home, name: 'Appliances', description: 'Repair and maintenance of all major appliances' },
    { icon: Wrench, name: 'General Repairs', description: 'Doors, windows, drywall, fixtures, and more' },
    { icon: Calendar, name: 'Preventive Care', description: 'Seasonal inspections and scheduled maintenance' }
  ];

  const emergencyTypes = [
    { type: 'No Heat (Winter)', response: 'Under 2 Hours' },
    { type: 'Flooding/Water Leak', response: 'Under 2 Hours' },
    { type: 'No Hot Water', response: 'Same Day' },
    { type: 'Electrical Emergency', response: 'Under 2 Hours' },
    { type: 'Lock-Out Assistance', response: 'Under 2 Hours' },
    { type: 'Gas Smell', response: 'Immediate (Call 911 First)' }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="maintenance-service-page">
      <SEO 
        title="24/7 Property Maintenance"
        description="24/7 property maintenance services by NB Rents. Emergency repairs, plumbing, electrical, HVAC, and more. Under 2-hour response time."
        keywords="property maintenance New Brunswick, 24/7 repairs, emergency maintenance, plumbing electrical HVAC"
      />
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="container-main">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-200 text-indigo-800 text-sm font-medium mb-6">
              <Clock className="w-4 h-4" />
              24/7 Service
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              24/7 In-House
              <span className="text-indigo-600"> Maintenance</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              When something breaks, you need it fixed fast. Our in-house maintenance team responds around the clock, ensuring your property stays in perfect condition and your tenants stay happy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button className="btn-primary flex items-center gap-2">
                  Schedule Service
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:5069627368">
                <Button variant="outline" className="border-indigo-600 text-indigo-700 hover:bg-indigo-50">
                  Emergency: (506) 962-RENT(7368)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Response */}
      <section className="py-16 bg-red-50 border-y border-red-100">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Emergency? We're Here.
                </h3>
                <p className="text-gray-600">24/7 emergency response for urgent issues</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              {emergencyTypes.slice(0, 3).map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center">
                  <p className="font-medium text-gray-900 text-sm">{item.type}</p>
                  <p className="text-red-600 font-bold">{item.response}</p>
                </div>
              ))}
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
              Other property managers call contractors. We have our own team—and that changes everything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatSetsUsApart.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-indigo-600" />
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

      {/* Services We Cover */}
      <section className="py-24 bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Services We Cover
            </h2>
            <p className="text-lg text-gray-600">One team, all your maintenance needs</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-indigo-600" />
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
                <span className="text-indigo-600"> Property Owners</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Professional maintenance isn't just about fixing things—it's about protecting your investment and keeping great tenants.
              </p>
              <div className="space-y-6">
                {benefits.owners.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-3xl p-8 lg:p-12">
              <div className="text-center">
                <div className="text-6xl font-bold text-indigo-600 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  2hr
                </div>
                <p className="text-indigo-800 font-medium mb-6">Emergency Response Guarantee</p>
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-indigo-300">
                  <div>
                    <div className="text-3xl font-bold text-indigo-700">24/7</div>
                    <p className="text-sm text-indigo-700">Availability</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-indigo-700">98%</div>
                    <p className="text-sm text-indigo-700">Tenant Satisfaction</p>
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
              <span className="text-indigo-600"> Tenants</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe tenants deserve responsive, professional service. Here's what you can expect.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.tenants.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 text-center"
              >
                <CheckCircle className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-indigo-600">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Experience Maintenance Done Right
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Whether you're an owner looking for reliable property care or a tenant who deserves responsive service, we're here for you—24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full px-8 py-4 font-bold">
                Contact Us Today
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
