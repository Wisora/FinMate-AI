import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { UserProfile } from '../../types';
import { getFinancialSummary } from '../../services/reportsService';
import {
  User,
  Mail,
  Crown,
  Sparkles,
  Edit2,
  Check,
  Award,
} from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onNavigate: (tab: string) => void;
  showToast: (
    msg: string,
    type?: 'success' | 'warning' | 'error' | 'info'
  ) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  user,
  onUpdateProfile,
  onNavigate,
  showToast,
}) => {
  const { formatCurrency, t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [persona, setPersona] = useState(user.persona);

  // Default state fallback while async data loads
  const [summary, setSummary] = useState({
    healthScore: 85,
    netSavings: 1200,
    savingsProgress: 65,
  });

  useEffect(() => {
    async function loadSummary() {
      try {
        const data = await getFinancialSummary();
        if (data) {
          setSummary((prev) => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Failed to load financial summary:', err);
      }
    }
    loadSummary();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, email, persona });
    setIsEditing(false);
    showToast('Profile details updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
          <User className="w-8 h-8 text-emerald-500" />
          <span>{t('profile')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal account, financial persona, and active membership
          subscription.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-700 pb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-emerald-500 shadow-md"
              />
              {user.plan === 'pro' && (
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-amber-400 text-slate-950 shadow-md">
                  <Crown className="w-4 h-4" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {user.name}
                </h2>
                <span
                  className={`px-3 py-0.5 text-xs font-bold rounded-full uppercase ${
                    user.plan === 'pro'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {user.plan === 'pro' ? t('proPlan') : t('freePlan')}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </p>

              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5 mt-1">
                <Award className="w-3.5 h-3.5" /> Persona: {user.persona}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Edit Form */}
        {isEditing ? (
          <form
            onSubmit={handleSave}
            className="space-y-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Financial Persona / Focus Strategy
              </label>
              <select
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Aggressive Debt Payoff & Saver">
                  Aggressive Debt Payoff & Saver
                </option>
                <option value="Index Fund DCA Investor">
                  Index Fund DCA Investor
                </option>
                <option value="Balanced Budget Enthusiast">
                  Balanced Budget Enthusiast
                </option>
                <option value="Emergency Reserve Builder">
                  Emergency Reserve Builder
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Profile
            </button>
          </form>
        ) : null}

        {/* Subscription Plan Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">
                  Subscription Plan Status
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Current tier:{' '}
                <strong className="text-emerald-400 capitalize">
                  {user.plan} Tier
                </strong>{' '}
                (Joined: {user.joinedDate})
              </p>
            </div>

            {user.plan === 'free' ? (
              <button
                onClick={() => onNavigate('upgrade')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upgrade to Pro</span>
              </button>
            ) : (
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                Active Pro Membership
              </div>
            )}
          </div>
        </div>

        {/* Quick Health Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Health Rating
            </span>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {summary.healthScore} / 100
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Net Surplus
            </span>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
              {formatCurrency(summary.netSavings)}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Savings Target Pct
            </span>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              {summary.savingsProgress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;