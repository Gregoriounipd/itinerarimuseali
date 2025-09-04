// components/LanguageToggle.js
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const LanguageToggle = ({ isModelli = false }) => {
  const { i18n, t } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'it' ? 'en' : 'it';
    console.log('Cambiando lingua da', i18n.language, 'a', newLang);
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language || 'it';
  const isItalian = currentLang === 'it';

  // Debug
  console.log('LanguageToggle - lingua corrente:', currentLang);

  if (!isClient) {
    return (
      <div className={`w-[44px] h-[44px] rounded-lg animate-pulse ${
        isModelli ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
      }`}></div>
    );
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`p-3 rounded-lg transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center group relative ${
        isModelli 
          ? 'bg-white/10 hover:bg-white/20 text-white/90 hover:text-white' 
          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
      }`}
      aria-label="Cambia lingua"
      title={`Lingua corrente: ${isItalian ? 'Italiano' : 'English'}`}
    >
      <span className="text-lg font-semibold transition-transform duration-300 group-hover:scale-110">
        {isItalian ? 'IT' : 'EN'}
      </span>
      
      {/* Glow effect per tema modelli */}
      {isModelli && (
        <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
    </button>
  );
};

export default LanguageToggle;