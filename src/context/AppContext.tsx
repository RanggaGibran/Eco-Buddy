import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { EcoAction, EcoTip, Challenge, UserStats } from '../types';
import { mockEcoActions, mockEcoTips, mockChallenges } from '../data/mockData';

interface AppContextType {
  userStats: UserStats;
  ecoActions: EcoAction[];
  ecoTips: EcoTip[];
  challenges: Challenge[];
  activeChallenges: Challenge[];
  updateUserStats: (stats: Partial<UserStats>) => void;
  joinChallenge: (challengeId: string) => void;
  completeChallenge: (challengeId: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: any | null;
  signOut: () => Promise<void>;
}

const defaultUserStats: UserStats = {
  carbonFootprint: 12.5,
  waterUsage: 320,
  wasteReduction: 15,
  energySaved: 230,
  sustainabilityScore: 65,
  completedChallenges: 0,
  streak: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userStats, setUserStats] = useState<UserStats>(defaultUserStats);
  const [ecoActions, setEcoActions] = useState<EcoAction[]>(mockEcoActions);
  const [ecoTips, setEcoTips] = useState<EcoTip[]>(mockEcoTips);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current auth status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const updateUserStats = (stats: Partial<UserStats>) => {
    setUserStats(prev => ({
      ...prev,
      ...stats,
    }));
  };

  const joinChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge && !activeChallenges.some(c => c.id === challengeId)) {
      setActiveChallenges(prev => [...prev, { ...challenge, progress: 0 }]);
    }
  };

  const completeChallenge = (challengeId: string) => {
    setActiveChallenges(prev => prev.filter(c => c.id !== challengeId));
    updateUserStats({
      completedChallenges: userStats.completedChallenges + 1,
      streak: userStats.streak + 1,
      sustainabilityScore: userStats.sustainabilityScore + 5,
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        userStats,
        ecoActions,
        ecoTips,
        challenges,
        activeChallenges,
        updateUserStats,
        joinChallenge,
        completeChallenge,
        isDarkMode,
        toggleDarkMode,
        user,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};