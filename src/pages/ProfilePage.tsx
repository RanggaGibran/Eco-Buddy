import React, { useState } from 'react';
import { User, Settings, Award, BarChart2, Calendar, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { isDarkMode, userStats, activeChallenges } = useAppContext();
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'settings'>('overview');

  const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: new Date('2024-01-15'),
    bio: 'Passionate about sustainable living and making a positive impact on the environment.',
    location: 'San Francisco, CA',
    achievements: [
      { id: '1', title: 'Early Adopter', description: 'Joined Eco-Buddy in the first month', icon: '🌱' },
      { id: '2', title: 'Challenge Champion', description: 'Completed 10 eco-challenges', icon: '🏆' },
      { id: '3', title: 'Carbon Reducer', description: 'Reduced carbon footprint by 25%', icon: '🌍' },
    ]
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className={`p-8 rounded-lg shadow-md mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
              <User className="w-12 h-12 text-green-600" />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold">{userProfile.name}</h1>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{userProfile.email}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Member since {userProfile.joinDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <p className="mt-4">{userProfile.bio}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-green-500 text-green-600'
                : isDarkMode
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'challenges'
                ? 'border-b-2 border-green-500 text-green-600'
                : isDarkMode
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'settings'
                ? 'border-b-2 border-green-500 text-green-600'
                : isDarkMode
                ? 'text-gray-400'
                : 'text-gray-500'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stats */}
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart2 className="w-5 h-5 text-green-600 mr-2" />
                    <span>Sustainability Score</span>
                  </div>
                  <span className="font-semibold">{userStats.sustainabilityScore}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    <span>Completed Challenges</span>
                  </div>
                  <span className="font-semibold">{userStats.completedChallenges}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-green-600 mr-2" />
                    <span>Current Streak</span>
                  </div>
                  <span className="font-semibold">{userStats.streak} days</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <div className="space-y-4">
                {userProfile.achievements.map(achievement => (
                  <div key={achievement.id} className="flex items-start">
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div>
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Active Challenges</h2>
            {activeChallenges.length > 0 ? (
              <div className="space-y-4">
                {activeChallenges.map(challenge => (
                  <div
                    key={challenge.id}
                    className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{challenge.title}</h3>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span className="text-sm">{challenge.duration} days left</span>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-600">
                            Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block">
                            {challenge.progress || 0}%
                          </span>
                        </div>
                      </div>
                      <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <div
                          style={{ width: `${challenge.progress || 0}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No active challenges. Join a challenge to get started!</p>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={userProfile.name}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={userProfile.email}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  defaultValue={userProfile.location}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  defaultValue={userProfile.bio}
                  rows={4}
                  className={`w-full px-3 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  } border`}
                />
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;