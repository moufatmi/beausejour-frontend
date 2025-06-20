import React from 'react';
import { FlightCard } from './FlightCard';
import { AlertCircle, Plane } from 'lucide-react';

interface FlightResultsProps {
  flights: any[];
  isLoading: boolean;
  error: string | null;
}

export const FlightResults: React.FC<FlightResultsProps> = ({ flights, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <Plane className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
          <p className="text-lg text-gray-600">Searching for flights...</p>
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

  if (flights.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <Plane className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No flights found</h3>
          <p className="text-gray-600">Please try different search criteria or check back later.</p>
        </div>
      </div>
    );
  }

  // Transform backend flight data to the new structure for FlightCard
  const mapFlight = (flight: any) => {
    // Assume top-level fields and segments array are present
    return {
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      departureAirport: flight.departureAirport,
      departureTime: flight.departureTime,
      arrivalAirport: flight.arrivalAirport,
      arrivalTime: flight.arrivalTime,
      duration: flight.duration,
      price: flight.price,
      stops: flight.stops,
      segments: flight.segments,
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Flight Results</h2>
        <p className="text-blue-100">Found {flights.length} flight{flights.length !== 1 ? 's' : ''} for your search</p>
      </div>
      
      <div className="space-y-4">
        {flights.map((flight, index) => (
          <div key={index} className="transform hover:scale-[1.02] transition-transform duration-200">
            <FlightCard flight={mapFlight(flight)} />
          </div>
        ))}
      </div>
    </div>
  );
};