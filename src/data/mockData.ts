import { EcoAction, EcoTip, Challenge } from '../types';

export const mockEcoActions: EcoAction[] = [
  {
    id: '1',
    title: 'Switch to LED Bulbs',
    description: 'Replace your traditional incandescent bulbs with energy-efficient LED bulbs.',
    impact: {
      carbon: 0.3,
      water: 0,
      waste: 0,
      energy: 75
    },
    difficulty: 'easy',
    category: 'energy',
    imageUrl: 'https://images.pexels.com/photos/3049372/pexels-photo-3049372.jpeg'
  },
  {
    id: '2',
    title: 'Use Reusable Shopping Bags',
    description: 'Switch to reusable shopping bags instead of single-use plastic bags.',
    impact: {
      carbon: 0.1,
      water: 0,
      waste: 0.5,
      energy: 10
    },
    difficulty: 'easy',
    category: 'shopping',
    imageUrl: 'https://images.pexels.com/photos/5624999/pexels-photo-5624999.jpeg'
  },
  {
    id: '3',
    title: 'Take Shorter Showers',
    description: 'Reduce your shower time by 2 minutes to save water and energy.',
    impact: {
      carbon: 0.2,
      water: 40,
      waste: 0,
      energy: 25
    },
    difficulty: 'medium',
    category: 'home',
    imageUrl: 'https://images.pexels.com/photos/7587620/pexels-photo-7587620.jpeg'
  },
  {
    id: '4',
    title: 'Eat Less Meat',
    description: 'Reduce meat consumption by having one vegetarian day per week.',
    impact: {
      carbon: 0.8,
      water: 15,
      waste: 0.1,
      energy: 5
    },
    difficulty: 'medium',
    category: 'food',
    imageUrl: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg'
  },
  {
    id: '5',
    title: 'Bike to Work',
    description: 'Use a bicycle for commuting instead of driving when possible.',
    impact: {
      carbon: 1.5,
      water: 0,
      waste: 0,
      energy: 100
    },
    difficulty: 'hard',
    category: 'transport',
    imageUrl: 'https://images.pexels.com/photos/3370159/pexels-photo-3370159.jpeg'
  },
  {
    id: '6',
    title: 'Install a Low-Flow Showerhead',
    description: 'Replace your current showerhead with a low-flow version to save water.',
    impact: {
      carbon: 0.3,
      water: 60,
      waste: 0,
      energy: 30
    },
    difficulty: 'easy',
    category: 'home',
    imageUrl: 'https://images.pexels.com/photos/1625884/pexels-photo-1625884.jpeg'
  }
];

export const mockEcoTips: EcoTip[] = [
  {
    id: '1',
    title: 'Unplug Electronics When Not in Use',
    content: 'Many electronics use power even when turned off. Unplug them to save energy.',
    category: 'energy',
    source: 'Energy Saving Trust'
  },
  {
    id: '2',
    title: 'Use Cold Water for Laundry',
    content: 'Washing clothes in cold water saves energy and can be just as effective.',
    category: 'home',
    source: 'EPA'
  },
  {
    id: '3',
    title: 'Bring Your Own Container',
    content: 'Bring reusable containers to restaurants for leftovers to reduce waste.',
    category: 'food',
    source: 'Zero Waste Alliance'
  },
  {
    id: '4',
    title: 'Fix Leaky Faucets',
    content: 'A dripping faucet can waste up to 3,000 gallons of water per year.',
    category: 'home',
    source: 'Water.org'
  },
  {
    id: '5',
    title: 'Plant Native Species',
    content: 'Native plants require less water and maintenance than non-native species.',
    category: 'gardening',
    source: 'National Wildlife Federation'
  }
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Plastic-Free Week',
    description: 'Avoid single-use plastics for one week.',
    duration: 7,
    points: 50,
    category: 'waste',
    steps: [
      'Replace plastic water bottles with a reusable bottle',
      'Use cloth bags for shopping',
      'Avoid products with plastic packaging',
      'Use bamboo toothbrush instead of plastic',
      'Choose cardboard or glass packaging over plastic'
    ],
    imageUrl: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg'
  },
  {
    id: '2',
    title: 'Meatless Monday',
    description: 'Eat vegetarian meals every Monday for a month.',
    duration: 30,
    points: 40,
    category: 'food',
    steps: [
      'Plan vegetarian meals in advance',
      'Try new plant-based protein sources',
      'Share vegetarian recipes with friends',
      'Track your carbon footprint reduction'
    ],
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'
  },
  {
    id: '3',
    title: 'Home Energy Audit',
    description: 'Identify and fix energy waste in your home.',
    duration: 14,
    points: 60,
    category: 'energy',
    steps: [
      'Check for air leaks around doors and windows',
      'Inspect insulation in attic and walls',
      'Evaluate lighting efficiency',
      'Check appliance energy usage',
      'Make a list of improvements to implement'
    ],
    imageUrl: 'https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg'
  },
  {
    id: '4',
    title: 'Zero-Waste Shopping',
    description: 'Practice zero-waste shopping habits for two weeks.',
    duration: 14,
    points: 45,
    category: 'shopping',
    steps: [
      'Bring reusable bags and containers',
      'Shop at farmers markets or bulk stores',
      'Avoid packaged products',
      'Make a shopping list to prevent food waste',
      'Choose products with minimal or recyclable packaging'
    ],
    imageUrl: 'https://images.pexels.com/photos/8091469/pexels-photo-8091469.jpeg'
  }
];