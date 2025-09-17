// components/LanguageToggle.js
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const LanguageToggle = ({ isModelli = false }) => {
  const { i18n, t } = useTranslation('common');
  const [isClient, setIsClient] = useState(false);
  const [showMessage, setShowMessage] = useState(false);


  const languages = ['it', 'en', 'es']; // Aggiungi altre lingue se necessario
  const langDisplay = {
    'it': 'IT',
    'en': 'EN',
    'es': 'ES'
  };
// se vuole aggiungere altre lingue, aggiungere qui questi per bottoni
  const langNames = {
    'it': 'Italiano',
    'en': 'English',
    'es': 'Español'
  };
// se vuole aggiungere altre lingue, aggiungere qui

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleLanguage = async () => {
    // MODIFICA: Cicla tra tutte le lingue
    const currentIndex = languages.indexOf(i18n.language);
    const nextIndex = (currentIndex + 1) % languages.length;
    const newLang = languages[nextIndex];

    // Debug
    console.log('LanguageToggle - lingua corrente:', currentLang);

    try {
      const response = await fetch(`/locales/${newLang}/common.json`);
      if (!response.ok && newLang === 'es') {
        // Mostra messaggio se spagnolo non disponibile
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        return;
      }
    } catch (error) {
      console.warn(`Lingua ${newLang} non disponibile`);
    }
    i18n.changeLanguage(newLang);
  }
  const currentLang = i18n.language || 'it';


  if (!isClient) {
    return (
      <div className={`w-[44px] h-[44px] rounded-lg animate-pulse ${isModelli ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
        }`}></div>
    );
  }

  return (
    <>
      <button
        onClick={toggleLanguage}
        className={`p-3 rounded-lg transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center group relative ${isModelli
            ? 'bg-white/10 hover:bg-white/20 text-white/90 hover:text-white'
            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
          }`}
        aria-label="Cambia lingua"
        title={`Lingua corrente: ${langNames[currentLang]}`}
      >
        <span className="text-lg font-semibold transition-transform duration-300 group-hover:scale-110">
          {langDisplay[currentLang]}
        </span>

        {isModelli && (
          <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        )}
      </button>

      {/* AGGIUNGI messaggio di avviso */}
      {showMessage && (
        <div className="fixed top-20 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded shadow-lg z-50">
          Lo spagnolo non è ancora disponibile
        </div>
      )}
    </>
  );
};

export default LanguageToggle;