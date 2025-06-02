import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Award, BarChart2, Calendar, Clock, Camera, MapPin, Mail, Edit2, Save, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useUser } from '../hooks/useSupabase';
import { supabase } from '../lib/supabase';

const ProfilePage: React.FC = () => {
  const { isDarkMode, user: authUser, signOut } = useAppContext();
  const { user: profile, loading } = useUser(authUser?.id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    avatar_url: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/auth');
    }
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        location: profile.location || '',
        avatar_url: profile.avatar_url || ''
      });
    }
  }, [authUser, profile, navigate]);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: formData.name,
          bio: formData.bio,
          location: formData.location,
          avatar_url: formData.avatar_url
        })
        .eq('id', authUser?.id);

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header with Cover Image */}
        <div className={`relative rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
          
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-100">
                  {formData.avatar_url ? (
                    <img
                      src={formData.avatar_url}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center"
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center"
                  >
                    <Edit2 size={16} className="mr-2" />
                    Edit Profile
                  </button>
                  <button
                    onClick={signOut}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>

            {/* Profile Info */}
            <div className="mt-8">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      } border focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      } border focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`w-full px-3 py-2 rounded-lg ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      } border focus:ring-2 focus:ring-green-500`}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold">{profile?.name}</h1>
                  {profile?.bio && (
                    <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {profile.bio}
                    </p>
                  )}
                  <div className="flex items-center mt-4 space-x-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{profile?.email}</span>
                    </div>
                    {profile?.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Sustainability Score</h2>
              <div className="p-2 rounded-full bg-green-100 text-green-600">
                <BarChart2 size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-4xl font-bold">{profile?.sustainability_score}</div>
              <div className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Points earned
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${(profile?.sustainability_score || 0) / 100 * 100}%` }}
              ></div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Challenges</h2>
              <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                <Award size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-4xl font-bold">{profile?.completed_challenges}</div>
              <div className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Completed
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Current Streak</h2>
              <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                <Calendar size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-4xl font-bold">{profile?.streak}</div>
              <div className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Days
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium">Completed "Zero Waste Week" Challenge</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      2 days ago
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;