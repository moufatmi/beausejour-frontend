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
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <Plane className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-bold text-gray-800">{flight.airline}</span>
          <span className="flex items-center text-gray-500 ml-2"><Hash className="w-4 h-4 mr-1" />{flight.flightNumber}</span>
        </div>
        <div className="flex items-center text-2xl font-bold text-blue-600">
          <Euro className="w-6 h-6 mr-1" />
          {flight.price}
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex items-center space-x-4 flex-1">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-700">
              <MapPin className="w-4 h-4 mr-1 text-blue-500" />
              <span className="font-semibold">{flight.departureAirport}</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">{formatTime(flight.departureTime)}</div>
            <div className="text-xs text-gray-500">{formatDate(flight.departureTime)}</div>
          </div>
          <div className="flex items-center text-gray-400">
            <div className="w-8 h-px bg-gray-300"></div>
            <ArrowRight className="w-5 h-5 mx-2 text-blue-400" />
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-700">
              <MapPin className="w-4 h-4 mr-1 text-teal-500" />
              <span className="font-semibold">{flight.arrivalAirport}</span>
            </div>
            <div className="text-xl font-semibold text-gray-800">{formatTime(flight.arrivalTime)}</div>
            <div className="text-xs text-gray-500">{formatDate(flight.arrivalTime)}</div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 min-w-[120px]">
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
      {/* Segments Table */}
      <div className="mt-4">
        <div className="font-semibold text-gray-700 mb-2">Segments:</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1">Airline</th>
                <th className="px-2 py-1">Flight #</th>
                <th className="px-2 py-1">Departure</th>
                <th className="px-2 py-1">Departure Time</th>
                <th className="px-2 py-1">Arrival</th>
                <th className="px-2 py-1">Arrival Time</th>
                <th className="px-2 py-1">Duration</th>
              </tr>
            </thead>
            <tbody>
              {flight.segments.map((seg, idx) => (
                <tr key={idx} className="border-t border-gray-100">
                  <td className="px-2 py-1">{seg.airline}</td>
                  <td className="px-2 py-1">{seg.flightNumber}</td>
                  <td className="px-2 py-1">{seg.departureAirport}</td>
                  <td className="px-2 py-1">{formatTime(seg.departureTime)}</td>
                  <td className="px-2 py-1">{seg.arrivalAirport}</td>
                  <td className="px-2 py-1">{formatTime(seg.arrivalTime)}</td>
                  <td className="px-2 py-1">{formatDuration(seg.duration)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};