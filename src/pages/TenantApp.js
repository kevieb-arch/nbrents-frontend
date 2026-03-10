import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { SEO } from '../components/SEO';
import { 
  Wrench, 
  Search, 
  Home,
  Plus,
  Camera,
  MapPin,
  Bed,
  Bath,
  Square,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  User,
  LogOut,
  Bell,
  X,
  Filter,
  Loader2,
  Download,
  Phone,
  Mail,
  Share,
  Smartphone
} from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Platform detection helpers
function getDevicePlatform() {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  if (/android/i.test(ua)) return 'android';
  return 'desktop';
}

function isAppInstalled() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

// Bottom Navigation Component
function BottomNav({ activeTab, setActiveTab, hasNewNotifications }) {
  const tabs = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'requests', label: 'Requests', icon: Wrench },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full relative ${
                isActive ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'stroke-2' : ''}`} />
              <span className="text-xs mt-1">{tab.label}</span>
              {tab.id === 'requests' && hasNewNotifications && (
                <span className="absolute top-2 right-1/4 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// Property Card Component for Search
function PropertyCard({ property, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden active:scale-98 transition-transform cursor-pointer"
    >
      <div className="relative">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'}
          alt={property.title}
          className="w-full h-40 object-cover"
        />
        <Badge 
          className={`absolute top-2 right-2 ${
            property.status === 'available' ? 'bg-green-500' : 'bg-gray-500'
          }`}
        >
          {property.status}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin className="w-3 h-3 mr-1" />
          <span className="truncate">{property.city}</span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-gray-600 text-sm">
          <span className="flex items-center"><Bed className="w-3 h-3 mr-1" />{property.bedrooms}</span>
          <span className="flex items-center"><Bath className="w-3 h-3 mr-1" />{property.bathrooms}</span>
          <span className="flex items-center"><Square className="w-3 h-3 mr-1" />{property.sqft}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-indigo-600">${property.price?.toLocaleString()}<span className="text-sm font-normal text-gray-500">/mo</span></span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// Request Card Component
function RequestCard({ request, onClick }) {
  const statusColors = {
    open: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800',
    closed: 'bg-green-100 text-green-800'
  };
  
  const statusIcons = {
    open: AlertCircle,
    pending: Clock,
    closed: CheckCircle
  };
  
  const StatusIcon = statusIcons[request.status] || AlertCircle;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 active:scale-98 transition-transform cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{request.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{request.description}</p>
        </div>
        <Badge className={statusColors[request.status]}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {request.status}
        </Badge>
      </div>
      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <span>{request.category}</span>
        <span>{new Date(request.created_at).toLocaleDateString()}</span>
      </div>
      {request.updates?.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Last update: {request.updates[request.updates.length - 1]?.note?.substring(0, 50)}...
          </p>
        </div>
      )}
    </div>
  );
}

// Search Tab Content
function SearchTab({ onPropertyClick }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('status', 'available');
      if (filters.city) params.append('city', filters.city);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
      if (filters.minPrice) params.append('min_price', filters.minPrice);
      if (filters.maxPrice) params.append('max_price', filters.maxPrice);
      
      const response = await axios.get(`${API}/properties?${params.toString()}`);
      setProperties(response.data.filter(p => p.status === 'available'));
    } catch (error) {
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setShowFilters(false);
    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({ city: '', minPrice: '', maxPrice: '', bedrooms: '' });
    setShowFilters(false);
    setTimeout(fetchProperties, 100);
  };

  return (
    <div className="pb-20">
      {/* Search Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search by city..."
              className="pl-9"
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
              onKeyDown={(e) => e.key === 'Enter' && fetchProperties()}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(true)}
            className="relative"
          >
            <Filter className="w-4 h-4" />
            {(filters.bedrooms || filters.minPrice || filters.maxPrice) && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-600 rounded-full" />
            )}
          </Button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <Home className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No available properties found</p>
            <Button variant="link" onClick={clearFilters}>Clear filters</Button>
          </div>
        ) : (
          properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              onClick={() => onPropertyClick(property)}
            />
          ))
        )}
      </div>

      {/* Filters Modal */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Filter Properties</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label>Bedrooms</Label>
              <Select value={filters.bedrooms} onValueChange={(v) => setFilters({...filters, bedrooms: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Min Price</Label>
                <Input 
                  type="number" 
                  placeholder="$0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <Label>Max Price</Label>
                <Input 
                  type="number" 
                  placeholder="No max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters} className="flex-1">Clear</Button>
            <Button onClick={applyFilters} className="flex-1">Apply</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Requests Tab Content
function RequestsTab({ user, onNewRequest }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('nb_token');
      const response = await axios.get(`${API}/maintenance-requests`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests(response.data);
    } catch (error) {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <Wrench className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in Required</h2>
        <p className="text-gray-500 text-center mb-6">Please sign in to view and submit maintenance requests</p>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-lg font-semibold">My Requests</h1>
        <Button size="sm" onClick={onNewRequest}>
          <Plus className="w-4 h-4 mr-1" />
          New
        </Button>
      </div>

      {/* Requests List */}
      <div className="p-4 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No maintenance requests yet</p>
            <Button variant="link" onClick={onNewRequest}>Submit your first request</Button>
          </div>
        ) : (
          requests.map((request) => (
            <RequestCard 
              key={request.id} 
              request={request} 
              onClick={() => setSelectedRequest(request)}
            />
          ))
        )}
      </div>

      {/* Request Detail Modal */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-sm mx-4 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRequest?.title}</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4 py-2">
              <div>
                <Label className="text-gray-500">Status</Label>
                <Badge className={`mt-1 ${
                  selectedRequest.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                  selectedRequest.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedRequest.status}
                </Badge>
              </div>
              <div>
                <Label className="text-gray-500">Category</Label>
                <p>{selectedRequest.category}</p>
              </div>
              <div>
                <Label className="text-gray-500">Description</Label>
                <p className="text-sm">{selectedRequest.description}</p>
              </div>
              <div>
                <Label className="text-gray-500">Property</Label>
                <p className="text-sm">{selectedRequest.property_address}</p>
              </div>
              {selectedRequest.images?.length > 0 && (
                <div>
                  <Label className="text-gray-500">Photos</Label>
                  <div className="flex gap-2 mt-1 overflow-x-auto">
                    {selectedRequest.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-20 h-20 object-cover rounded" />
                    ))}
                  </div>
                </div>
              )}
              {selectedRequest.updates?.length > 0 && (
                <div>
                  <Label className="text-gray-500">Updates</Label>
                  <div className="space-y-2 mt-1">
                    {selectedRequest.updates.map((update, i) => (
                      <div key={i} className="bg-gray-50 p-2 rounded text-sm">
                        <p>{update.note}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(update.timestamp).toLocaleString()} - {update.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Profile Tab Content
function ProfileTab({ user, onLogin, onLogout }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showInstallInstructions, setShowInstallInstructions] = useState(false);
  const [smsOptOut, setSmsOptOut] = useState(user?.sms_opt_out || false);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushOptOut, setPushOptOut] = useState(user?.push_opt_out || false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [pushSupported, setPushSupported] = useState(false);
  const [platform] = useState(getDevicePlatform());
  const [installed] = useState(isAppInstalled());

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    
    // Check if push notifications are supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setPushSupported(true);
      checkPushSubscription();
    }
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    if (user) {
      setSmsOptOut(user.sms_opt_out || false);
      setPushOptOut(user.push_opt_out || false);
    }
  }, [user]);

  const checkPushSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setPushEnabled(!!subscription);
    } catch (e) {
      console.error('Failed to check push subscription:', e);
    }
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        toast.success('App installed successfully!');
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      setShowInstallInstructions(true);
    }
  };

  const handleSmsOptOutChange = async (checked) => {
    setSavingPrefs(true);
    try {
      const token = localStorage.getItem('nb_token');
      await axios.put(`${API}/auth/preferences`, {
        sms_opt_out: checked
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSmsOptOut(checked);
      toast.success(checked ? 'SMS notifications disabled' : 'SMS notifications enabled');
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setSavingPrefs(false);
    }
  };

  const handlePushToggle = async (enable) => {
    setSavingPrefs(true);
    try {
      if (enable) {
        // Request permission and subscribe
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          toast.error('Notification permission denied');
          setSavingPrefs(false);
          return;
        }

        // Get VAPID key from server
        const { data: { publicKey } } = await axios.get(`${API}/push/vapid-key`);
        
        // Convert VAPID key
        const urlBase64ToUint8Array = (base64String) => {
          const padding = '='.repeat((4 - base64String.length % 4) % 4);
          const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
          const rawData = window.atob(base64);
          return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
        };

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey)
        });

        // Send subscription to server
        const token = localStorage.getItem('nb_token');
        await axios.post(`${API}/push/subscribe`, {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))),
            auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth'))))
          }
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setPushEnabled(true);
        toast.success('Push notifications enabled');
      } else {
        // Unsubscribe
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          const token = localStorage.getItem('nb_token');
          await axios.delete(`${API}/push/unsubscribe?endpoint=${encodeURIComponent(subscription.endpoint)}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
        setPushEnabled(false);
        toast.success('Push notifications disabled');
      }
    } catch (error) {
      console.error('Push toggle error:', error);
      toast.error('Failed to update push notifications');
    } finally {
      setSavingPrefs(false);
    }
  };

  return (
    <div className="pb-20 p-4">
      {/* App Install Banner - always show when not installed */}
      {!installed && (
        <div className="bg-indigo-50 rounded-xl p-4 mb-4 flex items-center justify-between" data-testid="profile-install-banner">
          <div>
            <h3 className="font-semibold text-indigo-900">Install NB Rents App</h3>
            <p className="text-sm text-indigo-700">
              {platform === 'ios' ? 'Add to your home screen for quick access' : 'Install for quick access to maintenance requests'}
            </p>
          </div>
          <Button size="sm" onClick={handleInstall} data-testid="profile-install-btn">
            <Download className="w-4 h-4 mr-1" />
            Install
          </Button>
        </div>
      )}

      {/* Install Instructions Dialog */}
      <Dialog open={showInstallInstructions} onOpenChange={setShowInstallInstructions}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-600" />
              How to Install
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {platform === 'ios' ? (
              <>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-sm">Tap the <strong>Share</strong> button at the bottom of Safari</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-sm">Scroll down and tap <strong>"Add to Home Screen"</strong></p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-sm">Tap <strong>"Add"</strong> to confirm</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-sm">Tap the <strong>menu</strong> (&#8942;) at the top right of Chrome</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-sm">Tap <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong></p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-sm">Tap <strong>"Install"</strong> to confirm</p>
                </div>
              </>
            )}
            <Button className="w-full" variant="outline" onClick={() => setShowInstallInstructions(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {user ? (
        <>
          {/* User Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user.name || 'Tenant'}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4" data-testid="notification-preferences">
            <h3 className="font-semibold p-4 border-b border-gray-100">Notification Preferences</h3>
            <div className="p-4 space-y-4">
              {/* Push Notifications */}
              {pushSupported && (
                <div className="flex items-center justify-between" data-testid="push-notification-section">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      <Bell className="w-4 h-4 text-indigo-600" />
                      Push Notifications
                    </p>
                    <p className="text-sm text-gray-500">Get instant alerts for maintenance updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushEnabled}
                      onChange={(e) => handlePushToggle(e.target.checked)}
                      disabled={savingPrefs}
                      className="sr-only peer"
                      data-testid="push-notification-toggle"
                    />
                    <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 ${savingPrefs ? 'opacity-50' : ''}`}></div>
                  </label>
                </div>
              )}
              
              {/* SMS Notifications */}
              <div className="flex items-center justify-between" data-testid="sms-notification-section">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive text messages for maintenance updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!smsOptOut}
                    onChange={(e) => handleSmsOptOutChange(!e.target.checked)}
                    disabled={savingPrefs}
                    className="sr-only peer"
                    data-testid="sms-notification-toggle"
                  />
                  <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 ${savingPrefs ? 'opacity-50' : ''}`}></div>
                </label>
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
            <h3 className="font-semibold p-4 border-b border-gray-100">Contact Support</h3>
            <a href="tel:5069627368" className="flex items-center p-4 hover:bg-gray-50">
              <Phone className="w-5 h-5 text-indigo-600 mr-3" />
              <div>
                <p className="font-medium">(506) 962-RENT(7368)</p>
                <p className="text-sm text-gray-500">Call for emergencies</p>
              </div>
            </a>
            <a href="mailto:hello@NBRents.ca" className="flex items-center p-4 border-t border-gray-100 hover:bg-gray-50">
              <Mail className="w-5 h-5 text-indigo-600 mr-3" />
              <div>
                <p className="font-medium">hello@NBRents.ca</p>
                <p className="text-sm text-gray-500">General inquiries</p>
              </div>
            </a>
          </div>

          {/* Sign Out */}
          <Button variant="outline" className="w-full" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </>
      ) : (
        <div className="text-center py-8">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Welcome to NB Rents</h2>
          <p className="text-gray-500 mb-6">Sign in to submit maintenance requests and track their status</p>
          <Button onClick={onLogin} className="w-full max-w-xs">
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
}

// New Request Modal
function NewRequestModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'normal',
    property_address: '',
    tenant_name: '',
    tenant_phone: '',
    tenant_email: ''
  });

  const categories = ['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'Structural', 'Pest Control', 'Other'];

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      toast.error('Maximum 3 photos allowed');
      return;
    }

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const token = localStorage.getItem('nb_token');
        const response = await axios.post(`${API}/upload/image`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        setImages(prev => [...prev, response.data.url]);
      } catch (error) {
        toast.error('Failed to upload image');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category || !formData.property_address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('nb_token');
      await axios.post(`${API}/maintenance-requests`, {
        ...formData,
        images
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Request submitted successfully!');
      onSuccess();
      onClose();
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'normal',
        property_address: '',
        tenant_name: '',
        tenant_phone: '',
        tenant_email: ''
      });
      setImages([]);
    } catch (error) {
      toast.error('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Maintenance Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div>
            <Label>Title *</Label>
            <Input 
              placeholder="Brief description of the issue"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          
          <div>
            <Label>Category *</Label>
            <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Priority</Label>
            <Select value={formData.priority} onValueChange={(v) => setFormData({...formData, priority: v})}>
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

          <div>
            <Label>Property Address *</Label>
            <Input 
              placeholder="Enter your unit address"
              value={formData.property_address}
              onChange={(e) => setFormData({...formData, property_address: e.target.value})}
            />
          </div>

          <div>
            <Label>Description *</Label>
            <Textarea 
              placeholder="Describe the issue in detail..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <Label>Your Name</Label>
            <Input 
              placeholder="Your name"
              value={formData.tenant_name}
              onChange={(e) => setFormData({...formData, tenant_name: e.target.value})}
            />
          </div>

          <div>
            <Label>Your Phone</Label>
            <Input 
              type="tel"
              placeholder="(506) 555-1234"
              value={formData.tenant_phone}
              onChange={(e) => setFormData({...formData, tenant_phone: e.target.value})}
            />
          </div>

          <div>
            <Label>Your Email</Label>
            <Input 
              type="email"
              placeholder="your@email.com"
              value={formData.tenant_email}
              onChange={(e) => setFormData({...formData, tenant_email: e.target.value})}
            />
          </div>

          {/* Photo Upload */}
          <div>
            <Label>Photos (optional, max 3)</Label>
            <div className="flex gap-2 mt-2">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} alt="" className="w-16 h-16 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-16 h-16 border-2 border-dashed border-gray-300 rounded flex items-center justify-center hover:border-indigo-500"
                >
                  <Camera className="w-6 h-6 text-gray-400" />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Property Detail Modal
function PropertyDetailModal({ property, open, onClose }) {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto p-0">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <Badge className={property.status === 'available' ? 'bg-green-500 mb-2' : 'bg-gray-500 mb-2'}>
            {property.status}
          </Badge>
          <h2 className="text-xl font-bold">{property.title}</h2>
          <div className="flex items-center text-gray-500 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            {property.address}, {property.city}
          </div>
          
          <div className="flex items-center gap-4 mt-4 py-3 border-y border-gray-100">
            <div className="text-center flex-1">
              <Bed className="w-5 h-5 mx-auto text-indigo-600" />
              <p className="font-semibold">{property.bedrooms}</p>
              <p className="text-xs text-gray-500">Beds</p>
            </div>
            <div className="text-center flex-1">
              <Bath className="w-5 h-5 mx-auto text-indigo-600" />
              <p className="font-semibold">{property.bathrooms}</p>
              <p className="text-xs text-gray-500">Baths</p>
            </div>
            <div className="text-center flex-1">
              <Square className="w-5 h-5 mx-auto text-indigo-600" />
              <p className="font-semibold">{property.sqft}</p>
              <p className="text-xs text-gray-500">Sq Ft</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-600 text-sm">{property.description}</p>
          </div>

          {property.amenities?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity, i) => (
                  <Badge key={i} variant="outline">{amenity}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-2">
            <p className="text-2xl font-bold text-indigo-600">
              ${property.price?.toLocaleString()}<span className="text-sm font-normal text-gray-500">/month</span>
            </p>
            <a href="tel:5069627368">
              <Button className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Call (506) 962-RENT(7368)
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" className="w-full mt-2">
                <Mail className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Tenant App Component
export default function TenantApp() {
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'search');
  const [showNewRequest, setShowNewRequest] = useState(searchParams.get('action') === 'new-request');
  const [showLogin, setShowLogin] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [platform, setPlatform] = useState('desktop');

  // Login Modal
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);

  // Listen for install prompt + detect platform
  useEffect(() => {
    const detectedPlatform = getDevicePlatform();
    setPlatform(detectedPlatform);
    
    // Don't show banner if already installed
    if (isAppInstalled()) {
      setShowInstallBanner(false);
      return;
    }

    // Show banner for all platforms (iOS doesn't fire beforeinstallprompt)
    const dismissed = sessionStorage.getItem('nb_install_dismissed');
    if (!dismissed) {
      setShowInstallBanner(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!dismissed) setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android/Chrome - use native prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        toast.success('App installed successfully!');
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } else {
      // iOS or no prompt available - show instructions modal
      setShowInstallModal(true);
    }
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('nb_install_dismissed', 'true');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login`, loginForm);
      localStorage.setItem('nb_token', response.data.access_token);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Tenant App" 
        description="NB Rents tenant portal - submit maintenance requests and search for rental properties"
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NB</span>
            </div>
            <span className="font-semibold">NB Rents</span>
          </div>
          {user && (
            <button className="relative p-2">
              <Bell className="w-5 h-5 text-gray-600" />
              {hasNewNotifications && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          )}
        </div>
      </header>

      {/* Tab Content */}
      <main className="min-h-[calc(100vh-8rem)]">
        {activeTab === 'search' && (
          <SearchTab onPropertyClick={setSelectedProperty} />
        )}
        {activeTab === 'requests' && (
          <RequestsTab 
            user={user} 
            onNewRequest={() => user ? setShowNewRequest(true) : setShowLogin(true)} 
          />
        )}
        {activeTab === 'profile' && (
          <ProfileTab 
            user={user} 
            onLogin={() => setShowLogin(true)}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        hasNewNotifications={hasNewNotifications}
      />

      {/* Install App Banner - Shows above bottom nav */}
      {showInstallBanner && (
        <div className="fixed bottom-16 left-0 right-0 bg-indigo-600 text-white px-4 py-3 flex items-center justify-between z-40 shadow-lg" data-testid="install-app-banner">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 font-bold">NB</span>
            </div>
            <div>
              <p className="font-semibold text-sm">Get the NB Rents Tenant App</p>
              <p className="text-xs text-indigo-200">Install for quick access</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="secondary"
              onClick={handleInstallClick}
              className="bg-white text-indigo-600 hover:bg-indigo-50"
              data-testid="install-app-btn"
            >
              <Download className="w-4 h-4 mr-1" />
              Install
            </Button>
            <button 
              onClick={dismissInstallBanner}
              className="p-1 hover:bg-indigo-500 rounded"
              data-testid="dismiss-install-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Install Instructions Modal */}
      <Dialog open={showInstallModal} onOpenChange={setShowInstallModal}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-600" />
              Install NB Rents App
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {platform === 'ios' ? (
              <>
                <p className="text-sm text-gray-600">Follow these steps to add the app to your home screen:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium">Tap the Share button</p>
                      <p className="text-xs text-gray-500">The square icon with an arrow at the bottom of Safari</p>
                      <div className="mt-1 flex items-center gap-1 text-indigo-600">
                        <Share className="w-4 h-4" />
                        <span className="text-xs font-medium">Share</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium">Scroll down and tap "Add to Home Screen"</p>
                      <p className="text-xs text-gray-500">You may need to scroll down in the share menu</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium">Tap "Add" to confirm</p>
                      <p className="text-xs text-gray-500">The app will appear on your home screen</p>
                    </div>
                  </div>
                </div>
              </>
            ) : platform === 'android' ? (
              <>
                <p className="text-sm text-gray-600">Follow these steps to install the app:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium">Tap the menu button</p>
                      <p className="text-xs text-gray-500">The three dots (&#8942;) at the top right of Chrome</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium">Tap "Add to Home Screen" or "Install App"</p>
                      <p className="text-xs text-gray-500">This option may say "Install" on newer versions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="text-sm font-medium">Tap "Install" to confirm</p>
                      <p className="text-xs text-gray-500">The app will be added to your home screen</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-600">Install this app on your device:</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="text-sm font-medium">Look for the install icon in the address bar</p>
                      <p className="text-xs text-gray-500">Click the install icon (&#8853;) or the download icon in Chrome's address bar</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="text-sm font-medium">Click "Install" to confirm</p>
                      <p className="text-xs text-gray-500">The app will open in its own window</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <Button className="w-full" variant="outline" onClick={() => setShowInstallModal(false)}>
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Request Modal */}
      <NewRequestModal 
        open={showNewRequest} 
        onClose={() => setShowNewRequest(false)}
        onSuccess={() => setActiveTab('requests')}
      />

      {/* Property Detail Modal */}
      <PropertyDetailModal 
        property={selectedProperty}
        open={!!selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />

      {/* Login Modal */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4 py-2">
            <div>
              <Label>Email</Label>
              <Input 
                type="email"
                placeholder="your@email.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input 
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Sign In
            </Button>
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/?signup=tenant" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
