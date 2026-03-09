import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" data-testid="footer">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center">
                <span className="text-white font-bold text-lg">NB</span>
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                NB Rents
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Full-service property management maximizing returns for owners and creating happy homes for tenants.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors" data-testid="social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors" data-testid="social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 transition-colors" data-testid="social-linkedin">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/tenant-portal" className="footer-link">Tenants</Link></li>
              <li><Link to="/properties" className="footer-link">Properties</Link></li>
              <li><Link to="/testimonials" className="footer-link">Testimonials</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Our Services</h4>
            <ul className="space-y-3">
              <li><span className="footer-link cursor-default">Property Management</span></li>
              <li><span className="footer-link cursor-default">In-House Renovations</span></li>
              <li><span className="footer-link cursor-default">Maintenance Services</span></li>
              <li><span className="footer-link cursor-default">Rent Maximization</span></li>
              <li><span className="footer-link cursor-default">Tenant Screening</span></li>
              <li><span className="footer-link cursor-default">Financial Reporting</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-gray-300">(506) 962-RENT(7368)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-gray-300">hello@NBRents.ca</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-gray-300">
                  <p>72 Elizabeth St. Unit 85</p>
                  <p>Miramichi, NB E1V 1W1</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} NB Rents. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
