import React, { useState } from 'react';
import { Search, Plane, MapPin, Calendar, Users, DollarSign, Filter } from 'lucide-react';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
  isLoading: boolean;
}

export interface SearchData {
  origin: string;
  destination: string;
  date: string;
  adults: number;
  minPrice?: number;
  maxPrice?: number;
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

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [formData, setFormData] = useState<SearchData>({
    origin: '',
    destination: '',
    date: '',
    adults: 1,
    minPrice: undefined,
    maxPrice: undefined,
    preferredAirlines: [],
    stops: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Plane className="w-8 h-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Beausejour Voyage</h1>
        </div>
        <p className="text-gray-600">Find your perfect flight</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            From
          </label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => handleInputChange('origin', e.target.value)}
            placeholder="Enter origin airport code, e.g. CMN"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            To
          </label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            placeholder="Enter destination airport code, e.g. CDG"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Departure Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Number of Adults
          </label>
          <input
            type="number"
            value={formData.adults}
            onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
            required
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />Min Price
            </label>
            <input
              type="number"
              min="0"
              value={formData.minPrice ?? ''}
              onChange={e => handleInputChange('minPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              placeholder="Min"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />Max Price
            </label>
            <input
              type="number"
              min="0"
              value={formData.maxPrice ?? ''}
              onChange={e => handleInputChange('maxPrice', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
              placeholder="Max"
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
            onChange={e => handleInputChange('stops', e.target.value)}
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
          className="w-full bg-gradient-to-r from-primary to-cyan-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-primary hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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