import React, { useState, useEffect } from 'react';
import { Search, Plane, MapPin, Calendar, Users, DollarSign, Filter, AlertCircle, X } from 'lucide-react';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
  isLoading: boolean;
}

export interface SearchData {
  origin: string;
  destination: string;
  date: string;
  adults: number;
  preferredAirlines?: string[];
  stops?: string;
}

const AIRLINES = [
  { code: 'AT', name: 'Royal Air Maroc' },
  { code: 'AF', name: 'Air France' },
  { code: 'LH', name: 'Lufthansa' },
  { code: 'BA', name: 'British Airways' },
  { code: 'EK', name: 'Emirates' },
  // Add more as needed
];

const STOPS_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '0', label: 'Direct' },
  { value: '1', label: '1 stop' },
  { value: '2+', label: '2+ stops' },
];

const POPULAR_AIRPORTS = [
  { code: 'CMN', name: 'Casablanca' },
  { code: 'OUD', name: 'Oujda' },
  { code: 'RBA', name: 'Rabat' },
  { code: 'RAK', name: 'Marrakech' },
  { code: 'CDG', name: 'Paris CDG' },
  { code: 'ORY', name: 'Paris Orly' },
  { code: 'MAD', name: 'Madrid' },
  { code: 'BCN', name: 'Barcelona' },
];

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState<SearchData>({
    origin: '',
    destination: '',
    date: '',
    adults: 1,
    preferredAirlines: [],
    stops: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUppercase(formData.origin) || !isUppercase(formData.destination)) {
      setError('Airport codes must be letters only.');
      return;
    }
    if (formData.origin.length !== 3 || formData.destination.length !== 3) {
      setError('Airport codes must be exactly 3 letters.');
      return;
    }
    setError('');
    onSearch(formData);
  };

  const handleInputChange = (field: keyof SearchData, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAirlinesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, preferredAirlines: selected }));
  };

  const isUppercase = (value: string) => /^[A-Z]*$/.test(value);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full relative">
      {/* Floating Error Notification */}
      <div className={`absolute top-4 left-0 right-0 px-4 z-50 transition-all duration-300 transform ${error ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl shadow-lg flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 focus:outline-none">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-primary mr-3" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Beausejour Voyage</h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">Find your perfect flight</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            From
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => handleInputChange('origin', e.target.value.toUpperCase())}
              placeholder="e.g. CMN, OUD, CDG"
              list="airports"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${!isUppercase(formData.origin) && formData.origin ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            To
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value.toUpperCase())}
              placeholder="e.g. ORY, MAD, BCN"
              list="airports"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${!isUppercase(formData.destination) && formData.destination ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
          </div>
        </div>

        <datalist id="airports">
          {POPULAR_AIRPORTS.map(airport => (
            <option key={airport.code} value={airport.code}>{airport.name}</option>
          ))}
        </datalist>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Departure Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Adults
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              value={formData.adults}
              onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
              min="1"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Filter className="w-4 h-4 inline mr-2" />Preferred Airlines
          </label>
          <select
            multiple
            value={formData.preferredAirlines}
            onChange={handleAirlinesChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 h-28"
          >
            {AIRLINES.map(airline => (
              <option key={airline.code} value={airline.code}>{airline.name} ({airline.code})</option>
            ))}
          </select>
          <div className="text-xs text-gray-400 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple airlines.</div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Filter className="w-4 h-4 inline mr-2" />Number of Stops
          </label>
          <select
            value={formData.stops}
            onChange={(e) => handleInputChange('stops', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
          >
            {STOPS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching for flights...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Search Flights
            </>
          )}
        </button>
      </form>
    </div>
  );
};