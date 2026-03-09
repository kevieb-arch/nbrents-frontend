import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { SEO } from '../components/SEO';
import { Users, Target, Heart, Award, ArrowRight, CheckCircle } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on maximizing your property\'s potential and delivering measurable outcomes.'
    },
    {
      icon: Heart,
      title: 'People First',
      description: 'Happy tenants make happy owners. We prioritize relationships and communication.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'From renovations to maintenance, we deliver professional quality in everything we do.'
    },
    {
      icon: Users,
      title: 'Team Approach',
      description: 'Our in-house crews work together seamlessly to handle any property challenge.'
    }
  ];

  const features = [
    'Full in-house renovation crew',
    '24/7 maintenance team',
    'Dedicated property managers',
    'Advanced tenant screening',
    'Real-time financial reporting',
    'Strategic rent optimization'
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="about-page">
      <SEO 
        title="About Us - NB Rents Property Management"
        description="Learn about NB Rents - New Brunswick's full-service property management company with in-house renovation crew and 24/7 maintenance team. 400+ properties managed with 23% average rent increase."
        keywords="about NB Rents, property management company New Brunswick, in-house renovation, maintenance team Miramichi"
      />
      {/* Hero Section */}
      <section className="py-24 lg:py-32">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Full-Service Property Management, 
                <span className="gradient-text"> Done Right</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                NB Rents was founded with a simple mission: provide property owners with a truly hands-off investment experience while creating quality homes for tenants. Unlike other management companies, we keep everything in-house.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
                  alt="Team working together"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-indigo-600 text-white rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>10+</div>
                <div className="text-indigo-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 section-gray" data-testid="story-section">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Story
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Started in New Brunswick by property investors who were frustrated with traditional management companies, NB Rents was built to be different. We saw landlords losing money to third-party contractors, slow response times, and poor tenant relations.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our solution? Build a company with every service under one roof. Our renovation crew can transform a dated unit into a modern showpiece. Our maintenance team responds in hours, not days. And our management team treats every property like their own.
            </p>
            <p className="text-lg text-gray-600">
              Today, we manage over 400 properties across New Brunswick, and our owners see an average of 23% increase in rental income within the first year. That's the NB Rents difference.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" data-testid="values-section">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our Values
            </h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 section-gray" data-testid="team-section">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Our In-House Teams
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlike other management companies, we don't outsource. Every team member is part of the NB Rents family.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1626081063434-79a2169791b1?w=400"
                  alt="Renovation Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Renovation Crew
                </h3>
                <p className="text-gray-600">
                  Skilled tradespeople who transform properties into modern, high-value rentals.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1584265549731-fc0d5434ff76?w=400"
                  alt="Maintenance Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Maintenance Team
                </h3>
                <p className="text-gray-600">
                  24/7 response team handling everything from emergencies to routine upkeep.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400"
                  alt="Management Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Management Team
                </h3>
                <p className="text-gray-600">
                  Dedicated property managers who maximize returns and maintain tenant relations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-indigo-600" data-testid="about-cta">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let us show you how our full-service approach can maximize your property's potential.
          </p>
          <Link to="/contact">
            <Button className="btn-accent flex items-center gap-2 mx-auto" data-testid="about-contact-cta">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
