import React from 'react';
import { MapPin, Globe2 } from 'lucide-react';

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
}

const HotelResults: React.FC<HotelResultsProps> = ({ hotels }) => {
  if (!hotels.length) {
    return <div className="text-center text-gray-500">No hotels found.</div>;
  }
  return (
    <div className="grid gap-4 mt-4">
      {hotels.map((hotel, idx) => (
        <div key={idx} className="border rounded-2xl p-6 shadow-xl bg-cyan-50/80 max-w-2xl mx-auto mb-6">
          <div className="font-extrabold text-2xl text-gray-900 mb-2 flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-blue-500" />
            {hotel.name}
          </div>
          <div className="mb-2 flex items-start gap-2">
            <MapPin className="w-5 h-5 text-cyan-700 mt-1" />
            <div className="text-gray-800 text-base">
              {hotel.address && hotel.address.lines && (
                <div>{hotel.address.lines.join(', ')}</div>
              )}
              <div>
                {hotel.address && hotel.address.cityName && <span>{hotel.address.cityName}, </span>}
                {hotel.address && hotel.address.postalCode && <span>{hotel.address.postalCode}, </span>}
                {hotel.address && hotel.address.countryCode && <span className="font-semibold">{hotel.address.countryCode}</span>}
              </div>
            </div>
          </div>
          {hotel.geoCode && (
            <div className="text-sm text-blue-700 mb-2">
              <span className="font-semibold">Lat:</span> {hotel.geoCode.latitude}, <span className="font-semibold">Lng:</span> {hotel.geoCode.longitude}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelResults; 