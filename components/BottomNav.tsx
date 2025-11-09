
import React from 'react';
import { Page, Language } from '../types';
import { TEXTS } from '../constants';
import { WalletIcon, AdsIcon, SettingsIcon } from './icons';

interface BottomNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  language: Language;
}

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) => {
  const activeClasses = 'text-primary-light';
  const inactiveClasses = 'text-gray-400 dark:text-gray-500';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage, language }) => {
  const texts = TEXTS[language];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card dark:bg-dark-card border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="flex justify-around items-center h-full max-w-lg mx-auto">
        <NavItem 
          icon={<AdsIcon className="w-6 h-6" />}
          label={texts.navHome}
          isActive={currentPage === 'home'}
          onClick={() => setCurrentPage('home')}
        />
        <NavItem
          icon={<WalletIcon className="w-6 h-6" />}
          label={texts.navWithdraw}
          isActive={currentPage === 'withdraw'}
          onClick={() => setCurrentPage('withdraw')}
        />
        <NavItem
          icon={<SettingsIcon className="w-6 h-6" />}
          label={texts.navSettings}
          isActive={currentPage === 'settings'}
          onClick={() => setCurrentPage('settings')}
        />
      </div>
    </nav>
  );
};

export default BottomNav;
