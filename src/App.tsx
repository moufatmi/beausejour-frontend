import React, { useState, lazy, Suspense } from 'react';
import { SearchForm, SearchData } from './components/SearchForm';
import Navigation from './components/Navigation';
import { Facebook, Linkedin, Phone, Mail } from 'lucide-react';
import HotelSearchForm from './components/HotelSearchForm';
import HotelResults from './components/HotelResults';
const FlightResults = lazy(() => import('./components/FlightResults').then(module => ({ default: module.FlightResults })));

interface Flight {
  airline: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  duration: string;
}

interface Hotel {
  name: string;
  address?: string;
  geoCode?: {
    latitude: number;
    longitude: number;
  };
}

function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchType, setSearchType] = useState<'flight' | 'hotel'>('flight');






  const handleSearch = async (searchData: SearchData) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setFlights([]);
    setHotels([]);
    try {
      const response = await fetch('https://beausejour-backend.vercel.app/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: searchData.origin,
          destination: searchData.destination,
          date: searchData.date,
          adults: searchData.adults,
          preferredAirlines: searchData.preferredAirlines,
          stops: searchData.stops
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to search flights: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
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
        setError(err.message);
      } else {
        setError('Unable to connect to the flight search service. Please check your connection and try again.');
      }
      setFlights([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleHotelSearch = async (cityCode: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setFlights([]);
    setHotels([]);
    try {
      const response = await fetch('https://beausejour-backend.vercel.app/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cityCode }),
      });
      if (!response.ok) {
        throw new Error(`Failed to search hotels: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.hotels && Array.isArray(data.hotels)) {
        setHotels(data.hotels);
      } else if (Array.isArray(data)) {
        setHotels(data);
      } else {
        setHotels([]);
      }
    } catch (err) {
      console.error('Hotel search error:', err);
      if (err instanceof Error) {   
        setError(err.message);
      } else {
        setError('Unable to connect to the hotel search service. Please check your connection and try again.');
      }
      setHotels([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-cyan-700 to-cyan-500 relative overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Accueil Section */}
        <section id="accueil" className="min-h-screen flex flex-col items-center justify-center gap-8 pt-20">
          {/* Tabs for switching search type */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors ${searchType === 'flight' ? 'bg-white text-primary shadow' : 'bg-cyan-900 text-cyan-100 hover:bg-cyan-800'}`}
              onClick={() => { setSearchType('flight'); setHasSearched(false); setError(null); }}
            >
              Vols
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold focus:outline-none transition-colors ${searchType === 'hotel' ? 'bg-white text-primary shadow' : 'bg-cyan-900 text-cyan-100 hover:bg-cyan-800'}`}
              onClick={() => { setSearchType('hotel'); setHasSearched(false); setError(null); }}
            >
              Hôtels
            </button>
          </div>
          {!hasSearched && (
            <div className="text-center px-4 max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Welcome to Beausejour Voyage
              </h2>
              <p className="text-lg sm:text-xl text-cyan-100 max-w-2xl mx-auto">
                Discover amazing flight deals and start your journey today. 
                Search from thousands of flights to find the perfect option for your trip.
              </p>
            </div>
          )}

          {/* Search Form */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            {searchType === 'flight' ? (
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            ) : (
              <HotelSearchForm onSubmit={handleHotelSearch} />
            )}
          </div>

          {/* Results */}
          {hasSearched && (
            <div className="flex-1 w-full lg:max-w-none mt-6">
              {isLoading && <div className="text-white text-center p-8">Chargement des résultats...</div>}
              {error && <div className="text-red-500 text-center p-4 bg-white/20 rounded mb-4">{error}</div>}
              {searchType === 'flight' && !isLoading && !error && (
              <Suspense fallback={<div className="text-white text-center p-8">Loading results...</div>}>
                <FlightResults 
                  flights={flights} 
                  isLoading={isLoading} 
                  error={error} 
                />
              </Suspense>
              )}
              {searchType === 'hotel' && !isLoading && !error && (
                <HotelResults hotels={hotels} />
              )}
            </div>
          )}
        </section>

        {/* Rechercher Section */}
        <section id="rechercher" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Rechercher un vol
            </h2>
            <p className="text-lg sm:text-xl text-cyan-100 max-w-2xl mx-auto">
              Utilisez notre moteur de recherche avancé pour trouver les meilleures offres de vols.
            </p>
          </div>
        </section>

        {/* À propos Section */}
        <section id="a-propos" className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              À propos de Beausejour Voyage
            </h2>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <p className="text-lg text-cyan-100 mb-4">
                Beausejour Voyage est votre partenaire de confiance pour tous vos voyages au Maroc et à l'international.
              </p>
              <p className="text-lg text-cyan-100 mb-4">
                Nous vous proposons les meilleures offres de vols avec un service client 100% marocain.
              </p>
              <p className="text-lg text-cyan-100 mb-6">
                Notre expertise et notre réseau de partenaires nous permettent de vous garantir des prix compétitifs et un service de qualité.
              </p>
              <div className="mt-6 border-t border-cyan-100/20 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">Rencontrez notre directeur</h3>
                <div className="flex justify-center items-center gap-4">
                  <a
                    href="https://www.facebook.com/moussab.fatmi.73/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </a>
                  <a
                    href="https://ma.linkedin.com/in/brahim-fatmi-53293b8a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-sky-700 text-white font-bold rounded-lg shadow-md hover:bg-sky-800 transform hover:scale-105 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Contactez-nous
            </h2>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
              <p className="text-lg text-cyan-100 mb-4">
                Notre équipe est à votre disposition pour vous accompagner dans vos projets de voyage.
              </p>
              <div className="space-y-3 text-cyan-100 text-left">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                  <a href="tel:+212699922229" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    <strong>Téléphone:</strong> +212 6 99 92 22 29
                  </a>
                  <a href="tel:+212536707026" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    <strong>Fix:</strong> 05 36 70 70 26
                  </a>
                </div>
                <a href="mailto:contact@beausejourvoyage.com" className="flex items-center justify-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <strong>Email:</strong> contact@beausejourvoyage.com
                </a>
                <p className="text-center"><strong>Service client:</strong> 24h/24 et 7j/7</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;