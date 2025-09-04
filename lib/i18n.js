//lib/i18n.js per le traduzioni
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    it: {
        common: {},
        reperto: {}
    },
    en: {
        common: {},
        reperto: {}
    }
};
i18n
    .use(LanguageDetector) // Rileva la lingua del browser
    .use(initReactI18next) // Passa i18n a react-i18next
    .init({
        resources,
        fallbackLng: 'it', // Lingua di fallback})

        detection: {
            order: ['loclalStorage', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false, // React già si occupa di questo
        },

        //traduzioni caricate dinamicamente
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

const loadNamespaceTranslations = async (lng, ns) => {
    try {
        const response = await fetch(`/locales/${lng}/${ns}.json`);
        const translations = await response.json();
        i18n.addResourceBundle(lng, ns, translations, true, true);
    } catch (error) {
        console.error(`Errore nel caricamento delle traduzioni per ${lng}/${ns}:`, error);
    }
};
//la macchina carica le traduzioni inizili
const initializeTranslations = async () => {
    const languages = ['it', 'en'];
    const namespaces = ['common', 'reperto'];

    for (const lng of languages) {
        for (const ns of namespaces) {
            await loadNamespaceTranslations(lng, ns);
        }
    }
};

initializeTranslations();
export default i18n;
