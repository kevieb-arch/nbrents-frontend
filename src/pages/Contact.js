import { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { SEO } from '../components/SEO';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '(506) 962-RENT(7368)',
      link: 'tel:5069627368'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@NBRents.ca',
      link: 'mailto:hello@NBRents.ca'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '72 Elizabeth St. Unit 85, Miramichi, NB E1V 1W1',
      link: 'https://maps.google.com/?q=72+Elizabeth+St+Miramichi+NB+E1V+1W1'
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Mon-Fri: 9am-6pm',
      link: null
    }
  ];

  return (
    <div className="min-h-screen pt-20" data-testid="contact-page">
      <SEO 
        title="Contact Us - NB Rents Property Management"
        description="Contact NB Rents for property management services in New Brunswick. Located at 72 Elizabeth St, Miramichi. Call (506) 962-RENT(7368) or email hello@NBRents.ca."
        keywords="contact NB Rents, property management Miramichi, property manager New Brunswick, rental inquiry"
      />
      {/* Hero */}
      <section className="py-24 section-gray">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Get in
              <span className="gradient-text"> Touch</span>
            </h1>
            <p className="text-lg text-gray-600">
              Ready to maximize your property's potential? Have questions about our services? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Contact Information
              </h2>
              
              {contactInfo.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{item.title}</div>
                    {item.link ? (
                      <a href={item.link} className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-medium text-gray-900">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Map Placeholder */}
              <div className="mt-8 rounded-2xl overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-indigo-400" />
                  <p className="font-medium text-gray-700">72 Elizabeth St. Unit 85</p>
                  <p className="text-gray-500">Miramichi, NB E1V 1W1</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 lg:p-12 border border-gray-100 shadow-sm">
                {submitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Message Sent!
                    </h3>
                    <p className="text-gray-600 mb-8">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      }}
                      className="btn-secondary"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Send Us a Message
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                            data-testid="contact-name-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                            data-testid="contact-email-input"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="(506) 555-1234"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input"
                            data-testid="contact-phone-input"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            placeholder="How can we help?"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="form-input"
                            data-testid="contact-subject-input"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your property or inquiry..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="form-input resize-none"
                          data-testid="contact-message-input"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="btn-accent w-full sm:w-auto flex items-center justify-center gap-2"
                        disabled={loading}
                        data-testid="contact-submit-button"
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
