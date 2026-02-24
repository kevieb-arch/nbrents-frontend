import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PropertyCard } from '../components/PropertyCard';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { ArrowRight, Wrench, Home as HomeIcon, TrendingUp, Shield, Clock, Star, ChevronRight, Smartphone, CheckCircle2, Bell, Search, User } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Home() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [propsRes, testiRes] = await Promise.all([
        axios.get(`${API}/properties?featured=true`),
        axios.get(`${API}/testimonials`)
      ]);
      setFeaturedProperties(propsRes.data.slice(0, 3));
      setTestimonials(testiRes.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      icon: Wrench,
      title: 'In-House Renovations',
      description: 'Our expert renovation crew transforms properties to maximize value and appeal.',
      color: 'renovation',
      link: '/services/renovations'
    },
    {
      icon: HomeIcon,
      title: 'Full Maintenance',
      description: '24/7 maintenance team ensuring your property stays in perfect condition.',
      color: 'maintenance',
      link: '/services/maintenance'
    },
    {
      icon: TrendingUp,
      title: 'Rent Maximization',
      description: 'Strategic pricing and marketing to ensure you get the best return on your investment.',
      color: 'rent-max',
      link: '/services/rent-maximization'
    }
  ];

  const stats = [
    { value: '400+', label: 'Properties Managed' },
    { value: '98%', label: 'Tenant Satisfaction' },
    { value: '23%', label: 'Avg. Rent Increase' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      <SEO 
        title=""
        description="Full-service property management with in-house renovation crew, 24/7 maintenance, and rent maximization. 400+ properties managed. Average 23% rent increase. Call (506) 962-RENT(7368)."
        keywords="property management New Brunswick, property management Miramichi, rental properties Moncton, landlord services NB, property renovation, maintenance services"
      />
      {/* Hero Section */}
      <section className="hero-section relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Full-Service Property Management
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Maximize Your
                <span className="gradient-text"> Property's Potential</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                From renovations to tenant management, we handle everything. Our in-house teams ensure your property generates maximum returns while you enjoy peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/properties">
                  <Button className="btn-primary flex items-center gap-2" data-testid="hero-browse-properties">
                    Browse Properties
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button className="btn-secondary" data-testid="hero-contact-us">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
                {stats.map((stat, index) => (
                  <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="text-2xl font-bold text-indigo-600" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1617201929478-8eedff7508f9?w=800"
                  alt="Modern apartment interior"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Response Time</div>
                    <div className="font-bold text-gray-900">Under 2 Hours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 section-gray" data-testid="services-section">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Everything You Need, In-House
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our full-service approach means you get a dedicated team handling every aspect of property management.
            </p>
          </div>

          <div className="bento-grid">
            {services.map((service, index) => (
              <Link
                to={service.link}
                key={index}
                className={`service-card ${service.color} ${index === 0 ? 'large' : 'medium'} cursor-pointer block`}
                style={{ 
                  gridColumn: index === 0 ? 'span 8' : 'span 6',
                  animationDelay: `${index * 100}ms`,
                  textDecoration: 'none'
                }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/80 flex items-center justify-center mb-4 shadow-sm">
                  <service.icon className="w-7 h-7 text-gray-800" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-gray-700">{service.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="btn-secondary flex items-center gap-2 mx-auto" data-testid="view-all-services">
                View All Services
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24" data-testid="featured-properties-section">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Featured Properties
              </h2>
              <p className="text-gray-600">Discover our hand-picked selection of premium rentals</p>
            </div>
            <Link to="/properties">
              <Button variant="ghost" className="flex items-center gap-2 text-indigo-600">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="spinner" />
            </div>
          ) : (
            <div className="grid-properties">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 section-gray" data-testid="testimonials-section">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600">Join hundreds of satisfied property owners and tenants</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="testimonial-card animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button className="btn-secondary" data-testid="view-all-testimonials">
                Read More Reviews
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tenant App Promo Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 relative overflow-hidden" data-testid="tenant-app-section">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                Now Available
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Get the NB Rents Tenant App
              </h2>
              <p className="text-lg text-indigo-100 mb-8">
                Submit maintenance requests, track their status, and browse available rentals - all from your phone. Install our free app for instant access.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Submit & track maintenance requests instantly',
                  'Get push notifications on request updates',
                  'Browse available rental properties'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-indigo-100">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/tenant-app">
                <Button className="bg-white text-indigo-700 hover:bg-indigo-50 rounded-full px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all" data-testid="get-tenant-app">
                  Get the App
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <p className="text-sm text-indigo-200 mt-4">
                Works on iPhone, Android & Desktop. No app store needed!
              </p>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
              <div className="relative">
                {/* Phone frame */}
                <div className="w-72 bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  {/* Screen */}
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-gray-100 px-6 py-2 flex items-center justify-between text-xs text-gray-600">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-gray-400 rounded-sm" />
                      </div>
                    </div>
                    
                    {/* App header */}
                    <div className="bg-white px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">NB</span>
                        </div>
                        <span className="font-semibold text-gray-900">NB Rents</span>
                      </div>
                    </div>
                    
                    {/* App content preview */}
                    <div className="p-4 space-y-3" style={{ minHeight: '320px' }}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">My Requests</span>
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">2 active</span>
                      </div>
                      
                      {/* Request cards preview */}
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-start justify-between">
                          <span className="text-sm font-medium text-gray-900">Leaky faucet</span>
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Pending</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Kitchen sink</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-start justify-between">
                          <span className="text-sm font-medium text-gray-900">HVAC repair</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Completed</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Living room unit</p>
                      </div>

                      {/* Notification preview */}
                      <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs font-medium text-indigo-900">New Update!</span>
                        </div>
                        <p className="text-xs text-indigo-700 mt-1">Your request has been assigned to a technician.</p>
                      </div>
                    </div>
                    
                    {/* Bottom nav preview */}
                    <div className="bg-white border-t border-gray-200 px-6 py-3 flex justify-around">
                      <div className="flex flex-col items-center text-gray-400">
                        <Search className="w-5 h-5" />
                        <span className="text-xs mt-1">Search</span>
                      </div>
                      <div className="flex flex-col items-center text-indigo-600">
                        <Wrench className="w-5 h-5" />
                        <span className="text-xs mt-1">Requests</span>
                      </div>
                      <div className="flex flex-col items-center text-gray-400">
                        <User className="w-5 h-5" />
                        <span className="text-xs mt-1">Profile</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -right-4 top-20 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-float">
                  Free!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
        </div>
        
        <div className="container-main relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to Maximize Your Investment?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a property owner looking to increase returns or a tenant searching for your perfect home, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-accent flex items-center gap-2" data-testid="cta-contact">
                Get in Touch
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
