import React from 'react';

interface Hotel {
  name: string;
  address?: string;
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
        <div key={idx} className="border rounded p-4 shadow-sm">
          <div className="font-bold text-lg">{hotel.name}</div>
          {hotel.address && <div className="text-gray-700">{hotel.address}</div>}
          {hotel.geoCode && (
            <div className="text-sm text-gray-500">
              Lat: {hotel.geoCode.latitude}, Lng: {hotel.geoCode.longitude}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HotelResults; 