import { UserProfile } from '../types';

const STORAGE_KEY = 'finmate_user_profile';

const DEFAULT_USER: UserProfile = {
  id: 'usr_default_01',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  plan: 'free',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  joinedDate: '2026-01-15',
  persona: 'Young Professional',
  monthlyIncome: 5000,
  monthlyExpensesBudget: 3200,
};

export const authService = {
  getUserProfile(): UserProfile {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (error) {
      console.warn('Failed to load user profile from storage:', error);
    }
    return DEFAULT_USER;
  },

  updateUserProfile(updatedData: Partial<UserProfile>): UserProfile {
    const current = this.getUserProfile();
    const updated = { ...current, ...updatedData };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Failed to save user profile:', error);
    }
    return updated;
  },

  upgradeUserToPro(): UserProfile {
    return this.updateUserProfile({ plan: 'pro' });
  },
};