import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import WithdrawPage from './components/WithdrawPage';
import SettingsPage from './components/SettingsPage';
import BottomNav from './components/BottomNav';
import { Theme, Language, Page } from './types';
import { EARNING_PER_AD } from './constants';

function App() {
  const [balance, setBalance] = useState(0.0);
  const [paypalEmail, setPaypalEmail] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('he');
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleWatchAd = () => {
    setBalance(prev => prev + EARNING_PER_AD);
  };

  const handleWithdraw = () => {
    // In a real app, this would trigger an API call
    console.log(`Withdrawing ${balance} to ${paypalEmail}`);
    setBalance(0);
    setPaypalEmail('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage balance={balance} handleWatchAd={handleWatchAd} language={language} />;
      case 'withdraw':
        return <WithdrawPage balance={balance} paypalEmail={paypalEmail} setPaypalEmail={setPaypalEmail} handleWithdraw={handleWithdraw} language={language} />;
      case 'settings':
        return <SettingsPage theme={theme} setTheme={setTheme} language={language} setLanguage={setLanguage} />;
      default:
        return <HomePage balance={balance} handleWatchAd={handleWatchAd} language={language} />;
    }
  };

  return (
    <div dir={language === 'he' ? 'rtl' : 'ltr'} className="bg-background dark:bg-dark-background h-screen overflow-hidden font-sans">
      <div className="relative h-full pb-16 max-w-lg mx-auto">
        <main className="pt-8 h-full">
          {renderPage()}
        </main>
        <BottomNav currentPage={currentPage} setCurrentPage={setCurrentPage} language={language} />
      </div>
    </div>
  );
}

export default App;