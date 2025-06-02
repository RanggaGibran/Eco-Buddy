import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MessageCircle, Award, BookOpen, MapPin, BarChart2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { isDarkMode } = useAppContext();

  const features = [
    {
      icon: <BarChart2 size={24} className="text-green-600" />,
      title: 'Personal Dashboard',
      description: 'Track your ecological footprint and monitor your progress over time.',
      link: '/dashboard'
    },
    {
      icon: <MessageCircle size={24} className="text-green-600" />,
      title: 'Eco-Assistant',
      description: 'Get personalized recommendations and answers to your environmental questions.',
      link: '/chatbot'
    },
    {
      icon: <Award size={24} className="text-green-600" />,
      title: 'Weekly Challenges',
      description: 'Join fun challenges to develop sustainable habits and earn rewards.',
      link: '/challenges'
    },
    {
      icon: <BookOpen size={24} className="text-green-600" />,
      title: 'Resources Hub',
      description: 'Access educational articles, videos, and guides about sustainable living.',
      link: '/resources'
    },
    {
      icon: <MapPin size={24} className="text-green-600" />,
      title: 'Local Services',
      description: 'Discover eco-friendly businesses and services in your area.',
      link: '/local-services'
    },
    {
      icon: <Leaf size={24} className="text-green-600" />,
      title: 'Community',
      description: 'Connect with like-minded individuals and share sustainable tips.',
      link: '/community'
    }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-500 opacity-90"></div>
        <div 
          className="relative h-screen bg-cover bg-center flex items-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg')" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Personal Guide to<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-green-300">
                Sustainable Living
              </span>
            </h1>
            <p className="mt-6 text-xl text-white max-w-2xl">
              Join thousands of people reducing their environmental impact with personalized recommendations, challenges, and a supportive community.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
              <Link to="/dashboard" className="px-8 py-3 bg-white text-green-700 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                Get Started
              </Link>
              <Link to="/chatbot" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-green-700 transition duration-300 transform hover:scale-105">
                Ask Eco-Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Eco-Buddy Helps You</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Our platform provides everything you need to reduce your environmental impact and live more sustainably.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link}
                className={`p-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-green-50'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Impact Together</h2>
            <p className="text-xl max-w-3xl mx-auto">
              See how our community is making a difference for the planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
              <p className="text-4xl font-bold text-green-600">15,000+</p>
              <p className="mt-2">Active Users</p>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
              <p className="text-4xl font-bold text-green-600">2,500</p>
              <p className="mt-2">Tons of CO₂ Saved</p>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
              <p className="text-4xl font-bold text-green-600">1.2M</p>
              <p className="mt-2">Gallons of Water Conserved</p>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-green-50'}`}>
              <p className="text-4xl font-bold text-green-600">350K</p>
              <p className="mt-2">Sustainable Actions Taken</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-green-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Hear from people who have transformed their lifestyle with Eco-Buddy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <p className="text-lg italic mb-4">
                "Eco-Buddy has completely changed how I think about my daily choices. The personalized recommendations are spot-on!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-xl">
                  SM
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Sarah M.</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>User for 8 months</p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <p className="text-lg italic mb-4">
                "The weekly challenges keep me motivated, and I've reduced my carbon footprint by 40% in just 3 months!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl">
                  JT
                </div>
                <div className="ml-4">
                  <p className="font-semibold">James T.</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>User for 5 months</p>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <p className="text-lg italic mb-4">
                "I love the community aspect. Sharing ideas with like-minded people has been incredibly inspiring."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-yellow-200 flex items-center justify-center text-yellow-700 font-bold text-xl">
                  AL
                </div>
                <div className="ml-4">
                  <p className="font-semibold">Amina L.</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>User for 1 year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Sustainable Journey?</h2>
          <p className="text-xl text-white mb-10 max-w-3xl mx-auto">
            Join Eco-Buddy today and take the first step towards a more sustainable lifestyle.
          </p>
          <Link to="/dashboard" className="px-8 py-3 bg-white text-green-700 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;