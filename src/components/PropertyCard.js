import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

export const PropertyCard = ({ property }) => {
  const statusColors = {
    available: 'badge-available',
    rented: 'badge-rented',
    maintenance: 'badge-maintenance'
  };

  const defaultImage = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800';

  return (
    <Link 
      to={`/properties/${property.id}`} 
      className="property-card block"
      data-testid={`property-card-${property.id}`}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.images?.[0] || defaultImage}
          alt={property.title}
          className={`w-full h-full object-cover ${property.status === 'rented' ? 'opacity-60' : ''}`}
        />
        {/* Diagonal RENTED banner */}
        {property.status === 'rented' && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
            <div className="absolute -left-10 top-6 bg-red-600 text-white text-sm font-bold py-1.5 px-12 -rotate-45 shadow-lg tracking-widest">
              RENTED
            </div>
          </div>
        )}
        <div className="absolute top-4 left-4 z-10">
          <span className={`badge ${statusColors[property.status] || 'badge-available'}`}>
            {property.status?.charAt(0).toUpperCase() + property.status?.slice(1)}
          </span>
        </div>
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="badge bg-amber-400 text-amber-900">Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="price-display text-2xl mb-2">
          <span className="currency">$</span>
          {property.price?.toLocaleString()}
          <span className="period">/mo</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{property.address}, {property.city}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4" />
            <span>{property.sqft?.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Property Type */}
        <div className="mt-4">
          <Badge variant="secondary" className="capitalize">
            {property.property_type}
          </Badge>
        </div>
      </div>
    </Link>
  );
};
