import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Upgrade } from './pages/Upgrade';
import { Profile } from './pages/Profile';

const DEFAULT_USER: UserProfile = {
  name: 'Alex Mercer',
  email: 'alex.mercer@finmate.ai',
  plan: 'free',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  joinedDate: 'Jan 2026',
  persona: 'Aggressive Debt Payoff & Saver',
  monthlyIncome: 5400,
  monthlyExpensesBudget: 3400,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // User Profile state with localStorage persistence
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('finmate_user_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load user profile', e);
    }
    return DEFAULT_USER;
  });

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const id = 'toast_' + Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem('finmate_user_profile', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save user profile', e);
      }
      return updated;
    });
  };

  const handleUpgradeSuccess = (newPlan: 'pro') => {
    handleUpdateProfile({ plan: newPlan });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors font-sans antialiased flex flex-col selection:bg-emerald-500 selection:text-white">
        {/* Navigation Bar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

        {/* Main Content View Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {activeTab === 'home' && (
            <Home onNavigate={setActiveTab} user={user} />
          )}

          {activeTab === 'dashboard' && (
            <Dashboard user={user} onNavigate={setActiveTab} showToast={showToast} />
          )}

          {activeTab === 'reports' && (
            <Reports user={user} onNavigate={setActiveTab} showToast={showToast} />
          )}

          {activeTab === 'settings' && (
            <Settings showToast={showToast} />
          )}

          {activeTab === 'upgrade' && (
            <Upgrade user={user} onUpgradeSuccess={handleUpgradeSuccess} showToast={showToast} />
          )}

          {activeTab === 'profile' && (
            <Profile
              user={user}
              onUpdateProfile={handleUpdateProfile}
              onNavigate={setActiveTab}
              showToast={showToast}
            />
          )}
        </main>

        {/* Global Toast Notifications */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© 2026 FinMate AI — Multilingual Personal Finance Coach. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => setActiveTab('settings')} className="hover:text-emerald-500 transition-colors">
                Settings
              </button>
              <button onClick={() => setActiveTab('upgrade')} className="hover:text-emerald-500 transition-colors">
                Pro Upgrade
              </button>
              <button onClick={() => setActiveTab('reports')} className="hover:text-emerald-500 transition-colors">
                Reports
              </button>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
