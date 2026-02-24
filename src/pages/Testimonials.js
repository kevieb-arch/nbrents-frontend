import { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import { SEO } from '../components/SEO';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { value: '400+', label: 'Happy Clients' },
    { value: '4.9', label: 'Average Rating' },
    { value: '98%', label: 'Would Recommend' },
    { value: '10+', label: 'Years of Service' }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="testimonials-page">
      <SEO 
        title="Client Testimonials"
        description="Read what property owners and tenants say about NB Rents. 400+ happy clients with a 4.9 average rating."
        keywords="NB Rents reviews, property management testimonials, New Brunswick property manager reviews"
      />
      {/* Hero */}
      <section className="py-24 section-gray">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What Our Clients
              <span className="gradient-text"> Say About Us</span>
            </h1>
            <p className="text-lg text-gray-600">
              Don't just take our word for it. Here's what property owners and tenants have to say about their experience with NB Rents.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24">
        <div className="container-main">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="spinner" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8" data-testid="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="testimonial-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && testimonials.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Star className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No testimonials yet</h3>
              <p className="text-gray-600">Check back soon for client reviews!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-indigo-600">
        <div className="container-main text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Ready to Join Our Happy Clients?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Experience the NB Rents difference for yourself. Whether you're a property owner or looking for your next home, we're here to help.
          </p>
          <a href="tel:5069627368">
            <button className="btn-accent" data-testid="testimonials-call-cta">
              Call (506) 962-RENT(7368)
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
