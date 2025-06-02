import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Droplet, Wind, Zap, Trash2, Award, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const { userStats, ecoActions, ecoTips, activeChallenges, challenges } = useAppContext();
  const { isDarkMode } = useAppContext();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  // Progress chart data (mock data for visualization)
  const chartData = {
    day: [65, 67, 64, 66, 68, 70, 72],
    week: [60, 62, 65, 63, 67, 65, 70],
    month: [50, 55, 58, 60, 63, 65, 70],
    year: [30, 35, 40, 45, 55, 60, 70]
  };

  // Recommended actions based on user stats
  const recommendedActions = ecoActions
    .filter(action => {
      if (userStats.carbonFootprint > 10 && action.impact.carbon > 0.5) return true;
      if (userStats.waterUsage > 300 && action.impact.water > 30) return true;
      if (userStats.wasteReduction < 20 && action.impact.waste > 0.3) return true;
      if (userStats.energySaved < 250 && action.impact.energy > 50) return true;
      return false;
    })
    .slice(0, 3);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Sustainability Dashboard</h1>

        {/* Main Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className={`lg:col-span-3 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Sustainability Score</h2>
              <div className="flex space-x-2">
                {(['day', 'week', 'month', 'year'] as const).map(period => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 text-sm rounded-full ${
                      selectedPeriod === period
                        ? 'bg-green-600 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative h-60 mb-4">
              {/* Chart visualization */}
              <div className="absolute bottom-0 left-0 right-0 h-full flex items-end">
                {chartData[selectedPeriod].map((value, index) => (
                  <div 
                    key={index} 
                    className="relative flex-1 mx-1"
                    style={{ height: `${value}%` }}
                  >
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-sm"
                      style={{ height: `${value}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-200 dark:border-gray-700">
                {selectedPeriod === 'day' && (
                  <>
                    <span>Morning</span>
                    <span>Noon</span>
                    <span>Afternoon</span>
                    <span>Evening</span>
                    <span>Night</span>
                  </>
                )}
                {selectedPeriod === 'week' && (
                  <>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </>
                )}
                {selectedPeriod === 'month' && (
                  <>
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </>
                )}
                {selectedPeriod === 'year' && (
                  <>
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full dark:bg-green-900 dark:text-green-200">
                <BarChart2 size={18} className="mr-2" />
                <span className="text-xl font-bold">{userStats.sustainabilityScore}</span>
                <span className="ml-1 text-sm">/ 100</span>
              </div>
              <p className="mt-2 text-sm">
                Your sustainability score has increased by 5 points this {selectedPeriod}!
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-3 dark:bg-blue-900 dark:text-blue-200">
                  <Droplet size={24} />
                </div>
                <span className="text-lg font-semibold">Water Saved</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">{userStats.waterUsage}</span>
                  <span className="ml-1 text-sm">gallons</span>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-gray-100 text-gray-600 mb-3 dark:bg-gray-700 dark:text-gray-200">
                  <Wind size={24} />
                </div>
                <span className="text-lg font-semibold">Carbon Footprint</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">{userStats.carbonFootprint}</span>
                  <span className="ml-1 text-sm">tons CO₂</span>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mb-3 dark:bg-yellow-900 dark:text-yellow-200">
                  <Zap size={24} />
                </div>
                <span className="text-lg font-semibold">Energy Saved</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">{userStats.energySaved}</span>
                  <span className="ml-1 text-sm">kWh</span>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mb-3 dark:bg-green-900 dark:text-green-200">
                  <Trash2 size={24} />
                </div>
                <span className="text-lg font-semibold">Waste Reduced</span>
                <div className="flex items-baseline mt-1">
                  <span className="text-2xl font-bold">{userStats.wasteReduction}</span>
                  <span className="ml-1 text-sm">lbs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Active Challenges */}
        <div className={`p-6 rounded-lg shadow-md mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Active Challenges</h2>
            <Link to="/challenges" className="text-green-600 hover:text-green-500 flex items-center">
              <span>View all challenges</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          {activeChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeChallenges.map(challenge => (
                <div 
                  key={challenge.id} 
                  className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}
                >
                  <div className="flex items-start">
                    <div className="p-2 rounded-md bg-green-100 text-green-600 mr-4 dark:bg-green-900 dark:text-green-200">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">{challenge.title}</h3>
                      <div className="flex items-center text-sm mt-1">
                        <Calendar size={14} className="mr-1" />
                        <span>{challenge.duration} days</span>
                        <Clock size={14} className="ml-3 mr-1" />
                        <span>{challenge.points} points</span>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{challenge.progress || 0}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          <div 
                            className="h-full rounded-full bg-green-500"
                            style={{ width: `${challenge.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="mb-4">You don't have any active challenges yet.</p>
              <Link 
                to="/challenges" 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
              >
                Find a Challenge
              </Link>
            </div>
          )}
        </div>
        
        {/* Recommended Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className={`lg:col-span-2 p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recommended Actions</h2>
              <Link to="/chatbot" className="text-green-600 hover:text-green-500 flex items-center">
                <span>Get more recommendations</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {recommendedActions.map(action => (
                <div 
                  key={action.id} 
                  className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex">
                    {action.imageUrl && (
                      <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                        <img 
                          src={action.imageUrl} 
                          alt={action.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {action.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {action.impact.carbon > 0 && (
                          <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            Carbon: -{action.impact.carbon} tons
                          </span>
                        )}
                        {action.impact.water > 0 && (
                          <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            Water: -{action.impact.water} gal
                          </span>
                        )}
                        {action.impact.energy > 0 && (
                          <span className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            Energy: -{action.impact.energy} kWh
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Eco Tip of the Day</h2>
            
            <div className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-green-100 bg-green-50'}`}>
              <h3 className="font-medium text-green-700 dark:text-green-300">{ecoTips[0].title}</h3>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {ecoTips[0].content}
              </p>
              
              {ecoTips[0].source && (
                <p className="mt-2 text-xs text-gray-500">
                  Source: {ecoTips[0].source}
                </p>
              )}
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">Suggested Challenge</h3>
              <div 
                className={`p-4 rounded-lg border ${isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex items-start">
                  <div className="p-2 rounded-md bg-green-100 text-green-600 mr-4 dark:bg-green-900 dark:text-green-200">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{challenges[0].title}</h4>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {challenges[0].description}
                    </p>
                    <div className="flex items-center text-sm mt-2">
                      <Calendar size={14} className="mr-1" />
                      <span>{challenges[0].duration} days</span>
                      <Clock size={14} className="ml-3 mr-1" />
                      <span>{challenges[0].points} points</span>
                    </div>
                    <Link 
                      to="/challenges" 
                      className="mt-3 inline-block px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
                    >
                      Start Challenge
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;