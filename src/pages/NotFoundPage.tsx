import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const NotFoundPage: React.FC = () => {
  const { isDarkMode } = useAppContext();

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="text-center p-8">
        <div className="flex justify-center mb-4">
          <Leaf className="h-20 w-20 text-green-600" strokeWidth={1.5} />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="mb-8 max-w-md mx-auto">
          The page you're looking for has returned to nature. Let's get you back on the sustainable path.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;