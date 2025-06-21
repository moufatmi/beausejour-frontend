import React from 'react';
import { Clock, Euro, Plane, MapPin, ArrowRight, Hash } from 'lucide-react';

interface Segment {
  airline: string;
  flightNumber: string;
  departureAirport: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalTime: string;
  duration: string;
}

interface FlightCardProps {
  flight: {
    airline: string;
    flightNumber: string;
    departureAirport: string;
    departureTime: string;
    arrivalAirport: string;
    arrivalTime: string;
    duration: string;
    price: string;
    stops: number;
    segments: Segment[];
  };
}

function formatTime(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleDateString();
}

function formatDuration(duration: string) {
  // e.g. PT3H30M or 3h 30m
  return duration.replace('PT', '').replace('H', 'h ').replace('M', 'm').trim();
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 sm:p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <Plane className="w-6 h-6 text-primary" />
          <span className="text-base sm:text-lg font-bold text-gray-800">{flight.airline}</span>
          <span className="flex items-center text-gray-500 text-xs sm:text-sm ml-2"><Hash className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{flight.flightNumber}</span>
        </div>
        <div className="flex items-center text-xl sm:text-2xl font-bold text-primary self-end sm:self-center">
          <Euro className="w-5 h-5 sm:w-6 sm:h-6 mr-1" />
          {flight.price}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex items-center justify-between flex-1">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-700 text-sm sm:text-base">
              <MapPin className="w-4 h-4 mr-1 text-primary" />
              <span className="font-semibold">{flight.departureAirport}</span>
            </div>
            <div className="text-lg sm:text-xl font-semibold text-gray-800">{formatTime(flight.departureTime)}</div>
            <div className="text-xs text-gray-500">{formatDate(flight.departureTime)}</div>
          </div>
          <div className="flex-shrink-0 text-gray-400 mx-2">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-700 text-sm sm:text-base">
              <MapPin className="w-4 h-4 mr-1 text-teal-500" />
              <span className="font-semibold">{flight.arrivalAirport}</span>
            </div>
            <div className="text-lg sm:text-xl font-semibold text-gray-800">{formatTime(flight.arrivalTime)}</div>
            <div className="text-xs text-gray-500">{formatDate(flight.arrivalTime)}</div>
          </div>
        </div>
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start pt-2 md:pt-0 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 mt-2 md:mt-0 space-y-0 md:space-y-2 min-w-[120px]">
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatDuration(flight.duration)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Plane className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>
      </div>
      {/* Segments - better for mobile */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Flight Segments:</h3>
        <div className="space-y-2">
          {flight.segments.map((seg, idx) => (
            <div key={idx} className="bg-gray-50 p-2 rounded-lg text-xs">
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <div className="font-bold col-span-2">{seg.airline} {seg.flightNumber}</div>
                <div><span className="font-semibold">From:</span> {seg.departureAirport}</div>
                <div><span className="font-semibold">At:</span> {formatTime(seg.departureTime)}</div>
                <div><span className="font-semibold">To:</span> {seg.arrivalAirport}</div>
                <div><span className="font-semibold">At:</span> {formatTime(seg.arrivalTime)}</div>
                <div className="col-span-2"><span className="font-semibold">Duration:</span> {formatDuration(seg.duration)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};