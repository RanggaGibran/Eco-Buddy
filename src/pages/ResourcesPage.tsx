import React, { useState } from 'react';
import { Book, Video, FileText, Search, Filter, ExternalLink } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Resource } from '../types';

const ResourcesPage: React.FC = () => {
  const { isDarkMode } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock resources data
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Understanding Carbon Footprint',
      description: 'A comprehensive guide to understanding and calculating your carbon footprint, with practical tips for reduction.',
      type: 'article',
      category: 'climate',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg'
    },
    {
      id: '2',
      title: 'Zero Waste Living: Beginner\'s Guide',
      description: 'Learn the basics of zero waste living and how to implement sustainable practices in your daily life.',
      type: 'guide',
      category: 'lifestyle',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/5725001/pexels-photo-5725001.jpeg'
    },
    {
      id: '3',
      title: 'Sustainable Energy Solutions',
      description: 'Explore different renewable energy options and their impact on environmental conservation.',
      type: 'video',
      category: 'energy',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg'
    },
    {
      id: '4',
      title: 'Composting 101',
      description: 'A step-by-step guide to starting and maintaining a successful composting system at home.',
      type: 'infographic',
      category: 'waste',
      url: '#',
      imageUrl: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg'
    }
  ];

  const types = ['all', ...new Set(resources.map(resource => resource.type))];
  const categories = ['all', ...new Set(resources.map(resource => resource.category))];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'guide':
      case 'infographic':
        return <Book className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resources</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Educational materials to support your sustainable lifestyle
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search resources..."
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
          
          <div className="flex gap-4">
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg appearance-none ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-300'
                } border`}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div
              key={resource.id}
              className={`rounded-lg shadow-md overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {resource.imageUrl && (
                <div className="relative h-48">
                  <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    {resource.type}
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold">{resource.title}</h3>
                  <div className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-green-100'
                  }`}>
                    {getTypeIcon(resource.type)}
                  </div>
                </div>

                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    {resource.category}
                  </span>
                  
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-600 hover:text-green-500"
                  >
                    <span className="mr-1">View</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;