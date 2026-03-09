import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import { SEO } from '../components/SEO';
import { 
  Wrench, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ServicePortal() {
  const { user, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  
  // Update dialog state
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    status: '',
    work_note: ''
  });
  
  // Expanded rows for viewing history
  const [expandedRows, setExpandedRows] = useState({});

  useEffect(() => {
    if (authLoading) return;
    
    // Only service and admin users can access this portal
    if (!user || (user.user_type !== 'service' && user.user_type !== 'admin')) {
      navigate('/');
      return;
    }
    fetchData();
  }, [user, authLoading, navigate]);

  useEffect(() => {
    filterRequests();
  }, [requests, searchTerm, statusFilter, priorityFilter]);

  const fetchData = async () => {
    try {
      const [statsRes, requestsRes] = await Promise.all([
        axios.get(`${API}/service/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/service/requests`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setStats(statsRes.data);
      setRequests(requestsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load service data');
    } finally {
      setLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = [...requests];
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r => 
        r.title?.toLowerCase().includes(term) ||
        r.property_address?.toLowerCase().includes(term) ||
        r.tenant_name?.toLowerCase().includes(term) ||
        r.tenant_email?.toLowerCase().includes(term) ||
        r.description?.toLowerCase().includes(term)
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => r.status === statusFilter);
    }
    
    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(r => r.priority === priorityFilter);
    }
    
    setFilteredRequests(filtered);
  };

  const openUpdateDialog = (request) => {
    setSelectedRequest(request);
    setUpdateForm({
      status: request.status,
      work_note: ''
    });
    setShowUpdateDialog(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!updateForm.work_note.trim() && updateForm.status === selectedRequest.status) {
      toast.error('Please add a work note or change the status');
      return;
    }
    
    setUpdating(true);
    try {
      const updateData = {};
      if (updateForm.status !== selectedRequest.status) {
        updateData.status = updateForm.status;
      }
      if (updateForm.work_note.trim()) {
        updateData.work_note = updateForm.work_note.trim();
      }
      
      await axios.put(`${API}/service/requests/${selectedRequest.id}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Request updated! Tenant will be notified.');
      setShowUpdateDialog(false);
      setSelectedRequest(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to update request');
    } finally {
      setUpdating(false);
    }
  };

  const toggleExpand = (requestId) => {
    setExpandedRows(prev => ({
      ...prev,
      [requestId]: !prev[requestId]
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      title: 'Total Requests',
      value: stats?.total || 0,
      icon: Wrench,
      color: 'neutral'
    },
    {
      title: 'Open',
      value: stats?.open || 0,
      icon: AlertCircle,
      color: stats?.open > 0 ? 'warning' : 'neutral'
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: Clock,
      color: 'neutral'
    },
    {
      title: 'Closed',
      value: stats?.closed || 0,
      icon: CheckCircle,
      color: 'positive'
    }
  ];

  const statusColors = {
    open: 'bg-blue-100 text-blue-700',
    pending: 'bg-amber-100 text-amber-700',
    closed: 'bg-green-100 text-green-700'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    normal: 'bg-blue-100 text-blue-700',
    high: 'bg-amber-100 text-amber-700',
    urgent: 'bg-red-100 text-red-700'
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50" data-testid="service-portal">
      <SEO title="Service Portal" />
      <div className="container-main py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Service Portal
            </h1>
            <p className="text-gray-600">Manage all maintenance requests</p>
          </div>
          {stats?.urgent_active > 0 && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">{stats.urgent_active} Urgent Request{stats.urgent_active > 1 ? 's' : ''}</span>
            </div>
          )}
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

        {/* Filters */}
        <div className="dashboard-card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by title, address, tenant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="search-requests"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="dashboard-card">
          <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Maintenance Requests ({filteredRequests.length})
          </h2>
          
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <Wrench className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No maintenance requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div 
                  key={request.id}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                  data-testid={`service-request-${request.id}`}
                >
                  {/* Request Header */}
                  <div className="p-4 bg-white">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-gray-900">{request.title}</h3>
                          <span className={`badge ${statusColors[request.status]}`}>
                            {request.status}
                          </span>
                          <span className={`badge ${priorityColors[request.priority]}`}>
                            {request.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                        
                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          {request.tenant_name && (
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {request.tenant_name}
                            </span>
                          )}
                          {request.property_address && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {request.property_address}
                            </span>
                          )}
                          {request.tenant_phone && (
                            <a href={`tel:${request.tenant_phone}`} className="flex items-center gap-1 text-indigo-600 hover:underline">
                              <Phone className="w-4 h-4" />
                              {request.tenant_phone}
                            </a>
                          )}
                          {request.tenant_email && (
                            <a href={`mailto:${request.tenant_email}`} className="flex items-center gap-1 text-indigo-600 hover:underline">
                              <Mail className="w-4 h-4" />
                              {request.tenant_email}
                            </a>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(request.created_at)}
                          </span>
                          <span className="capitalize">{request.category}</span>
                          <span>Ref: {request.id.slice(0, 8).toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          onClick={() => openUpdateDialog(request)}
                          className="btn-primary"
                          size="sm"
                          data-testid={`update-request-${request.id}`}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Update
                        </Button>
                        {request.work_notes?.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleExpand(request.id)}
                          >
                            {expandedRows[request.id] ? (
                              <ChevronUp className="w-4 h-4 mr-1" />
                            ) : (
                              <ChevronDown className="w-4 h-4 mr-1" />
                            )}
                            History ({request.work_notes.length})
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Work Notes History (Expandable) */}
                  {expandedRows[request.id] && request.work_notes?.length > 0 && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4">
                      <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Work History
                      </h4>
                      <div className="space-y-3">
                        {[...request.work_notes].reverse().map((note, index) => (
                          <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-gray-800 text-sm">{note.note}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                              <span>{note.updated_by}</span>
                              <span>•</span>
                              <span>{formatDate(note.timestamp)}</span>
                              {note.status_at_time && (
                                <>
                                  <span>•</span>
                                  <span className={`badge ${statusColors[note.status_at_time]} text-xs`}>
                                    {note.status_at_time}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Update Dialog */}
      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Update Maintenance Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <form onSubmit={handleUpdate} className="space-y-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-1">{selectedRequest.title}</h4>
                <p className="text-sm text-gray-600">{selectedRequest.property_address}</p>
                <p className="text-sm text-gray-500 mt-1">Tenant: {selectedRequest.tenant_name || 'Unknown'}</p>
              </div>
              
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select
                  value={updateForm.status}
                  onValueChange={(value) => setUpdateForm({ ...updateForm, status: value })}
                >
                  <SelectTrigger data-testid="update-status-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Work Note / Update *</Label>
                <Textarea
                  placeholder="Describe the work done or update for the tenant..."
                  value={updateForm.work_note}
                  onChange={(e) => setUpdateForm({ ...updateForm, work_note: e.target.value })}
                  rows={4}
                  data-testid="work-note-input"
                />
                <p className="text-xs text-gray-500">This note will be emailed to the tenant</p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowUpdateDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={updating}
                  data-testid="submit-update"
                >
                  {updating ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Update & Notify Tenant
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
