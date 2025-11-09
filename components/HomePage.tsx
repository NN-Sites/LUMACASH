import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS, EARNING_PER_AD } from '../constants';

interface HomePageProps {
  balance: number;
  handleWatchAd: () => void;
  language: Language;
}

const HomePage: React.FC<HomePageProps> = ({ balance, handleWatchAd, language }) => {
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [showEarnings, setShowEarnings] = useState(false);
  const texts = TEXTS[language];

  const onWatchAdClick = () => {
    setIsWatchingAd(true);
    setTimeout(() => {
      handleWatchAd();
      setIsWatchingAd(false);
      setShowEarnings(true);
      setTimeout(() => setShowEarnings(false), 2000);
    }, 15000); // Simulate 15 second ad
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="mb-8">
        <h2 className="text-lg text-gray-500 dark:text-gray-400">{texts.currentBalance}</h2>
        <p className="text-6xl font-bold text-foreground dark:text-dark-foreground">
          ₪{balance.toFixed(2)}
        </p>
      </div>
      
      <div className="relative w-full max-w-xs">
        <button
          onClick={onWatchAdClick}
          disabled={isWatchingAd}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isWatchingAd ? texts.watchingAd : texts.watchNow}
        </button>
        {showEarnings && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full animate-bounce">
            {texts.adFinished}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;