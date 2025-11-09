import React, { useState } from 'react';
import { Language } from '../types';
import { TEXTS, MINIMUM_WITHDRAWAL } from '../constants';

interface WithdrawPageProps {
  balance: number;
  paypalEmail: string;
  setPaypalEmail: (email: string) => void;
  handleWithdraw: () => void;
  language: Language;
}

const WithdrawPage: React.FC<WithdrawPageProps> = ({ balance, paypalEmail, setPaypalEmail, handleWithdraw, language }) => {
  const [message, setMessage] = useState('');
  const texts = TEXTS[language];

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canWithdraw = balance >= MINIMUM_WITHDRAWAL && isValidEmail(paypalEmail);

  const onWithdrawClick = () => {
    if (canWithdraw) {
      handleWithdraw();
      setMessage(texts.withdrawalSuccess);
      setTimeout(() => setMessage(''), 3000);
    } else if (balance < MINIMUM_WITHDRAWAL) {
      setMessage(texts.insufficientFunds);
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(texts.invalidEmail);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-foreground dark:text-dark-foreground mb-6 text-center">{texts.withdrawTitle}</h1>
      
      <div className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2" htmlFor="paypalEmail">
            {texts.paypalEmail}
          </label>
          <input
            type="email"
            id="paypalEmail"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background dark:bg-gray-800 text-foreground dark:text-dark-foreground"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
            {texts.withdrawAmount}
          </label>
          <div className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md text-foreground dark:text-dark-foreground font-semibold">
            ₪{balance.toFixed(2)}
          </div>
        </div>

        <button
          onClick={onWithdrawClick}
          disabled={!canWithdraw}
          className="w-full bg-primary hover:bg-primary-light dark:hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {texts.withdrawNow}
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">{texts.minWithdrawal}</p>
        
        {message && (
          <p className={`text-center mt-4 font-semibold ${message === texts.withdrawalSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default WithdrawPage;