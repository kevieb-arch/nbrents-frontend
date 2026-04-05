import { useState } from 'react';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { CheckCircle2, ArrowRight, Phone, MapPin, Wrench, Building2, Paintbrush, Users, Clock, Shield, ChevronRight, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PropertyManagement() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', units: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast.error('Please fill in your name, phone, and email');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: `Landing Page - Property Review Request`,
        message: `Property Location: ${form.location || 'Not provided'}\nNumber of Units: ${form.units || 'Not provided'}\nPhone: ${form.phone}`
      });
      setSubmitted(true);
      toast.success('Request submitted! We\'ll be in touch soon.');
    } catch {
      toast.error('Something went wrong. Please call us at (506) 962-RENT(7368)');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Hands-Off Property Management in Northern NB | NB Rents"
        description="You buy the property. We handle everything else. Tenant placement, rent collection, maintenance, and full unit turns in Miramichi, Bathurst, Rogersville."
      />

      {/* SECTION 1 — HERO */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="container-main relative z-10 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Hands-Off Property Management in Northern New Brunswick
            </h1>
            <p className="text-xl sm:text-2xl text-indigo-300 font-medium mb-4">
              You buy the property. We handle everything else.
            </p>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
              We take care of tenants, rent collection, maintenance, and full unit turns — so your rental runs smoothly without taking over your life.
            </p>
            <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider font-medium">Own a rental property? Let's talk.</p>
            <a href="#property-review">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all" data-testid="hero-cta-btn">
                Get a Free Property Review
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHO THIS IS FOR */}
      <section className="py-20 bg-gray-50">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
              This is for property owners who:
            </h2>
            <div className="space-y-4">
              {[
                "Are tired of dealing with tenants and late-night messages",
                "Have recently purchased or renovated a property",
                "Want to scale their portfolio without more headaches",
                "Are done coordinating maintenance and chasing rent",
                "Want a more hands-off investment"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-lg font-semibold text-indigo-900">
                If that sounds like you — you're in the right place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT WE HANDLE */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We take over the day-to-day so you don't have to
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {[
                { icon: Users, text: "Tenant placement" },
                { icon: Building2, text: "Rent collection" },
                { icon: Wrench, text: "Maintenance coordination" },
                { icon: Paintbrush, text: "Full unit turns" },
                { icon: Shield, text: "Cleaning and preparation" },
                { icon: Clock, text: "Ongoing property oversight" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <p className="font-medium text-gray-800">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg text-gray-600 font-medium text-center">
              You stay focused on your investment — we handle the operations.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT MAKES NBRENTS DIFFERENT */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Most property managers outsource everything. We don't.
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              At NBRents, we have <strong className="text-white">in-house teams</strong> for:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Wrench, text: "Maintenance" },
                { icon: Building2, text: "Construction" },
                { icon: Paintbrush, text: "Cleaning" }
              ].map((item, i) => (
                <div key={i} className="text-center p-6 bg-gray-800 rounded-2xl border border-gray-700">
                  <div className="w-14 h-14 rounded-xl bg-indigo-600/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <p className="font-bold text-lg">{item.text}</p>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-300">That means:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Faster repairs",
                "Faster unit turns",
                "Less downtime",
                "Better control over quality"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <p className="text-gray-200">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-lg text-gray-300">
              Your property gets handled quickly and properly — <strong className="text-white">without delays or guesswork.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FOR INVESTORS */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Just bought or renovated a property?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              This is where most owners get stuck. <strong>We step in after acquisition or renovation</strong> and:
            </p>
            <div className="space-y-4">
              {[
                "Get units rent-ready",
                "Place tenants quickly",
                "Stabilize the property",
                "Handle ongoing operations"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-lg font-semibold text-indigo-900">
                So you can move on to your next deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — LOCAL EXPERTISE */}
      <section className="py-20 bg-gray-50">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
              We proudly serve
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {["Miramichi", "Bathurst", "Rogersville", "Northern NB"].map((city, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <MapPin className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">{city}</p>
                </div>
              ))}
            </div>
            <p className="text-lg text-gray-600">
              We're local, hands-on, and actively working in these communities every day.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SIMPLE PROCESS */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Getting started is easy
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Reach out", desc: "Tell us about your property" },
                { step: "2", title: "Quick review", desc: "We assess your situation and needs" },
                { step: "3", title: "We take over", desc: "You step back — we handle the rest" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — CTA FORM */}
      <section id="property-review" className="py-20 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-300 rounded-full filter blur-3xl" />
        </div>
        <div className="container-main relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready to make your rental property hands-off?
              </h2>
              <p className="text-lg text-indigo-100">
                Fill out the form below and we'll reach out to you.
              </p>
              <p className="text-indigo-200 text-sm mt-2 font-medium">
                Free Property Review — No Obligation
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl" data-testid="landing-form">
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="lp-name" className="text-gray-700 font-medium">Name *</Label>
                    <Input
                      id="lp-name"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      placeholder="Your full name"
                      className="mt-1"
                      required
                      data-testid="landing-name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lp-phone" className="text-gray-700 font-medium">Phone Number *</Label>
                      <Input
                        id="lp-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({...form, phone: e.target.value})}
                        placeholder="(506) 555-1234"
                        className="mt-1"
                        required
                        data-testid="landing-phone"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lp-email" className="text-gray-700 font-medium">Email *</Label>
                      <Input
                        id="lp-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        placeholder="you@email.com"
                        className="mt-1"
                        required
                        data-testid="landing-email"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lp-location" className="text-gray-700 font-medium">Property Location</Label>
                    <Input
                      id="lp-location"
                      value={form.location}
                      onChange={(e) => setForm({...form, location: e.target.value})}
                      placeholder="City or address"
                      className="mt-1"
                      data-testid="landing-location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lp-units" className="text-gray-700 font-medium">Number of Units</Label>
                    <Select onValueChange={(val) => setForm({...form, units: val})}>
                      <SelectTrigger className="mt-1" data-testid="landing-units">
                        <SelectValue placeholder="Select number of units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 unit</SelectItem>
                        <SelectItem value="2-4">2-4 units</SelectItem>
                        <SelectItem value="5-10">5-10 units</SelectItem>
                        <SelectItem value="10+">10+ units</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-semibold rounded-xl"
                    data-testid="landing-submit"
                  >
                    {submitting ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Request <ArrowRight className="w-5 h-5 ml-2" /></>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-2xl text-center" data-testid="landing-success">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-6">We've received your request and will be in touch shortly.</p>
                <p className="text-gray-500">
                  Can't wait? Call us at{' '}
                  <a href="tel:5069627368" className="text-indigo-600 font-semibold hover:underline">(506) 962-RENT(7368)</a>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 9 — STRONG CLOSE */}
      <section className="py-20 bg-gray-900">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              You didn't invest in real estate to manage problems.
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let NBRents handle the day-to-day — so your property performs the way it should.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#property-review">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-4 text-lg font-semibold" data-testid="close-cta-btn">
                  Get Your Free Property Review
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href="tel:5069627368">
                <Button variant="outline" className="rounded-full px-8 py-4 text-lg font-semibold border-gray-600 text-gray-300 hover:bg-gray-800" data-testid="close-call-btn">
                  <Phone className="w-5 h-5 mr-2" />
                  (506) 962-RENT(7368)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
