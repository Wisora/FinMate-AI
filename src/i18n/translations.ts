import { CurrencyCode, LanguageCode } from '../types';

export interface CurrencyConfig {
  symbol: string;
  name: string;
  rate: number; // Multiplier relative to USD base rate
}

export const currencies: Record<CurrencyCode, CurrencyConfig> = {
  USD: { symbol: '$', name: 'US Dollar', rate: 1 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.92 },
  ZAR: { symbol: 'R', name: 'South African Rand', rate: 18.5 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.79 },
  JPY: { symbol: '¥', name: 'Japanese Yen', rate: 155.0 },
};

export const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
    reports: 'Reports',
    settings: 'Settings',
    profile: 'Profile',
    upgrade: 'Upgrade',
    upgradeToPro: 'Upgrade to Pro',
    proBenefits: 'Unlock Unlimited AI Coaching & PDF Exports',
    cancel: 'Cancel',
    save: 'Save Changes',
    loading: 'Loading...',
  },
  af: {
    home: 'Tuis',
    dashboard: 'Kontrolepaneel',
    reports: 'Verslae',
    settings: 'Instellings',
    profile: 'Profiel',
    upgrade: 'Opgradeer',
    upgradeToPro: 'Opgradeer na Pro',
    proBenefits: 'Ontsluit onbeperkte KI-afrigting en PDF-uitvoere',
    cancel: 'Kanselleer',
    save: 'Stoor veranderinge',
    loading: 'Laai tans...',
  },
  fr: {
    home: 'Accueil',
    dashboard: 'Tableau de bord',
    reports: 'Rapports',
    settings: 'Paramètres',
    profile: 'Profil',
    upgrade: 'Mettre à niveau',
    upgradeToPro: 'Passer à Pro',
    proBenefits: 'Débloquez le coaching IA illimité et les exports PDF',
    cancel: 'Annuler',
    save: 'Enregistrer les modifications',
    loading: 'Chargement...',
  },
  es: {
    home: 'Inicio',
    dashboard: 'Panel',
    reports: 'Informes',
    settings: 'Configuración',
    profile: 'Perfil',
    upgrade: 'Mejorar',
    upgradeToPro: 'Actualizar a Pro',
    proBenefits: 'Desbloquea el coaching de IA ilimitado y exportaciones PDF',
    cancel: 'Cancelar',
    save: 'Guardar cambios',
    loading: 'Cargando...',
  },
  ar: {
    home: 'الرئيسية',
    dashboard: 'لوحة التحكم',
    reports: 'التقارير',
    settings: 'الإعدادات',
    profile: 'الملف الشخصي',
    upgrade: 'الترقية',
    upgradeToPro: 'الترقية إلى بروفيسيونال',
    proBenefits: 'افتح التدريب غير المحدود بالذكاء الاصطناعي وتصدير PDF',
    cancel: 'إلغاء',
    save: 'حفظ التغييرات',
    loading: 'جاري التحميل...',
  },
};