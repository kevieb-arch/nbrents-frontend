import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle2, ArrowRight, Phone, Mail, Sparkles, Building2, Home, Shield, Clock, Star, Loader2, ThumbsUp } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const IMAGES = {
  residential: 'https://images.unsplash.com/photo-1649083048269-8bfb755e7b87?w=800&q=80',
  commercial: 'https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?w=800&q=80',
  deep: 'https://images.unsplash.com/photo-1635108195612-1ba1c88aaf0c?w=800&q=80',
};

export default function RiverCityCleaners() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('Please fill in your name and phone number');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email || 'Not provided',
        phone: form.phone,
        subject: `River City Cleaners - Free Quote Request`,
        message: `Service Interest: ${form.service || 'Not specified'}\nPhone: ${form.phone}\nMessage: ${form.message || 'No message provided'}`
      });
      setSubmitted(true);
      toast.success("Request submitted! We'll be in touch soon.");
    } catch {
      toast.error('Something went wrong. Please call us at 506-962-7368');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-600 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-400 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-12 pb-20 sm:pb-28">
          <div className="flex justify-center mb-10">
            <img src="/cleaners-logo.png" alt="NB River City Cleaners" className="h-52 sm:h-64 w-auto rounded-2xl shadow-lg shadow-sky-500/20 ring-1 ring-white/10" data-testid="cleaners-logo" />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Spotless Spaces, Every Time
            </h1>
            <p className="text-xl sm:text-2xl text-sky-300 font-medium mb-4">
              Residential & Commercial Cleaning You Can Trust
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              NB River City Cleaners delivers professional, reliable cleaning services that leave your home or business looking its absolute best.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#free-quote">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all" data-testid="hero-cta-btn">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:5069627368">
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-800" data-testid="hero-call-btn">
                  <Phone className="w-5 h-5 mr-2" />
                  506-962-7368
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Our Cleaning Services
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Whether it's your home, office, or a one-time deep clean — we've got you covered.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Residential Cleaning',
                desc: 'Regular home cleaning, move-in/move-out cleans, and recurring weekly or bi-weekly service to keep your space fresh.',
                img: IMAGES.residential,
                icon: Home,
              },
              {
                title: 'Commercial Cleaning',
                desc: 'Office buildings, retail spaces, and common areas. Flexible scheduling that works around your business hours.',
                img: IMAGES.commercial,
                icon: Building2,
              },
              {
                title: 'Deep Cleaning',
                desc: 'Top-to-bottom scrubbing for kitchens, bathrooms, and high-traffic areas. Perfect for spring cleans or special occasions.',
                img: IMAGES.deep,
                icon: Sparkles,
              },
            ].map((service, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300" data-testid={`service-card-${i}`}>
                <div className="h-56 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-sky-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Why Choose River City Cleaners?
          </h2>
          <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            We don't cut corners — we clean them. Here's what sets us apart.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ThumbsUp, title: 'Professionalism', desc: 'Uniformed, trained, and background-checked staff who treat your space with respect.' },
              { icon: Shield, title: 'Reliability', desc: 'We show up on time, every time. Consistent service you can count on week after week.' },
              { icon: Star, title: 'Quality', desc: 'We use professional-grade products and proven methods for a spotless finish every visit.' },
              { icon: Clock, title: 'Customer Service', desc: 'Responsive, friendly, and always willing to go the extra mile to make you happy.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-sky-700 transition-colors duration-300">
                <div className="w-14 h-14 rounded-xl bg-sky-600/20 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Getting Started Is Simple
          </h2>
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { step: '1', title: 'Reach Out', desc: 'Call, email, or fill out the form below' },
              { step: '2', title: 'Free Estimate', desc: 'We assess your space and provide a clear quote' },
              { step: '3', title: 'We Clean', desc: 'Sit back and enjoy a spotless space' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-sky-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl text-gray-800 font-medium italic leading-relaxed mb-4">
            "River City Cleaners transformed our office. The team is professional, thorough, and always on time. We couldn't be happier with the service!"
          </blockquote>
          <p className="text-gray-500 font-medium">— Local Business Owner, Miramichi</p>
        </div>
      </section>

      {/* CTA FORM */}
      <section id="free-quote" className="py-20 bg-sky-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-sky-300 rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready for a Spotless Space?
              </h2>
              <p className="text-lg text-sky-100">
                Get a free, no-obligation quote. We'll get back to you within 24 hours.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl" data-testid="cleaners-form">
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cl-name" className="text-gray-700 font-medium">Name *</Label>
                      <Input
                        id="cl-name"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="Your full name"
                        className="mt-1"
                        required
                        data-testid="cl-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cl-phone" className="text-gray-700 font-medium">Phone *</Label>
                      <Input
                        id="cl-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        placeholder="506-555-1234"
                        className="mt-1"
                        required
                        data-testid="cl-phone"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cl-email" className="text-gray-700 font-medium">Email</Label>
                      <Input
                        id="cl-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="you@email.com"
                        className="mt-1"
                        data-testid="cl-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cl-service" className="text-gray-700 font-medium">Service Needed</Label>
                      <Select onValueChange={(val) => setForm({...form, service: val})}>
                        <SelectTrigger className="mt-1" data-testid="cl-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Residential Cleaning">Residential Cleaning</SelectItem>
                          <SelectItem value="Commercial Cleaning">Commercial Cleaning</SelectItem>
                          <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                          <SelectItem value="Move-In/Move-Out">Move-In / Move-Out</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cl-message" className="text-gray-700 font-medium">Tell Us About Your Space</Label>
                    <Textarea
                      id="cl-message"
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      placeholder="Size of space, frequency needed, any special requests..."
                      className="mt-1 min-h-[100px]"
                      data-testid="cl-message"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white py-6 text-lg font-semibold rounded-xl"
                    data-testid="cl-submit"
                  >
                    {submitting ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                    ) : (
                      <>Request Free Quote <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl text-center" data-testid="cl-success">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">We've received your request and will be in touch within 24 hours.</p>
                <p className="text-gray-500">
                  Can't wait? Call us at{' '}
                  <a href="tel:5069627368" className="text-sky-600 font-semibold hover:underline">506-962-7368</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STRONG CLOSE */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Life's Too Short to Spend It Cleaning.
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let NB River City Cleaners handle the mess — so you can enjoy the space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#free-quote">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-full px-8 py-4 text-lg font-semibold" data-testid="close-cta-btn">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:5069627368">
                <Button variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-800" data-testid="close-call-btn">
                  <Phone className="w-5 h-5 mr-2" />
                  506-962-7368
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 border-t border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/cleaners-logo.png" alt="NB River City Cleaners" className="h-12 w-auto rounded-lg" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-gray-400 text-sm">
              <a href="tel:5069627368" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                506-962-7368
              </a>
              <a href="mailto:Info@NBRivercity.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                Info@NBRivercity.com
              </a>
            </div>
          </div>
          <p className="text-center text-gray-600 text-xs mt-8">
            &copy; {new Date().getFullYear()} NB River City Cleaners. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
