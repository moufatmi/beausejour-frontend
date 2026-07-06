import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Search, AlertCircle, X } from 'lucide-react';

interface HotelSearchFormProps {
  onSubmit: (cityCode: string) => void;
  isLoading: boolean;
}

const HotelSearchForm: React.FC<HotelSearchFormProps> = ({ onSubmit, isLoading }) => {
  const [cityCode, setCityCode] = useState('');
  const [error, setError] = useState('');

  // Auto-dismiss error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[A-Z]{3}$/.test(cityCode.trim().toUpperCase())) {
      setError('Please enter a valid 3-letter city code (e.g., PAR).');
      return;
    }
    setError('');
    onSubmit(cityCode.trim().toUpperCase());
  };

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

      <div className="text-center mb-6 pt-4">
        <div className="flex items-center justify-center mb-4">
          <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-primary mr-3 animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Beausejour Voyage</h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base">Find your perfect hotel</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div>
          <label htmlFor="cityCode" className="block text-sm font-semibold text-gray-700 mb-2">
            City / Location Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="cityCode"
              type="text"
              maxLength={3}
              value={cityCode}
              onChange={e => setCityCode(e.target.value.toUpperCase())}
              placeholder="e.g. PAR, MAD, LON"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg text-center uppercase tracking-widest font-bold text-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 ${error ? 'border-red-500' : 'border-gray-300'}`}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-primary hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching for hotels...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Search Hotels
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default HotelSearchForm;