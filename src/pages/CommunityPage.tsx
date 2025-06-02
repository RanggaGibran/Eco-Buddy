import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CommunityPost } from '../types';

const CommunityPage: React.FC = () => {
  const { isDarkMode } = useAppContext();

  // Mock community posts data
  const [posts] = useState<CommunityPost[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Green',
      userAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      title: 'My Zero Waste Journey: Week 1',
      content: 'Started my zero waste journey this week! Switched to reusable bags, containers, and a bamboo toothbrush. Small steps, but feeling good about making a difference.',
      likes: 24,
      comments: 8,
      tags: ['zerowaste', 'sustainable', 'ecofriendly'],
      createdAt: new Date('2024-03-10T10:00:00')
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Mike Rivers',
      userAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      title: 'Home Solar Panel Installation Success!',
      content: 'Finally got solar panels installed on my roof! The process was surprisingly smooth, and I\'m already seeing a difference in my energy bills. Happy to answer any questions!',
      likes: 42,
      comments: 15,
      tags: ['solarenergy', 'renewable', 'sustainability'],
      createdAt: new Date('2024-03-09T14:30:00')
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Emma Woods',
      userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      title: 'Community Garden Project Update',
      content: 'Our neighborhood community garden is thriving! We\'ve grown over 100 lbs of organic vegetables this season. Swipe to see our latest harvest! 🌱',
      likes: 35,
      comments: 12,
      tags: ['communitygarden', 'organic', 'localfood'],
      createdAt: new Date('2024-03-08T09:15:00')
    }
  ]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Eco Community</h1>
          <button className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-green-600' : 'bg-green-500'} text-white hover:bg-green-600 transition-colors duration-300`}>
            Create Post
          </button>
        </div>

        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center mb-4">
                {post.userAvatar ? (
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="font-semibold">{post.userName}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {post.createdAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{post.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-300">
                  <Heart size={20} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-300">
                  <MessageSquare size={20} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-300">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;