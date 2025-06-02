import React, { useState } from 'react';
import { MapPin, Phone, Globe, Star, Search, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { LocalService } from '../types';

const LocalServicesPage: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock local services data
  const services: LocalService[] = [
    {
      id: '1',
      name: 'Green Market Co-op',
      category: 'grocery',
      description: 'Local organic grocery store offering package-free shopping and locally sourced produce.',
      address: '123 Eco Street, Green City',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      rating: 4.8,
      website: 'https://example.com',
      phone: '+1 234-567-8900'
    },
    {
      id: '2',
      name: 'Sustainable Solutions',
      category: 'home',
      description: 'Professional energy auditing and solar panel installation services.',
      address: '456 Solar Avenue, Green City',
      coordinates: { lat: 40.7129, lng: -74.0061 },
      rating: 4.6,
      website: 'https://example.com',
      phone: '+1 234-567-8901'
    },
    {
      id: '3',
      name: 'EcoCycle Center',
      category: 'recycling',
      description: 'Comprehensive recycling center accepting electronics, hazardous waste, and hard-to-recycle items.',
      address: '789 Recycle Road, Green City',
      coordinates: { lat: 40.7130, lng: -74.0062 },
      rating: 4.7,
      website: 'https://example.com',
      phone: '+1 234-567-8902'
    },
    {
      id: '4',
      name: 'Green Transport Rentals',
      category: 'transport',
      description: 'Electric vehicle and bicycle rentals for eco-friendly transportation.',
      address: '321 Mobile Street, Green City',
      coordinates: { lat: 40.7131, lng: -74.0063 },
      rating: 4.5,
      website: 'https://example.com',
      phone: '+1 234-567-8903'
    }
  ];

  const categories = ['all', ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Local Eco-Services</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover sustainable businesses and services in your area
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-300'
              } border`}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`pl-10 pr-4 py-2 rounded-lg appearance-none ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-300'
              } border`}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  isDarkMode ? 'bg-gray-700' : 'bg-green-100'
                }`}>
                  {service.category}
                </span>
              </div>

              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {service.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{service.address}</span>
                </div>

                {service.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    <a 
                      href={`tel:${service.phone}`}
                      className="text-green-600 hover:text-green-500"
                    >
                      {service.phone}
                    </a>
                  </div>
                )}

                {service.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-2" />
                    <a 
                      href={service.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-500"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(service.rating)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {service.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalServicesPage;