import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Sync mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
    setResetEmailSent(false);
    setForgotEmail('');
  }, [initialMode, isOpen]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    userType: 'tenant'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let userData;
      if (mode === 'login') {
        userData = await login(formData.email, formData.password);
        toast.success('Welcome back!');
      } else {
        userData = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.userType,
          formData.phone || null
        );
        toast.success('Account created successfully!');
      }
      onClose();
      
      // Navigate to appropriate portal after successful auth
      if (userData?.user_type === 'service') {
        navigate('/service-portal');
      } else if (userData?.user_type === 'admin' || userData?.user_type === 'owner') {
        navigate('/owner-portal');
      } else if (userData?.user_type === 'tenant') {
        navigate('/tenant-portal');
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      await axios.post(`${API}/auth/forgot-password`, { email: forgotEmail });
      setResetEmailSent(true);
      toast.success('If an account exists with this email, you will receive a password reset link.');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      userType: 'tenant'
    });
    setForgotEmail('');
    setResetEmailSent(false);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetForm();
  };

  // Forgot Password View
  if (mode === 'forgot') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]" data-testid="forgot-password-modal">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Reset Password
            </DialogTitle>
          </DialogHeader>

          {resetEmailSent ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 mb-6">
                If an account exists for {forgotEmail}, we've sent instructions to reset your password.
              </p>
              <Button
                onClick={() => switchMode('login')}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-sm text-center mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="john@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="form-input"
                    data-testid="forgot-email-input"
                  />
                </div>

                <Button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                  data-testid="forgot-submit-button"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => switchMode('login')}
                  className="text-sm text-indigo-600 font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                  data-testid="back-to-login"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Sign In
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" data-testid="auth-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {mode === 'login' ? 'Welcome Back' : 'Join NB Rents'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === 'register' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  data-testid="register-name-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="(506) 555-1234"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  data-testid="register-phone-input"
                />
              </div>

              <div className="space-y-3">
                <Label>I am a...</Label>
                <RadioGroup
                  value={formData.userType}
                  onValueChange={(value) => setFormData({ ...formData, userType: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tenant" id="tenant" data-testid="user-type-tenant" />
                    <Label htmlFor="tenant" className="cursor-pointer">Tenant</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="owner" id="owner" data-testid="user-type-owner" />
                    <Label htmlFor="owner" className="cursor-pointer">Property Owner</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              data-testid="auth-email-input"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-xs text-indigo-600 hover:underline"
                  data-testid="forgot-password-link"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="form-input pr-10"
                data-testid="auth-password-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
            data-testid="auth-submit-button"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => switchMode('register')}
                className="text-indigo-600 font-medium hover:underline"
                data-testid="switch-to-register"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => switchMode('login')}
                className="text-indigo-600 font-medium hover:underline"
                data-testid="switch-to-login"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
