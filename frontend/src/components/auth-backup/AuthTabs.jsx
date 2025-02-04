import React from 'react';
import { cn } from '@/lib/utils';

interface AuthTabsProps {
  activeTab: 'login' | 'signup';
  onTabChange: (tab: 'login' | 'signup') => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b mb-6">
      <button
        className={cn(
          'flex-1 py-3 text-sm font-medium',
          'focus:outline-none',
          activeTab === 'login'
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
        onClick={() => onTabChange('login')}
      >
        Login
      </button>
      <button
        className={cn(
          'flex-1 py-3 text-sm font-medium',
          'focus:outline-none',
          activeTab === 'signup'
            ? 'text-emerald-600 border-b-2 border-emerald-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
        onClick={() => onTabChange('signup')}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;