import React from 'react';
import { MapPin, Globe2, AlertCircle, Building2 } from 'lucide-react';

interface Hotel {
  name: string;
  address?: any;
  geoCode?: {
    latitude: number;
    longitude: number;
  };
}

interface HotelResultsProps {
  hotels: Hotel[];
  isLoading: boolean;
  error: string | null;
}

const HotelResults: React.FC<HotelResultsProps> = ({ hotels, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
            <Building2 className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <p className="text-lg text-gray-600">Searching for hotels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No hotels found</h3>
          <p className="text-gray-600">Please try different search criteria or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Hotel Results</h2>
        <p className="text-blue-100">Found {hotels.length} hotel{hotels.length !== 1 ? 's' : ''} in this area</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {hotels.map((hotel, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100/80 transition-all duration-300 transform hover:scale-[1.02] flex flex-col justify-between">
            <div>
              <div className="font-bold text-lg text-gray-800 mb-3 flex items-start gap-2">
                <Building2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                <span>{hotel.name}</span>
              </div>
              
              <div className="mb-4 flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0" />
                <div>
                  {hotel.address && hotel.address.lines && (
                    <div className="font-medium text-gray-700">{hotel.address.lines.join(', ')}</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {hotel.address && hotel.address.cityName && <span>{hotel.address.cityName}, </span>}
                    {hotel.address && hotel.address.postalCode && <span>{hotel.address.postalCode}, </span>}
                    {hotel.address && hotel.address.countryCode && <span className="font-semibold text-gray-600">{hotel.address.countryCode}</span>}
                  </div>
                </div>
              </div>
            </div>

            {hotel.geoCode && (
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-cyan-700">
                <span className="bg-cyan-50 px-2.5 py-1 rounded-full font-medium">Coordinates</span>
                <span>Lat: {Number(hotel.geoCode.latitude).toFixed(4)}, Lng: {Number(hotel.geoCode.longitude).toFixed(4)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelResults;