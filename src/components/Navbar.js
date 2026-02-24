import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, Home, Building, Wrench, MessageSquare, Phone, User, LogOut, LayoutDashboard, ClipboardList } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Navbar = ({ onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Building },
    { name: 'Services', path: '/services', icon: Wrench },
    { name: 'Tenants', path: '/tenant-portal', icon: User },
    { name: 'Properties', path: '/properties', icon: Building },
    { name: 'Testimonials', path: '/testimonials', icon: MessageSquare },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (user?.user_type === 'service') return '/service-portal';
    if (user?.user_type === 'owner' || user?.user_type === 'admin') return '/owner-portal';
    return '/tenant-portal';
  };

  const isServiceUser = user?.user_type === 'service' || user?.user_type === 'admin';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100/50" data-testid="navbar">
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">NB</span>
            </div>
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              NB Rents
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                data-testid={`nav-${link.name.toLowerCase()}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth / User Section */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2" data-testid="user-menu-trigger">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-indigo-600" />
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate(getDashboardPath())} data-testid="dashboard-link">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  {isServiceUser && (
                    <DropdownMenuItem onClick={() => navigate('/service-portal')} data-testid="service-portal-link">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Service Portal
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} data-testid="logout-button">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => onOpenAuth('login')}
                  data-testid="login-button"
                >
                  Sign In
                </Button>
                <Button 
                  className="btn-primary"
                  onClick={() => onOpenAuth('register')}
                  data-testid="register-button"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`} data-testid="mobile-menu">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="text-xl font-bold">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                  isActive(link.path) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-nav-${link.name.toLowerCase()}`}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-gray-100 my-4 pt-4">
              {user ? (
                <>
                  <Link
                    to={getDashboardPath()}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  {isServiceUser && (
                    <Link
                      to="/service-portal"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ClipboardList className="w-5 h-5" />
                      Service Portal
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 w-full text-left text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onOpenAuth('login');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 w-full text-left"
                  >
                    <User className="w-5 h-5" />
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth('register');
                      setMobileMenuOpen(false);
                    }}
                    className="btn-primary w-full mt-2"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 lg:hidden z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};
