import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { toast } from 'sonner';
import axios from 'axios';
import { SEO } from '../components/SEO';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Loader2,
  ClipboardList,
  Home,
  User,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft
} from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function TenantPortal() {
  const { user, token, loading: authLoading, login, register } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [properties, setProperties] = useState([]);
  
  // Auth form states
  const [authMode, setAuthMode] = useState('login');
  const [authLoading2, setAuthLoading2] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [newRequest, setNewRequest] = useState({
    property_id: '',
    property_address: '',
    title: '',
    description: '',
    priority: 'normal',
    category: 'other',
    tenant_name: '',
    tenant_phone: '',
    tenant_email: ''
  });

  useEffect(() => {
    if (authLoading) return;
    
    // Allow both tenants and admins to access the portal
    if (user && (user.user_type === 'tenant' || user.user_type === 'admin')) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthLoading2(true);
    
    try {
      if (authMode === 'login') {
        await login(authForm.email, authForm.password);
        toast.success('Welcome back!');
      } else {
        await register(authForm.name, authForm.email, authForm.password, 'tenant', authForm.phone || null);
        toast.success('Account created successfully!');
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Something went wrong');
    } finally {
      setAuthLoading2(false);
    }
  };

  const fetchData = async () => {
    try {
      const [dashboardRes, propsRes] = await Promise.all([
        axios.get(`${API}/tenant/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/properties?status=available`)
      ]);
      setDashboard(dashboardRes.data);
      setProperties(propsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    
    if (!newRequest.property_address.trim()) {
      toast.error('Please enter your property address');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/maintenance-requests`, {
        ...newRequest,
        property_id: newRequest.property_id || 'tenant-submitted'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Maintenance request submitted! We will contact you soon.');
      setShowNewRequest(false);
      setNewRequest({
        property_id: '',
        property_address: '',
        title: '',
        description: '',
        priority: 'normal',
        category: 'other',
        tenant_name: '',
        tenant_phone: '',
        tenant_email: ''
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  // Show login/register form if not authenticated as tenant or admin
  if (!user || (user.user_type !== 'tenant' && user.user_type !== 'admin')) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50" data-testid="tenant-portal-login">
        <div className="container-main py-16">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Tenant Portal
              </h1>
              <p className="text-gray-600">
                Sign in to submit maintenance requests and track their status
              </p>
            </div>

            {/* Forgot Password Form */}
            {authMode === 'forgot' ? (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Reset Password
                </h2>
                
                {resetEmailSent ? (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
                    <p className="text-gray-600 mb-6">
                      If an account exists for {forgotEmail}, we've sent instructions to reset your password.
                    </p>
                    <Button
                      onClick={() => {
                        setAuthMode('login');
                        setResetEmailSent(false);
                        setForgotEmail('');
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Sign In
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 text-sm mb-4">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      if (!forgotEmail) {
                        toast.error('Please enter your email address');
                        return;
                      }
                      setAuthLoading2(true);
                      try {
                        await axios.post(`${API}/auth/forgot-password`, { email: forgotEmail });
                        setResetEmailSent(true);
                        toast.success('If an account exists with this email, you will receive a password reset link.');
                      } catch (error) {
                        toast.error('Something went wrong. Please try again.');
                      } finally {
                        setAuthLoading2(false);
                      }
                    }} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="forgot-email">Email</Label>
                        <Input
                          id="forgot-email"
                          type="email"
                          placeholder="john@example.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          required
                          data-testid="tenant-forgot-email-input"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="btn-primary w-full"
                        disabled={authLoading2}
                      >
                        {authLoading2 ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Send Reset Link
                      </Button>
                    </form>
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => {
                          setAuthMode('login');
                          setForgotEmail('');
                        }}
                        className="text-sm text-indigo-600 font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
            /* Auth Form */
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    authMode === 'login' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    authMode === 'register' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                        required
                        data-testid="tenant-name-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input
                        id="phone"
                        placeholder="(506) 555-1234"
                        value={authForm.phone}
                        onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                        data-testid="tenant-phone-input"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    required
                    data-testid="tenant-email-input"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-xs text-indigo-600 hover:underline"
                        data-testid="tenant-forgot-password-link"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                      required
                      minLength={6}
                      className="pr-10"
                      data-testid="tenant-password-input"
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
                  disabled={authLoading2}
                  data-testid="tenant-auth-submit"
                >
                  {authLoading2 ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>
            </div>
            )}
            {/* Emergency Contact */}
            <div className="mt-8 bg-red-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Emergency?</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    For urgent issues like flooding, no heat, or gas leaks, call us immediately.
                  </p>
                  <a href="tel:5069627368" className="text-red-600 font-bold hover:underline">
                    (506) 962-RENT(7368)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboard?.maintenance_requests || { total: 0, pending: 0, in_progress: 0, completed: 0 };
  const recentRequests = dashboard?.recent_requests || [];

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.total,
      icon: ClipboardList,
      color: 'neutral'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: stats.pending > 0 ? 'warning' : 'neutral'
    },
    {
      title: 'In Progress',
      value: stats.in_progress,
      icon: Wrench,
      color: 'neutral'
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'positive'
    }
  ];

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    normal: 'bg-blue-100 text-blue-700',
    high: 'bg-amber-100 text-amber-700',
    urgent: 'bg-red-100 text-red-700'
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50" data-testid="tenant-portal">
      <SEO title="Tenant Portal" />
      <div className="container-main py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Tenant Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {user?.name}</p>
          </div>
          <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
            <DialogTrigger asChild>
              <Button className="btn-primary flex items-center gap-2" data-testid="new-maintenance-request">
                <Plus className="w-5 h-5" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Maintenance Request</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitRequest} className="space-y-4 mt-4">
                {/* Tenant Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">Your Contact Information</h4>
                  <div className="space-y-2">
                    <Label>Your Name *</Label>
                    <Input
                      placeholder="e.g., John Smith"
                      value={newRequest.tenant_name}
                      onChange={(e) => setNewRequest({ ...newRequest, tenant_name: e.target.value })}
                      required
                      data-testid="tenant-name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Phone Number *</Label>
                      <Input
                        placeholder="(506) 555-1234"
                        value={newRequest.tenant_phone}
                        onChange={(e) => setNewRequest({ ...newRequest, tenant_phone: e.target.value })}
                        required
                        data-testid="tenant-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address *</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={newRequest.tenant_email}
                        onChange={(e) => setNewRequest({ ...newRequest, tenant_email: e.target.value })}
                        required
                        data-testid="tenant-email"
                      />
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="space-y-2">
                  <Label>Your Property Address *</Label>
                  <Input
                    placeholder="e.g., 123 Main St, Apt 4B, Miramichi"
                    value={newRequest.property_address}
                    onChange={(e) => setNewRequest({ ...newRequest, property_address: e.target.value })}
                    required
                    data-testid="property-address"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issue Title *</Label>
                  <Input
                    placeholder="e.g., Leaky faucet in kitchen"
                    value={newRequest.title}
                    onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                    required
                    data-testid="request-title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newRequest.category}
                      onValueChange={(value) => setNewRequest({ ...newRequest, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="appliance">Appliance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newRequest.priority}
                      onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Please describe the issue in detail..."
                    value={newRequest.description}
                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    required
                    rows={4}
                    data-testid="request-description"
                  />
                </div>
                <Button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Submit Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Maintenance Requests */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Recent Maintenance Requests
          </h2>
          
          {recentRequests.length === 0 ? (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No maintenance requests</h3>
              <p className="text-gray-500 mb-6">Need something fixed? Submit a maintenance request.</p>
              <Button 
                onClick={() => setShowNewRequest(true)}
                className="btn-secondary"
              >
                Submit Request
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div 
                  key={request.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                  data-testid={`maintenance-request-${request.id}`}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{request.title}</h3>
                      <span className={`badge ${priorityColors[request.priority]}`}>
                        {request.priority}
                      </span>
                    </div>
                    {request.property_address && (
                      <p className="text-sm text-indigo-600 mb-1">{request.property_address}</p>
                    )}
                    <p className="text-sm text-gray-500 mb-2">{request.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="capitalize">{request.category}</span>
                      <span>•</span>
                      <span>{new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`badge badge-${request.status.replace('_', '-')}`}>
                    {request.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Help */}
        <div className="mt-8 bg-indigo-50 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Need Emergency Help?</h3>
              <p className="text-gray-600 text-sm mb-3">
                For urgent maintenance issues like flooding, no heat, or gas leaks, call us immediately.
              </p>
              <a href="tel:5069627368" className="text-indigo-600 font-medium hover:underline">
                (506) 962-RENT(7368)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
