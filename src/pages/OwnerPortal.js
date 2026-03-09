import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../components/ui/alert-dialog';
import { toast } from 'sonner';
import { SEO } from '../components/SEO';
import { 
  Building, 
  DollarSign, 
  Home, 
  TrendingUp, 
  Plus,
  LayoutDashboard,
  FileText,
  Settings,
  Wrench,
  Loader2,
  AlertCircle,
  Star,
  MoreVertical,
  Pencil,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  ClipboardList,
  ArrowRight,
  Users,
  Key,
  UserPlus
} from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function OwnerPortal() {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [addingProperty, setAddingProperty] = useState(false);
  
  // Edit state
  const [editingProperty, setEditingProperty] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  
  // Delete state
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Image upload state
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  // User management state (admin only)
  const [users, setUsers] = useState([]);
  const [showUsersSection, setShowUsersSection] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [addingUser, setAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditUserDialog, setShowEditUserDialog] = useState(false);
  const [savingUserEdit, setSavingUserEdit] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [userToResetPassword, setUserToResetPassword] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [resettingPassword, setResettingPassword] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    user_type: 'tenant'
  });

  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    property_type: 'apartment',
    amenities: '',
    images: ''
  });

  useEffect(() => {
    if (authLoading) return;
    
    if (!user || (user.user_type !== 'owner' && user.user_type !== 'admin')) {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, authLoading, navigate]);

  const fetchData = async () => {
    try {
      const [statsRes, propsRes, maintenanceRes] = await Promise.all([
        axios.get(`${API}/owner/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/owner/properties`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/maintenance-requests`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setStats(statsRes.data);
      setProperties(propsRes.data);
      setMaintenanceRequests(maintenanceRes.data);
      
      // Fetch users if admin
      if (user?.user_type === 'admin') {
        try {
          const usersRes = await axios.get(`${API}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUsers(usersRes.data);
        } catch (err) {
          console.error('Error fetching users:', err);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // User management functions (admin only)
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddingUser(true);
    try {
      await axios.post(`${API}/admin/users`, newUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User created successfully');
      setShowAddUser(false);
      setNewUser({ name: '', email: '', password: '', phone: '', user_type: 'tenant' });
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create user');
    } finally {
      setAddingUser(false);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setSavingUserEdit(true);
    try {
      await axios.put(`${API}/admin/users/${editingUser.id}`, {
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
        user_type: editingUser.user_type
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User updated successfully');
      setShowEditUserDialog(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update user');
    } finally {
      setSavingUserEdit(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setResettingPassword(true);
    try {
      await axios.put(`${API}/admin/users/${userToResetPassword.id}/reset-password`, {
        new_password: newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password reset successfully');
      setShowResetPasswordDialog(false);
      setUserToResetPassword(null);
      setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to reset password');
    } finally {
      setResettingPassword(false);
    }
  };

  const handleDeleteUser = async () => {
    setDeletingUser(true);
    try {
      await axios.delete(`${API}/admin/users/${userToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User deleted successfully');
      setShowDeleteUserDialog(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to delete user');
    } finally {
      setDeletingUser(false);
    }
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setAddingProperty(true);

    try {
      // Combine uploaded images with any URL-based images
      const urlImages = newProperty.images ? newProperty.images.split(',').map(url => url.trim()).filter(url => url) : [];
      const allImages = [...uploadedImages, ...urlImages];

      // Geocode the address to get coordinates
      let latitude = null;
      let longitude = null;
      const fullAddress = `${newProperty.address}, ${newProperty.city}, New Brunswick, Canada`;
      try {
        const geocodeResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        );
        const geocodeData = await geocodeResponse.json();
        if (geocodeData.results && geocodeData.results.length > 0) {
          latitude = geocodeData.results[0].geometry.location.lat;
          longitude = geocodeData.results[0].geometry.location.lng;
        }
      } catch (geocodeError) {
        console.log('Geocoding failed, property will be added without coordinates');
      }

      const propertyData = {
        ...newProperty,
        price: parseFloat(newProperty.price),
        bedrooms: parseInt(newProperty.bedrooms),
        bathrooms: parseFloat(newProperty.bathrooms),
        sqft: parseInt(newProperty.sqft),
        amenities: newProperty.amenities.split(',').map(a => a.trim()).filter(a => a),
        status: 'available',
        images: allImages,
        featured: false,
        latitude,
        longitude
      };

      await axios.post(`${API}/properties`, propertyData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Property added successfully!');
      setShowAddProperty(false);
      setNewProperty({
        title: '',
        description: '',
        address: '',
        city: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        property_type: 'apartment',
        amenities: '',
        images: ''
      });
      setUploadedImages([]);
      fetchData();
    } catch (error) {
      toast.error('Failed to add property');
    } finally {
      setAddingProperty(false);
    }
  };

  const toggleFeatured = async (propertyId) => {
    try {
      const response = await axios.patch(`${API}/properties/${propertyId}/featured`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.featured ? 'Property marked as featured!' : 'Property removed from featured');
      fetchData();
    } catch (error) {
      toast.error('Failed to update featured status');
    }
  };

  const updateStatus = async (propertyId, status) => {
    try {
      await axios.patch(`${API}/properties/${propertyId}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Property marked as ${status}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  // Image upload handler
  const handleImageUpload = async (e, isEdit = false) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploadingImages(true);
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    
    try {
      const response = await axios.post(`${API}/upload/images`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      const newUrls = response.data.urls.map(url => 
        url.startsWith('/uploads') ? `${process.env.REACT_APP_BACKEND_URL}${url}` : url
      );
      
      if (isEdit && editingProperty) {
        const currentImages = editingProperty.images || [];
        setEditingProperty({
          ...editingProperty,
          images: [...currentImages, ...newUrls]
        });
      } else {
        setUploadedImages(prev => [...prev, ...newUrls]);
      }
      
      toast.success(`${newUrls.length} image(s) uploaded!`);
    } catch (error) {
      toast.error('Failed to upload images');
    } finally {
      setUploadingImages(false);
      e.target.value = '';
    }
  };

  const removeImage = (index, isEdit = false) => {
    if (isEdit && editingProperty) {
      const newImages = [...editingProperty.images];
      newImages.splice(index, 1);
      setEditingProperty({ ...editingProperty, images: newImages });
    } else {
      setUploadedImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Edit property handler
  const openEditDialog = (property) => {
    setEditingProperty({
      ...property,
      amenities: property.amenities?.join(', ') || ''
    });
    setShowEditDialog(true);
  };

  const handleEditProperty = async (e) => {
    e.preventDefault();
    setSavingEdit(true);

    try {
      const propertyData = {
        title: editingProperty.title,
        description: editingProperty.description,
        address: editingProperty.address,
        city: editingProperty.city,
        price: parseFloat(editingProperty.price),
        bedrooms: parseInt(editingProperty.bedrooms),
        bathrooms: parseFloat(editingProperty.bathrooms),
        sqft: parseInt(editingProperty.sqft),
        property_type: editingProperty.property_type,
        amenities: typeof editingProperty.amenities === 'string' 
          ? editingProperty.amenities.split(',').map(a => a.trim()).filter(a => a)
          : editingProperty.amenities || [],
        status: editingProperty.status,
        images: editingProperty.images || [],
        featured: editingProperty.featured || false
      };

      await axios.put(`${API}/properties/${editingProperty.id}`, propertyData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Property updated successfully!');
      setShowEditDialog(false);
      setEditingProperty(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to update property');
    } finally {
      setSavingEdit(false);
    }
  };

  // Delete property handler
  const openDeleteDialog = (property) => {
    setPropertyToDelete(property);
    setShowDeleteDialog(true);
  };

  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return;
    
    setDeleting(true);
    try {
      await axios.delete(`${API}/properties/${propertyToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Property deleted successfully!');
      setShowDeleteDialog(false);
      setPropertyToDelete(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to delete property');
    } finally {
      setDeleting(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Properties',
      value: stats?.total_properties || 0,
      icon: Building,
      color: 'neutral'
    },
    {
      title: 'Rented Units',
      value: stats?.rented || 0,
      icon: Home,
      color: 'positive'
    },
    {
      title: 'Monthly Revenue',
      value: `$${(stats?.monthly_revenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'positive'
    },
    {
      title: 'Occupancy Rate',
      value: `${(stats?.occupancy_rate || 0).toFixed(0)}%`,
      icon: TrendingUp,
      color: stats?.occupancy_rate >= 80 ? 'positive' : 'warning'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50" data-testid="owner-portal">
      <SEO title="Owner Portal" />
      <div className="container-main py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {user?.user_type === 'admin' ? 'Admin Dashboard' : 'Owner Dashboard'}
            </h1>
            <p className="text-gray-600">
              Welcome back, {user?.name}
              {user?.user_type === 'admin' && <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">Admin</span>}
            </p>
          </div>
          <Dialog open={showAddProperty} onOpenChange={setShowAddProperty}>
            <DialogTrigger asChild>
              <Button className="btn-primary flex items-center gap-2" data-testid="add-property-button">
                <Plus className="w-5 h-5" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProperty} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    placeholder="Modern Downtown Apartment"
                    value={newProperty.title}
                    onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                    required
                    data-testid="new-property-title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input
                      placeholder="123 Main St"
                      value={newProperty.address}
                      onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input
                      placeholder="Moncton"
                      value={newProperty.city}
                      onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monthly Rent ($)</Label>
                    <Input
                      type="number"
                      placeholder="1500"
                      value={newProperty.price}
                      onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Select
                      value={newProperty.property_type}
                      onValueChange={(value) => setNewProperty({ ...newProperty, property_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="townhouse">Townhouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Beds</Label>
                    <Input
                      type="number"
                      placeholder="2"
                      value={newProperty.bedrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bedrooms: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Baths</Label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="1"
                      value={newProperty.bathrooms}
                      onChange={(e) => setNewProperty({ ...newProperty, bathrooms: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sq Ft</Label>
                    <Input
                      type="number"
                      placeholder="900"
                      value={newProperty.sqft}
                      onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe your property..."
                    value={newProperty.description}
                    onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Amenities (comma separated)</Label>
                  <Input
                    placeholder="Parking, Laundry, Gym"
                    value={newProperty.amenities}
                    onChange={(e) => setNewProperty({ ...newProperty, amenities: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Property Images</Label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, false)}
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImages}
                    data-testid="upload-images-btn"
                  >
                    {uploadingImages ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Upload from Gallery
                  </Button>
                  
                  {/* Image previews */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index, false)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">Or paste image URLs (comma separated):</p>
                  <Input
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    value={newProperty.images}
                    onChange={(e) => setNewProperty({ ...newProperty, images: e.target.value })}
                  />
                </div>
                <Button type="submit" className="btn-primary w-full" disabled={addingProperty}>
                  {addingProperty ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Add Property
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`} data-testid={`stat-${stat.title.toLowerCase().replace(' ', '-')}`}>
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

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Properties List */}
          <div className="lg:col-span-2">
            <div className="dashboard-card">
              <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Your Properties
              </h2>
              {properties.length === 0 ? (
                <div className="text-center py-12">
                  <Building className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No properties yet. Add your first property!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div 
                      key={property.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      data-testid={`owner-property-${property.id}`}
                    >
                      <img
                        src={property.images?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200'}
                        alt={property.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900 truncate">{property.title}</h3>
                          {property.featured && (
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{property.address}, {property.city}</p>
                      </div>
                      <div className="text-right mr-2">
                        <div className="font-bold text-indigo-600">${property.price}/mo</div>
                        <span className={`badge ${property.status === 'rented' ? 'badge-rented' : property.status === 'maintenance' ? 'badge-maintenance' : 'badge-available'}`}>
                          {property.status}
                        </span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" data-testid={`property-menu-${property.id}`}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toggleFeatured(property.id)} data-testid={`toggle-featured-${property.id}`}>
                            <Star className={`w-4 h-4 mr-2 ${property.featured ? 'text-amber-400 fill-amber-400' : ''}`} />
                            {property.featured ? 'Remove from Featured' : 'Mark as Featured'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => updateStatus(property.id, 'available')}
                            disabled={property.status === 'available'}
                          >
                            Mark Available
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateStatus(property.id, 'rented')}
                            disabled={property.status === 'rented'}
                          >
                            Mark Rented
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateStatus(property.id, 'maintenance')}
                            disabled={property.status === 'maintenance'}
                          >
                            Mark Maintenance
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openEditDialog(property)} data-testid={`edit-property-${property.id}`}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit Property
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openDeleteDialog(property)}
                            className="text-red-600 focus:text-red-600"
                            data-testid={`delete-property-${property.id}`}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Property
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Maintenance Requests */}
          <div className="lg:col-span-1">
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Maintenance Requests
                </h2>
                {user?.user_type === 'admin' && (
                  <Link 
                    to="/service-portal" 
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                    data-testid="service-portal-link"
                  >
                    <ClipboardList className="w-4 h-4" />
                    Service Portal
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
              {maintenanceRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Wrench className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">No maintenance requests</p>
                  {user?.user_type === 'admin' && (
                    <Link 
                      to="/service-portal" 
                      className="mt-3 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      View all in Service Portal <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {maintenanceRequests.slice(0, 5).map((request) => (
                    <div 
                      key={request.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm">{request.title}</h4>
                          <p className="text-xs text-gray-500">{request.category}</p>
                        </div>
                        <span className={`badge badge-${request.status.replace('_', '-')}`}>
                          {request.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                  {user?.user_type === 'admin' && maintenanceRequests.length > 5 && (
                    <Link 
                      to="/service-portal" 
                      className="block text-center text-sm text-indigo-600 hover:text-indigo-700 pt-2"
                    >
                      View all {maintenanceRequests.length} requests <ArrowRight className="w-3 h-3 inline" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Users Management Section (Admin Only) */}
        {user?.user_type === 'admin' && (
          <div className="mt-8">
            <div className="dashboard-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    User Management
                  </h2>
                  <span className="badge badge-info">{users.length} users</span>
                </div>
                <Button onClick={() => setShowAddUser(true)} className="btn-primary" data-testid="add-user-btn">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>

              {users.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 text-sm">No users found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="font-medium text-gray-900">{u.name}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{u.email}</td>
                          <td className="py-3 px-4 text-gray-600">{u.phone || '-'}</td>
                          <td className="py-3 px-4">
                            <span className={`badge ${
                              u.user_type === 'admin' ? 'badge-info' : 
                              u.user_type === 'owner' ? 'badge-success' : 
                              u.user_type === 'service' ? 'badge-warning' : 'badge-default'
                            }`}>
                              {u.user_type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-500 text-sm">
                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-end gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" data-testid={`user-actions-${u.id}`}>
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => {
                                    setEditingUser(u);
                                    setShowEditUserDialog(true);
                                  }}>
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    setUserToResetPassword(u);
                                    setShowResetPasswordDialog(true);
                                  }}>
                                    <Key className="w-4 h-4 mr-2" />
                                    Reset Password
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => {
                                      setUserToDelete(u);
                                      setShowDeleteUserDialog(true);
                                    }}
                                    disabled={u.id === user.id}
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Property Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
          </DialogHeader>
          {editingProperty && (
            <form onSubmit={handleEditProperty} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editingProperty.title}
                  onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
                  required
                  data-testid="edit-property-title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input
                    value={editingProperty.address}
                    onChange={(e) => setEditingProperty({ ...editingProperty, address: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input
                    value={editingProperty.city}
                    onChange={(e) => setEditingProperty({ ...editingProperty, city: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Monthly Rent ($)</Label>
                  <Input
                    type="number"
                    value={editingProperty.price}
                    onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select
                    value={editingProperty.property_type}
                    onValueChange={(value) => setEditingProperty({ ...editingProperty, property_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Beds</Label>
                  <Input
                    type="number"
                    value={editingProperty.bedrooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bedrooms: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Baths</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={editingProperty.bathrooms}
                    onChange={(e) => setEditingProperty({ ...editingProperty, bathrooms: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sq Ft</Label>
                  <Input
                    type="number"
                    value={editingProperty.sqft}
                    onChange={(e) => setEditingProperty({ ...editingProperty, sqft: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Amenities (comma separated)</Label>
                <Input
                  value={editingProperty.amenities}
                  onChange={(e) => setEditingProperty({ ...editingProperty, amenities: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Property Images</Label>
                <input
                  type="file"
                  ref={editFileInputRef}
                  onChange={(e) => handleImageUpload(e, true)}
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => editFileInputRef.current?.click()}
                  disabled={uploadingImages}
                >
                  {uploadingImages ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Upload className="w-4 h-4 mr-2" />
                  )}
                  Add More Images
                </Button>
                
                {/* Current images */}
                {editingProperty.images && editingProperty.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {editingProperty.images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Property ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index, true)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary flex-1" disabled={savingEdit}>
                  {savingEdit ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{propertyToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProperty}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleting}
              data-testid="confirm-delete-property"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add User Dialog */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Add New User
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddUser} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="John Doe"
                required
                data-testid="new-user-name"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="john@example.com"
                required
                data-testid="new-user-email"
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                data-testid="new-user-password"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone (optional)</Label>
              <Input
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="(506) 555-1234"
                data-testid="new-user-phone"
              />
            </div>
            <div className="space-y-2">
              <Label>User Role</Label>
              <Select
                value={newUser.user_type}
                onValueChange={(value) => setNewUser({ ...newUser, user_type: value })}
              >
                <SelectTrigger data-testid="new-user-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tenant">Tenant</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="service">Service Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-primary flex-1" disabled={addingUser}>
                {addingUser ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                Create User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="w-5 h-5" />
              Edit User
            </DialogTitle>
          </DialogHeader>
          {editingUser && (
            <form onSubmit={handleEditUser} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  required
                  data-testid="edit-user-name"
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  required
                  data-testid="edit-user-email"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  data-testid="edit-user-phone"
                />
              </div>
              <div className="space-y-2">
                <Label>User Role</Label>
                <Select
                  value={editingUser.user_type}
                  onValueChange={(value) => setEditingUser({ ...editingUser, user_type: value })}
                >
                  <SelectTrigger data-testid="edit-user-role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tenant">Tenant</SelectItem>
                    <SelectItem value="owner">Owner</SelectItem>
                    <SelectItem value="service">Service Staff</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowEditUserDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="btn-primary flex-1" disabled={savingUserEdit}>
                  {savingUserEdit ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Reset Password Dialog */}
      <Dialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              Reset Password
            </DialogTitle>
          </DialogHeader>
          {userToResetPassword && (
            <div className="space-y-4 mt-4">
              <p className="text-sm text-gray-600">
                Reset password for <strong>{userToResetPassword.name}</strong> ({userToResetPassword.email})
              </p>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  data-testid="reset-password-input"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => {
                    setShowResetPasswordDialog(false);
                    setNewPassword('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleResetPassword} 
                  className="btn-primary flex-1" 
                  disabled={resettingPassword || newPassword.length < 6}
                >
                  {resettingPassword ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Key className="w-4 h-4 mr-2" />}
                  Reset Password
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={showDeleteUserDialog} onOpenChange={setShowDeleteUserDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the user "{userToDelete?.name}" ({userToDelete?.email})? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
              disabled={deletingUser}
              data-testid="confirm-delete-user"
            >
              {deletingUser ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
