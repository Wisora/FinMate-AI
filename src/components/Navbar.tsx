import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { currencies } from '../i18n/translations';
import { CurrencyCode, LanguageCode, UserProfile } from '../types';
import {
  Wallet,
  LayoutDashboard,
  BarChart3,
  Settings,
  Crown,
  User,
  Sun,
  Moon,
  Globe,
  DollarSign,
  Menu,
  X,
  Home as HomeIcon,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
}) => {
  const {
    t,
    language,
    setLanguage,
    currency,
    setCurrency,
    darkMode,
    setDarkMode,
  } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('home'), icon: HomeIcon },
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'reports', label: t('reports'), icon: BarChart3 },
    { id: 'settings', label: t('settings'), icon: Settings },
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'upgrade', label: t('upgrade'), icon: Crown, isHighlight: true },
  ];

  const languagesList: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English (EN)' },
    { code: 'af', label: 'Afrikaans (AF)' },
    { code: 'fr', label: 'Français (FR)' },
    { code: 'es', label: 'Español (ES)' },
    { code: 'ar', label: 'العربية (AR)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                FinMate{' '}
                <span className="text-emerald-600 dark:text-emerald-400">
                  AI
                </span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                v2.5 Pro
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                    item.isHighlight
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-105 shadow-sm ml-2'
                      : isActive
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Utilities */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Currency Selector */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-2.5 py-1.5 border border-slate-200 dark:border-slate-700">
              <DollarSign className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 mr-1" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                aria-label="Select Currency"
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
              >
                {Object.keys(currencies).map((curr) => (
                  <option
                    key={curr}
                    value={curr}
                    className="bg-white dark:bg-slate-800"
                  >
                    {curr} ({currencies[curr as CurrencyCode].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-2.5 py-1.5 border border-slate-200 dark:border-slate-700">
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 mr-1" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                aria-label="Select Language"
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer uppercase"
              >
                {languagesList.map((l) => (
                  <option
                    key={l.code}
                    value={l.code}
                    className="bg-white dark:bg-slate-800"
                  >
                    {l.code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label={
                darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'
              }
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors focus:ring-2 focus:ring-emerald-500"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* User Avatar */}
            <button
              onClick={() => setActiveTab('profile')}
              aria-label="View Profile"
              className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full border-2 border-emerald-500 object-cover"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                {user.name}
              </span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-semibold mb-1">
                Currency
              </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="p-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
              >
                {Object.keys(currencies).map((curr) => (
                  <option key={curr} value={curr}>
                    {curr} ({currencies[curr as CurrencyCode].symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 uppercase font-semibold mb-1">
                Language
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="p-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 uppercase"
              >
                {languagesList.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
