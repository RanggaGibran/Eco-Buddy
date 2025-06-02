import React, { useState } from 'react';
import { Award, Calendar, Clock, Filter, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Challenge } from '../types';

const ChallengesPage: React.FC = () => {
  const { challenges, joinChallenge, activeChallenges, isDarkMode } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(challenges.map(challenge => challenge.category))];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isActiveChallengeById = (id: string) => {
    return activeChallenges.some(challenge => challenge.id === id);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Eco Challenges</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Join challenges to develop sustainable habits and earn rewards
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                } border focus:ring-2 focus:ring-green-500 focus:border-transparent`}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-lg appearance-none ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300'
                } border focus:ring-2 focus:ring-green-500 focus:border-transparent`}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              className={`rounded-lg shadow-md overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              {challenge.imageUrl && (
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                    <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {challenge.description}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-green-100'
                  }`}>
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm">{challenge.duration} days</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm">{challenge.points} points</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {challenge.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 ${
                        isDarkMode ? 'bg-gray-700 text-white' : 'bg-green-100 text-green-800'
                      }`}>
                        {index + 1}
                      </span>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => joinChallenge(challenge.id)}
                  disabled={isActiveChallengeById(challenge.id)}
                  className={`w-full py-2 rounded-md transition-colors duration-300 ${
                    isActiveChallengeById(challenge.id)
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isActiveChallengeById(challenge.id) ? 'Challenge Joined' : 'Join Challenge'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;