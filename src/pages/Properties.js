import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Home,
  Building,
  ChevronDown,
  ChevronUp,
  List,
  Map as MapIcon
} from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// New Brunswick center coordinates
const NB_CENTER = { lat: 46.5, lng: -66.0 };

// Map container style
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Map options
const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: true,
  fullscreenControl: true
};

// Property Card for the list
function PropertyListCard({ property, isHovered, onHover, onLeave }) {
  return (
    <Link 
      to={`/properties/${property.id}`}
      className={`block bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
        isHovered ? 'border-indigo-500 shadow-lg' : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      data-testid={`property-card-${property.id}`}
    >
      <div className="flex">
        {/* Image */}
        <div className="w-32 h-32 flex-shrink-0">
          <img 
            src={property.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 p-3">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{property.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              property.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {property.status}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
            <MapPin className="w-3 h-3" />
            {property.address}, {property.city}
          </p>
          
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} bed`}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {property.bathrooms} bath
            </span>
            <span className="flex items-center gap-1">
              <Square className="w-3 h-3" />
              {property.sqft} sqft
            </span>
          </div>
          
          <div className="text-indigo-600 font-bold text-lg">
            ${property.price.toLocaleString()}/mo
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // 'split', 'list', 'map'
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapCenter, setMapCenter] = useState(NB_CENTER);
  const [mapZoom, setMapZoom] = useState(7);
  const mapRef = useRef(null);
  const clustererRef = useRef(null);
  const markersRef = useRef([]);

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    id: 'google-map-script'
  });

  const [filters, setFilters] = useState({
    status: searchParams.get('status') || '',
    property_type: searchParams.get('property_type') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    city: searchParams.get('city') || '',
  });

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [amenityFilters, setAmenityFilters] = useState([]);

  const allAmenities = ['Parking', 'Laundry', 'Gym', 'Pool', 'Pet-friendly', 'Central AC', 'Fireplace', 'Garage'];

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (filterParams = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value !== 'all') params.append(key, value);
      });
      
      const response = await axios.get(`${API}/properties?${params.toString()}`);
      setProperties(response.data);
      
      // Auto-fit map to show all properties
      if (response.data.length > 0) {
        const validProps = response.data.filter(p => p.latitude && p.longitude);
        if (validProps.length > 0) {
          const avgLat = validProps.reduce((sum, p) => sum + p.latitude, 0) / validProps.length;
          const avgLng = validProps.reduce((sum, p) => sum + p.longitude, 0) / validProps.length;
          setMapCenter({ lat: avgLat, lng: avgLng });
          setMapZoom(validProps.length === 1 ? 14 : 8);
        }
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all') params.set(key, value);
    });
    setSearchParams(params);
    fetchProperties(filters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      property_type: '',
      bedrooms: '',
      min_price: '',
      max_price: '',
      city: '',
    };
    setFilters(clearedFilters);
    setAmenityFilters([]);
    setPriceRange([0, 5000]);
    setSearchParams(new URLSearchParams());
    fetchProperties(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== '' && v !== 'all') || amenityFilters.length > 0;

  // Filter properties by amenities on client side
  const filteredProperties = properties.filter(property => {
    if (amenityFilters.length === 0) return true;
    return amenityFilters.every(amenity => 
      property.amenities?.some(a => a.toLowerCase().includes(amenity.toLowerCase()))
    );
  });

  const propertiesWithCoords = filteredProperties.filter(p => p.latitude && p.longitude);

  // Update clusterer when properties change
  useEffect(() => {
    if (!mapRef.current || !isLoaded) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    if (clustererRef.current) {
      clustererRef.current.clearMarkers();
    }
    
    // Create new markers
    const markers = propertiesWithCoords.map((property) => {
      const marker = new window.google.maps.Marker({
        position: { lat: property.latitude, lng: property.longitude },
        title: `${property.title} - $${property.price.toLocaleString()}/mo`,
      });
      
      // Show info on hover
      marker.addListener('mouseover', () => {
        setSelectedMarker(property);
      });
      
      // Also support click for mobile users
      marker.addListener('click', () => {
        setSelectedMarker(property);
      });
      
      return marker;
    });
    
    markersRef.current = markers;
    
    // Update clusterer
    if (clustererRef.current) {
      clustererRef.current.addMarkers(markers);
    }
  }, [propertiesWithCoords, isLoaded]);

  return (
    <div className="min-h-screen pt-20" data-testid="properties-page">
      <SEO 
        title="Rental Properties in New Brunswick - Apartments, Houses, Condos"
        description="Browse available rental properties in Miramichi, Moncton, Fredericton, and Saint John. Apartments, houses, condos, and townhouses. Find your perfect home with NB Rents."
        keywords="rental properties New Brunswick, apartments Miramichi, houses for rent Moncton, condos Fredericton, rentals Saint John"
      />
      
      {/* Header */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Find Your Perfect Rental
              </h1>
              <p className="text-gray-600 text-sm">
                {filteredProperties.length} properties in New Brunswick
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'split' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Split
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    viewMode === 'map' ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MapIcon className="w-4 h-4" />
                  Map
                </button>
              </div>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="toggle-filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                )}
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200 animate-fade-in" data-testid="filters-panel">
              <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">City/Area</Label>
                  <Select value={filters.city} onValueChange={(value) => handleFilterChange('city', value)}>
                    <SelectTrigger data-testid="filter-city">
                      <SelectValue placeholder="All areas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All areas</SelectItem>
                      <SelectItem value="Moncton">Moncton</SelectItem>
                      <SelectItem value="Saint John">Saint John</SelectItem>
                      <SelectItem value="Fredericton">Fredericton</SelectItem>
                      <SelectItem value="Dieppe">Dieppe</SelectItem>
                      <SelectItem value="Miramichi">Miramichi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger data-testid="filter-status">
                      <SelectValue placeholder="Any status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Property Type</Label>
                  <Select value={filters.property_type} onValueChange={(value) => handleFilterChange('property_type', value)}>
                    <SelectTrigger data-testid="filter-type">
                      <SelectValue placeholder="Any type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any type</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Bedrooms</Label>
                  <Select value={filters.bedrooms} onValueChange={(value) => handleFilterChange('bedrooms', value)}>
                    <SelectTrigger data-testid="filter-bedrooms">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="0">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Min Price</Label>
                  <Input
                    type="number"
                    placeholder="$0"
                    value={filters.min_price}
                    onChange={(e) => handleFilterChange('min_price', e.target.value)}
                    className="h-10"
                    data-testid="filter-min-price"
                  />
                </div>

                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Max Price</Label>
                  <Input
                    type="number"
                    placeholder="No max"
                    value={filters.max_price}
                    onChange={(e) => handleFilterChange('max_price', e.target.value)}
                    className="h-10"
                    data-testid="filter-max-price"
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <Label className="text-xs text-gray-600 mb-2 block">Amenities</Label>
                <div className="flex flex-wrap gap-3">
                  {allAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={amenityFilters.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAmenityFilters([...amenityFilters, amenity]);
                          } else {
                            setAmenityFilters(amenityFilters.filter(a => a !== amenity));
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} data-testid="clear-filters">
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                )}
                <Button onClick={applyFilters} className="btn-primary" data-testid="apply-filters">
                  <Search className="w-4 h-4 mr-2" />
                  Search Properties
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className={`flex ${viewMode === 'list' ? 'flex-col' : ''}`} style={{ height: 'calc(100vh - 200px)' }}>
        {/* Property List */}
        {(viewMode === 'split' || viewMode === 'list') && (
          <div className={`${viewMode === 'split' ? 'w-1/2 lg:w-2/5' : 'w-full'} overflow-y-auto bg-gray-50 p-4`}>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="spinner" />
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4 text-sm">Try adjusting your filters</p>
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={`space-y-3 ${viewMode === 'list' ? 'max-w-4xl mx-auto grid md:grid-cols-2 gap-4' : ''}`}>
                {filteredProperties.map((property) => (
                  <PropertyListCard
                    key={property.id}
                    property={property}
                    isHovered={hoveredProperty === property.id}
                    onHover={() => setHoveredProperty(property.id)}
                    onLeave={() => setHoveredProperty(null)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Map */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div className={`${viewMode === 'split' ? 'w-1/2 lg:w-3/5' : 'w-full'} relative`}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={mapZoom}
                options={mapOptions}
                onClick={() => setSelectedMarker(null)}
                onLoad={(map) => {
                  mapRef.current = map;
                  
                  // Clear existing markers and clusterer
                  markersRef.current.forEach(marker => marker.setMap(null));
                  markersRef.current = [];
                  if (clustererRef.current) {
                    clustererRef.current.clearMarkers();
                  }
                  
                  // Create markers for properties with coordinates
                  const markers = propertiesWithCoords.map((property) => {
                    const marker = new window.google.maps.Marker({
                      position: { lat: property.latitude, lng: property.longitude },
                      title: `${property.title} - $${property.price.toLocaleString()}/mo`,
                    });
                    
                    // Show info on hover
                    marker.addListener('mouseover', () => {
                      setSelectedMarker(property);
                    });
                    
                    // Also support click for mobile users
                    marker.addListener('click', () => {
                      setSelectedMarker(property);
                    });
                    
                    return marker;
                  });
                  
                  markersRef.current = markers;
                  
                  // Create clusterer
                  clustererRef.current = new MarkerClusterer({
                    map,
                    markers,
                    renderer: {
                      render: ({ count, position }) => {
                        return new window.google.maps.Marker({
                          position,
                          label: {
                            text: String(count),
                            color: 'white',
                            fontWeight: 'bold',
                          },
                          icon: {
                            path: window.google.maps.SymbolPath.CIRCLE,
                            scale: 20,
                            fillColor: '#4f46e5',
                            fillOpacity: 1,
                            strokeColor: '#3730a3',
                            strokeWeight: 2,
                          },
                          zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count,
                        });
                      },
                    },
                  });
                }}
              >
                {selectedMarker && (
                  <InfoWindowF
                    position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
                    onCloseClick={() => setSelectedMarker(null)}
                    options={{ pixelOffset: { width: 0, height: -30 } }}
                  >
                    <div className="p-2 max-w-xs" style={{ minWidth: '200px' }}>
                      <img
                        src={selectedMarker.images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'}
                        alt={selectedMarker.title}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-bold text-gray-900 text-sm mb-1">{selectedMarker.title}</h3>
                      <p className="text-xs text-gray-500 mb-2">{selectedMarker.address}, {selectedMarker.city}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-indigo-600 font-bold">${selectedMarker.price.toLocaleString()}/mo</span>
                        <Link 
                          to={`/properties/${selectedMarker.id}`}
                          className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </InfoWindowF>
                )}
              </GoogleMap>
            ) : loadError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Error loading map</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Loading map...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
