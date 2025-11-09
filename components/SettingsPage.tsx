import React from 'react';
import { Theme, Language } from '../types';
import { TEXTS } from '../constants';
import { SunIcon, MoonIcon } from './icons';

interface SettingsPageProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ theme, setTheme, language, setLanguage }) => {
  const texts = TEXTS[language];
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="p-6 h-full flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6 text-center">{texts.settingsTitle}</h1>
      
      <div className="bg-card dark:bg-dark-card p-4 rounded-lg shadow-md space-y-4">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-foreground dark:text-dark-foreground font-medium">{texts.theme}</span>
          <div onClick={toggleTheme} className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300">
            <div className={`absolute left-1 transition-transform duration-300 transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`}>
              {isDark ? <MoonIcon className="w-6 h-6 text-yellow-300" /> : <SunIcon className="w-6 h-6 text-yellow-500" />}
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-foreground dark:text-dark-foreground font-medium">{texts.language}</span>
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-full p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${language === 'en' ? 'bg-white dark:bg-gray-500 text-primary' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {texts.english}
            </button>
            <button
              onClick={() => setLanguage('he')}
              className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${language === 'he' ? 'bg-white dark:bg-gray-500 text-primary' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {texts.hebrew}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;