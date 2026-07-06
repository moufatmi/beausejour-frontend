import React, { useState } from 'react';
import { Clock, Euro, Plane, MapPin, ArrowRight, Hash, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);

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
      
      {/* Segments Accordion */}
      {flight.segments && flight.segments.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between text-gray-600 hover:text-primary transition-colors focus:outline-none"
          >
            <span className="font-semibold text-sm sm:text-base flex items-center gap-2">
              Flight Details & Segments
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {flight.segments.length} segment{flight.segments.length > 1 ? 's' : ''}
              </span>
            </span>
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-3 relative pl-4 sm:pl-6 border-l-2 border-primary/20 ml-2">
              {flight.segments.map((seg, idx) => (
                <div key={idx} className="relative bg-gray-50 p-3 sm:p-4 rounded-xl text-sm border border-gray-100 hover:border-primary/30 transition-colors shadow-sm">
                  {/* Timeline dot */}
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[23px] sm:-left-[31px] top-1/2 transform -translate-y-1/2 border-2 border-white shadow-sm"></div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <div className="font-bold text-gray-800 flex items-center gap-2">
                        <Plane className="w-4 h-4 text-primary" />
                        {seg.airline} <span className="text-gray-500 font-normal">#{seg.flightNumber}</span>
                      </div>
                      <div className="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(seg.duration)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Departure</div>
                        <div className="font-bold text-lg text-gray-800">{formatTime(seg.departureTime)}</div>
                        <div className="text-gray-600 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" />
                          <span className="font-medium">{seg.departureAirport}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{formatDate(seg.departureTime)}</div>
                      </div>
                      
                      <div className="hidden sm:flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gray-300" />
                      </div>
                      
                      <div className="sm:text-right mt-2 sm:mt-0">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Arrival</div>
                        <div className="font-bold text-lg text-gray-800">{formatTime(seg.arrivalTime)}</div>
                        <div className="text-gray-600 flex items-center sm:justify-end gap-1">
                          <MapPin className="w-3 h-3 text-teal-500" />
                          <span className="font-medium">{seg.arrivalAirport}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{formatDate(seg.arrivalTime)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};