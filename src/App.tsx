import React, { useState } from 'react';
import { SearchForm, SearchData } from './components/SearchForm';
import { FlightResults } from './components/FlightResults';

interface Flight {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
}

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (searchData: SearchData) => {
    // Frontend validation
    if (
      typeof searchData.origin !== 'string' || !searchData.origin.trim() ||
      typeof searchData.destination !== 'string' || !searchData.destination.trim() ||
      typeof searchData.date !== 'string' || !searchData.date.trim() ||
      !Number.isInteger(searchData.adults) || searchData.adults <= 0
    ) {
      setError('Please enter valid origin, destination, departure date, and a positive number of adults.');
      setFlights([]);
      setHasSearched(true);
      return;
    }
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    // Use environment variable for the API URL
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    try {
      const response = await fetch(`${apiUrl}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: searchData.origin,
          destination: searchData.destination,
          date: searchData.date,
          adults: searchData.adults,
          minPrice: searchData.minPrice,
          maxPrice: searchData.maxPrice,
          preferredAirlines: searchData.preferredAirlines,
          stops: searchData.stops
        })        
      });

      if (!response.ok) {
        throw new Error(`Failed to search flights: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (data.flights && Array.isArray(data.flights)) {
        setFlights(data.flights);
      } else if (Array.isArray(data)) {
        setFlights(data);
      } else {
        setFlights([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          setError('Unable to connect to the flight search service. Please check your connection and try again.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Unable to connect to the flight search service. Please check your connection and try again.');
      }
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-cyan-700 to-cyan-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 min-h-screen">
          {/* Search Form */}
          <div className="flex-shrink-0">
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Results */}
          {hasSearched && (
            <div className="flex-1 w-full lg:max-w-none">
              <FlightResults 
                flights={flights} 
                isLoading={isLoading} 
                error={error} 
              />
            </div>
          )}
        </div>

        {!hasSearched && (
          <div className="text-center mt-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome to Beausejour Voyage
            </h2>
            <p className="text-xl text-cyan-100 max-w-2xl mx-auto">
              Discover amazing flight deals and start your journey today. 
              Search from thousands of flights to find the perfect option for your trip.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;