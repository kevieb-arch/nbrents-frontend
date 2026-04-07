import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle2, ArrowRight, Phone, Mail, Hammer, Fence, TreePine, Shield, Clock, Star, ChevronRight, Loader2, Ruler } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const IMAGES = {
  renovation: 'https://images.unsplash.com/flagged/photo-1600002590940-11bd73c4d3c5?w=800&q=80',
  deck: 'https://images.unsplash.com/photo-1768527341242-62055b63260b?w=800&q=80',
  fence: 'https://images.unsplash.com/photo-1748908271592-d9d5690b288b?w=800&q=80',
};

export default function RiverCity() {
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
        subject: `River City Construction - Free Quote Request`,
        message: `Service Interest: ${form.service || 'Not specified'}\nPhone: ${form.phone}\nMessage: ${form.message || 'No message provided'}`
      });
      setSubmitted(true);
      toast.success("Request submitted! We'll be in touch soon.");
    } catch {
      toast.error('Something went wrong. Please call us at 506-230-7938');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* HERO */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-12 pb-20 sm:pb-28">
          <div className="flex justify-center mb-10">
            <img src="/rivercity-logo.png" alt="NB River City Construction Ltd." className="h-32 sm:h-44 w-auto" data-testid="rivercity-logo" />
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Renovations, Decks & Fences Built to Last
            </h1>
            <p className="text-xl sm:text-2xl text-blue-300 font-medium mb-4">
              Quality craftsmanship you can count on.
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              NB River City Construction brings reliability, attention to detail, and outstanding customer service to every project — big or small.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#free-quote">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all" data-testid="hero-cta-btn">
                  Get a Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:5062307938">
                <Button variant="outline" className="rounded-full px-8 py-6 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-800" data-testid="hero-call-btn">
                  <Phone className="w-5 h-5 mr-2" />
                  506-230-7938
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
            What We Build
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            From complete interior renovations to beautiful outdoor living spaces — we do it all with precision and care.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Renovations',
                desc: 'Kitchens, bathrooms, basements, and full home remodels. We transform your space with expert craftsmanship.',
                img: IMAGES.renovation,
                icon: Hammer,
              },
              {
                title: 'Decks',
                desc: 'Custom-built decks designed for your lifestyle. Composite, pressure-treated, or cedar — built to last.',
                img: IMAGES.deck,
                icon: TreePine,
              },
              {
                title: 'Fences',
                desc: 'Privacy fences, picket fences, and custom designs. Sturdy, beautiful, and built for New Brunswick weather.',
                img: IMAGES.fence,
                icon: Fence,
              },
            ].map((service, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300" data-testid={`service-card-${i}`}>
                <div className="h-56 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-blue-700" />
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
            Why Choose River City?
          </h2>
          <p className="text-lg text-gray-300 mb-12 text-center max-w-2xl mx-auto">
            We don't just build structures — we build trust. Here's what sets us apart.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Ruler, title: 'Craftsmanship', desc: 'Precision in every cut, joint, and finish. We take pride in work that speaks for itself.' },
              { icon: Shield, title: 'Reliability', desc: 'We show up on time, communicate clearly, and deliver what we promise.' },
              { icon: Star, title: 'Quality', desc: 'Premium materials and proven techniques ensure your project stands the test of time.' },
              { icon: Clock, title: 'Customer Service', desc: 'From first call to final walkthrough, your satisfaction is our top priority.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-900 rounded-2xl border border-gray-800 hover:border-blue-700 transition-colors duration-300">
                <div className="w-14 h-14 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-blue-400" />
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
              { step: '1', title: 'Call or Message', desc: 'Tell us about your project and what you need' },
              { step: '2', title: 'Free Estimate', desc: 'We visit your property and provide a detailed quote' },
              { step: '3', title: 'We Build It', desc: 'Sit back while we bring your vision to life' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL HIGHLIGHT */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl text-gray-800 font-medium italic leading-relaxed mb-4">
            "River City did an incredible job on our kitchen reno. On time, on budget, and the quality is outstanding. Highly recommend!"
          </blockquote>
          <p className="text-gray-500 font-medium">— Satisfied Homeowner, Miramichi</p>
        </div>
      </section>

      {/* CTA FORM */}
      <section id="free-quote" className="py-20 bg-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-300 rounded-full filter blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-blue-100">
                Get a free, no-obligation estimate. We'll get back to you within 24 hours.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl" data-testid="rivercity-form">
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rc-name" className="text-gray-700 font-medium">Name *</Label>
                      <Input
                        id="rc-name"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                        placeholder="Your full name"
                        className="mt-1"
                        required
                        data-testid="rc-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rc-phone" className="text-gray-700 font-medium">Phone *</Label>
                      <Input
                        id="rc-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        placeholder="506-555-1234"
                        className="mt-1"
                        required
                        data-testid="rc-phone"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rc-email" className="text-gray-700 font-medium">Email</Label>
                      <Input
                        id="rc-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="you@email.com"
                        className="mt-1"
                        data-testid="rc-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rc-service" className="text-gray-700 font-medium">Service Needed</Label>
                      <Select onValueChange={(val) => setForm({...form, service: val})}>
                        <SelectTrigger className="mt-1" data-testid="rc-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Renovation">Renovation</SelectItem>
                          <SelectItem value="Deck">Deck</SelectItem>
                          <SelectItem value="Fence">Fence</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="rc-message" className="text-gray-700 font-medium">Tell Us About Your Project</Label>
                    <Textarea
                      id="rc-message"
                      value={form.message}
                      onChange={(e) => setForm({...form, message: e.target.value})}
                      placeholder="Describe what you're looking for..."
                      className="mt-1 min-h-[100px]"
                      data-testid="rc-message"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold rounded-xl"
                    data-testid="rc-submit"
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
              <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl text-center" data-testid="rc-success">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">We've received your request and will be in touch within 24 hours.</p>
                <p className="text-gray-500">
                  Can't wait? Call us at{' '}
                  <a href="tel:5062307938" className="text-blue-600 font-semibold hover:underline">506-230-7938</a>
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
              Your Home Deserves the Best.
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let NB River City Construction bring your vision to life — with the quality and care your project deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#free-quote">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-lg font-semibold" data-testid="close-cta-btn">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:5062307938">
                <Button variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-800" data-testid="close-call-btn">
                  <Phone className="w-5 h-5 mr-2" />
                  506-230-7938
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
              <img src="/rivercity-logo.png" alt="NB River City Construction" className="h-12 w-auto" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-gray-400 text-sm">
              <a href="tel:5062307938" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                506-230-7938
              </a>
              <a href="mailto:Info@NBRivercity.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                Info@NBRivercity.com
              </a>
            </div>
          </div>
          <p className="text-center text-gray-600 text-xs mt-8">
            &copy; {new Date().getFullYear()} NB River City Construction Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
