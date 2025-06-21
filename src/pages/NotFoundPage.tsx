import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Frown } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-cyan-700 to-cyan-500 flex flex-col items-center justify-center text-white p-4">
      <div className="text-center bg-white/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-xl border border-white/20">
        <Frown className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 text-cyan-200" />
        <h1 className="text-5xl sm:text-7xl font-bold mb-2">404</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Page non trouvée</h2>
        <p className="text-cyan-100 max-w-sm mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-bold rounded-lg shadow-md hover:bg-cyan-50 transform hover:scale-105 transition-all duration-300"
        >
          <Home className="w-5 h-5 mr-2" />
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 