import React, { useState, lazy, Suspense } from 'react';
import { SearchForm, SearchData } from './components/SearchForm';
import Navigation from './components/Navigation';
import { Facebook, Linkedin, Phone, Mail, Plane, Building2, Users } from 'lucide-react';
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
      const payload: any = {
        origin: searchData.origin,
        destination: searchData.destination,
        date: searchData.date,
        adults: searchData.adults,
      };

      if (searchData.preferredAirlines && searchData.preferredAirlines.length > 0) {
        payload.preferredAirlines = searchData.preferredAirlines;
      }

      if (searchData.stops !== undefined && searchData.stops !== '') {
        if (searchData.stops === '2+') {
          payload.stops = 2; // Map '2+' stops to number 2 (supported by backend filtering >=2)
        } else {
          const parsedStops = parseInt(searchData.stops, 10);
          if (!isNaN(parsedStops)) {
            payload.stops = parsedStops;
          }
        }
      }

      const response = await fetch('https://beausejour-backend.vercel.app/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
      const response = await fetch('https://beausejour-backend.vercel.app/hotel-search', {
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
      } else if (data.data && Array.isArray(data.data)) {
        setHotels(data.data);
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
          <div className="bg-cyan-950/40 p-1.5 rounded-full flex gap-1 mb-6 backdrop-blur-sm border border-cyan-800/30">
            <button
              className={`px-6 py-2.5 rounded-full font-semibold focus:outline-none transition-all duration-300 text-sm sm:text-base flex items-center gap-2 ${searchType === 'flight' ? 'bg-white text-primary shadow-lg scale-105' : 'text-cyan-100 hover:text-white hover:bg-white/5'}`}
              onClick={() => { setSearchType('flight'); setHasSearched(false); setError(null); }}
            >
              <Plane className="w-4 h-4" />
              Vols
            </button>
            <button
              className={`px-6 py-2.5 rounded-full font-semibold focus:outline-none transition-all duration-300 text-sm sm:text-base flex items-center gap-2 ${searchType === 'hotel' ? 'bg-white text-primary shadow-lg scale-105' : 'text-cyan-100 hover:text-white hover:bg-white/5'}`}
              onClick={() => { setSearchType('hotel'); setHasSearched(false); setError(null); }}
            >
              <Building2 className="w-4 h-4" />
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
              <HotelSearchForm onSubmit={handleHotelSearch} isLoading={isLoading} />
            )}
          </div>

          {/* Results */}
          {hasSearched && (
            <div className="flex-1 w-full lg:max-w-none mt-6">
              {searchType === 'flight' && (
                <Suspense fallback={<div className="text-white text-center p-8">Loading results...</div>}>
                  <FlightResults 
                    flights={flights} 
                    isLoading={isLoading} 
                    error={error} 
                  />
                </Suspense>
              )}
              {searchType === 'hotel' && (
                <HotelResults 
                  hotels={hotels} 
                  isLoading={isLoading} 
                  error={error} 
                />
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
        <section id="a-propos" className="min-h-screen flex items-center justify-center relative py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                À propos de Beausejour Voyage
              </h2>
              <div className="w-24 h-1 bg-cyan-400 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl hover:bg-white/15 transition-all duration-300">
                <p className="text-lg text-cyan-50 mb-4 leading-relaxed">
                  <strong className="text-white text-xl">Beausejour Voyage</strong> est votre partenaire de confiance pour tous vos voyages au Maroc et à l'international.
                </p>
                <p className="text-lg text-cyan-50 mb-4 leading-relaxed">
                  Nous vous proposons les meilleures offres de vols avec un service client 100% marocain, axé sur la qualité et la satisfaction.
                </p>
                <p className="text-lg text-cyan-50 leading-relaxed">
                  Notre expertise et notre réseau de partenaires nous permettent de vous garantir des prix compétitifs et un accompagnement de classe mondiale.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-900/80 to-primary/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Direction</h3>
                <p className="text-cyan-100 mb-8">Découvrez l'équipe dirigeante derrière notre succès.</p>
                
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="https://www.facebook.com/moussab.fatmi.73/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <Facebook className="w-5 h-5 mr-2" />
                    Facebook
                  </a>
                  <a
                    href="https://ma.linkedin.com/in/brahim-fatmi-53293b8a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-[#0A66C2] hover:bg-[#0958a8] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
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
        <section id="contact" className="min-h-screen flex items-center justify-center relative py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Contactez-nous
              </h2>
              <div className="w-24 h-1 bg-cyan-400 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-cyan-100">
                Notre équipe est à votre disposition 24h/24 et 7j/7 pour vous accompagner dans vos projets.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <a href="tel:+212699922229" className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 shadow-xl group">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/50 transition-colors">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Téléphone</h3>
                <p className="text-cyan-100">+212 6 99 92 22 29</p>
              </a>
              
              <a href="tel:+212536707026" className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 shadow-xl group">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/50 transition-colors">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Fixe</h3>
                <p className="text-cyan-100">05 36 70 70 26</p>
              </a>

              <a href="mailto:contact@beausejourvoyage.com" className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center hover:bg-white/20 transform hover:-translate-y-2 transition-all duration-300 shadow-xl group">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/50 transition-colors">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-cyan-100 text-sm break-words">contact@beausejourvoyage.com</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;