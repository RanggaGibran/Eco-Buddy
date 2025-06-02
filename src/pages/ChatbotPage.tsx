import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageSquare, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ChatMessage } from '../types';

const ChatbotPage: React.FC = () => {
  const { isDarkMode, ecoActions } = useAppContext();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm your Eco-Assistant. How can I help you with sustainable living today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle sending messages
  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate response (in a real app, this would be an API call)
    setTimeout(() => {
      generateResponse(input);
      setIsTyping(false);
    }, 1500);
  };

  // Generate bot response based on user input
  const generateResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    let response = '';
    
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      response = "Hello! I'm happy to help with any sustainability questions you have today.";
    } else if (lowerInput.includes('carbon') || lowerInput.includes('footprint')) {
      response = "Your carbon footprint is the total amount of greenhouse gases you produce. The average person produces about 12 tons per year. Some ways to reduce it include: using public transportation, reducing meat consumption, and using energy-efficient appliances.";
    } else if (lowerInput.includes('water') || lowerInput.includes('save water')) {
      response = "Great question about water conservation! You can save water by taking shorter showers, fixing leaky faucets, installing low-flow fixtures, and collecting rainwater for your garden.";
    } else if (lowerInput.includes('plastic') || lowerInput.includes('recycle')) {
      response = "Reducing plastic use is crucial for the environment. Try using reusable bags, water bottles, and containers. For plastics you do use, check local recycling guidelines as they vary by location.";
    } else if (lowerInput.includes('energy') || lowerInput.includes('electricity')) {
      response = "To reduce energy usage, consider: switching to LED bulbs, unplugging electronics when not in use, using a programmable thermostat, and washing clothes in cold water.";
    } else if (lowerInput.includes('food') || lowerInput.includes('diet')) {
      response = "Your diet has a significant environmental impact. Consider eating more plant-based meals, buying local and seasonal produce, reducing food waste, and composting organic waste.";
    } else if (lowerInput.includes('transport') || lowerInput.includes('car') || lowerInput.includes('travel')) {
      response = "Transportation is a major source of emissions. Consider walking, cycling, carpooling, using public transit, or switching to an electric vehicle if possible.";
    } else if (lowerInput.includes('tip') || lowerInput.includes('advice')) {
      // Return a random eco action as advice
      const randomAction = ecoActions[Math.floor(Math.random() * ecoActions.length)];
      response = `Here's a sustainable tip: ${randomAction.title} - ${randomAction.description} This can reduce your carbon footprint by approximately ${randomAction.impact.carbon} tons CO₂.`;
    } else {
      response = "I'm here to help with sustainable living questions. You can ask about reducing your carbon footprint, saving water, recycling, energy conservation, sustainable diet, or eco-friendly transportation. Or ask for a random eco tip!";
    }
    
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-64px)]">
        <div className="flex items-center mb-6">
          <MessageSquare className="text-green-600 mr-2" size={28} />
          <h1 className="text-2xl font-bold">Eco-Assistant</h1>
        </div>
        
        {/* Chat messages container */}
        <div className={`flex-grow overflow-y-auto p-4 rounded-lg shadow-md mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === 'user' ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'
              }`}
            >
              <div className="flex items-start">
                {message.sender === 'bot' && (
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 flex-shrink-0">
                    <MessageSquare size={16} />
                  </div>
                )}
                
                <div
                  className={`py-2 px-4 rounded-lg ${
                    message.sender === 'user'
                      ? isDarkMode
                        ? 'bg-green-700 text-white'
                        : 'bg-green-600 text-white'
                      : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="flex justify-end mt-1 opacity-70">
                    <span className="text-xs">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
                
                {message.sender === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 ml-2 flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>
              
              {message.sender === 'bot' && (
                <div className="flex items-center space-x-2 mt-1 ml-10">
                  <button className="text-gray-500 hover:text-green-600 transition-colors" aria-label="Helpful">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="text-gray-500 hover:text-red-600 transition-colors" aria-label="Not helpful">
                    <ThumbsDown size={14} />
                  </button>
                  <button
                    onClick={() => copyToClipboard(message.content, message.id)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    {copiedId === message.id ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start mb-4 mr-auto max-w-[80%]">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2 flex-shrink-0">
                <MessageSquare size={16} />
              </div>
              <div className={`py-2 px-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about sustainable living..."
              className={`flex-grow p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
              }`}
              rows={2}
            />
            <button
              onClick={handleSend}
              disabled={input.trim() === ''}
              className={`ml-2 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 ${
                input.trim() === ''
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Ask me anything about sustainable living, reducing your environmental impact, or eco-friendly habits!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;