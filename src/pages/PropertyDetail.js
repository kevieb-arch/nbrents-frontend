import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { SEO } from '../components/SEO';
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Phone, 
  Mail,
  CheckCircle,
  Calendar,
  Home
} from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`${API}/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
      navigate('/properties');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <Link to="/properties">
            <Button className="btn-primary">Browse Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusColors = {
    available: 'bg-emerald-100 text-emerald-700',
    rented: 'bg-blue-100 text-blue-700',
    maintenance: 'bg-amber-100 text-amber-700'
  };

  const defaultImage = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800';
  const images = property.images?.length > 0 ? property.images : [defaultImage];

  return (
    <div className="min-h-screen pt-20" data-testid="property-detail-page">
      <SEO 
        title={`${property.title} - ${property.city}`}
        description={`${property.bedrooms} bed, ${property.bathrooms} bath rental in ${property.city}. $${property.price.toLocaleString()}/month. ${property.description?.substring(0, 150)}...`}
        keywords={`rental ${property.city}, ${property.property_type} for rent, ${property.bedrooms} bedroom rental New Brunswick`}
      />
      {/* Back Button */}
      <div className="container-main py-6">
        <Link 
          to="/properties" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
          data-testid="back-to-properties"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Link>
      </div>

      {/* Main Content */}
      <div className="container-main pb-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image with Navigation Arrows */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg group">
              <img
                src={images[selectedImage]}
                alt={property.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
                data-testid="property-main-image"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  {/* Left Arrow */}
                  <button
                    onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    data-testid="image-prev-btn"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  
                  {/* Right Arrow */}
                  <button
                    onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    data-testid="image-next-btn"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
                    {selectedImage + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-indigo-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${property.title} - ${index + 1}`}
                      className="w-24 h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                About This Property
              </h2>
              <p className="text-gray-600 leading-relaxed" data-testid="property-description">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities?.length > 0 && (
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Amenities
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              {/* Status & Type Badges */}
              <div className="flex items-center gap-3 mb-6">
                <Badge className={statusColors[property.status] || statusColors.available}>
                  {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
                </Badge>
                <Badge variant="secondary" className="capitalize">
                  {property.property_type}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid="property-title">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <MapPin className="w-4 h-4" />
                <span>{property.address}, {property.city}</span>
              </div>

              {/* Price */}
              <div className="price-display text-4xl mb-8" data-testid="property-price">
                <span className="currency">$</span>
                {property.price?.toLocaleString()}
                <span className="period">/month</span>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="text-center">
                  <Bed className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <div className="font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-xs text-gray-500">Beds</div>
                </div>
                <div className="text-center">
                  <Bath className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <div className="font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-xs text-gray-500">Baths</div>
                </div>
                <div className="text-center">
                  <Square className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <div className="font-bold text-gray-900">{property.sqft?.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Sq Ft</div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <Link to="/contact" className="block">
                  <Button className="btn-primary w-full flex items-center justify-center gap-2" data-testid="schedule-tour">
                    <Calendar className="w-5 h-5" />
                    Schedule a Tour
                  </Button>
                </Link>
                <a href="tel:5069627368" className="block">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" />
                    (506) 962-RENT(7368)
                  </Button>
                </a>
                <a href="mailto:hello@nbrents.com" className="block">
                  <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-gray-600">
                    <Mail className="w-5 h-5" />
                    Email Us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
