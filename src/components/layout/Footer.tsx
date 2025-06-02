import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const Footer: React.FC = () => {
  const { isDarkMode } = useAppContext();

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-green-50 text-gray-700'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600" strokeWidth={1.5} />
              <span className="ml-2 text-xl font-bold">Eco-Buddy</span>
            </Link>
            <p className="mt-4 text-sm">
              Your personal guide to sustainable living. Together, we can make a difference for our planet.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600 transition-colors duration-200">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-green-600 transition-colors duration-200">Home</Link></li>
              <li><Link to="/dashboard" className="text-sm hover:text-green-600 transition-colors duration-200">Dashboard</Link></li>
              <li><Link to="/chatbot" className="text-sm hover:text-green-600 transition-colors duration-200">Eco-Assistant</Link></li>
              <li><Link to="/challenges" className="text-sm hover:text-green-600 transition-colors duration-200">Challenges</Link></li>
              <li><Link to="/community" className="text-sm hover:text-green-600 transition-colors duration-200">Community</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources" className="text-sm hover:text-green-600 transition-colors duration-200">Articles</Link></li>
              <li><Link to="/resources" className="text-sm hover:text-green-600 transition-colors duration-200">Videos</Link></li>
              <li><Link to="/local-services" className="text-sm hover:text-green-600 transition-colors duration-200">Local Services</Link></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-200">Partners</a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-200">Cookie Policy</a></li>
              <li><a href="#" className="text-sm hover:text-green-600 transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Eco-Buddy. All rights reserved. Made with <Heart className="inline-block h-4 w-4 text-red-500" /> for the planet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;