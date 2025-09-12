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
        fallbackLng: 'it', // Lingua di fallback
        detection: {
            order: ['localStorage', 'navigator', 'htmlTag'], // FIX: era scritto 'loclalStorage'
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
        // SOLUZIONE: Controlla se siamo nel browser
        if (typeof window === 'undefined') {
            // Server-side: usa require per caricare il JSON
            try {
                const translations = require(`../public/locales/${lng}/${ns}.json`);
                i18n.addResourceBundle(lng, ns, translations, true, true);
            } catch (err) {
                console.warn(`Traduzione non trovata: ${lng}/${ns}`);
            }
        } else {
            // Client-side: usa fetch
            const response = await fetch(`/locales/${lng}/${ns}.json`);
            if (response.ok) {
                const translations = await response.json();
                i18n.addResourceBundle(lng, ns, translations, true, true);
            }
        }
    } catch (error) {
        console.warn(`Errore traduzioni ${lng}/${ns}:`, error.message);
    }
};

// IMPORTANTE: Inizializza solo lato client
const initializeTranslations = async () => {
    // Esegui solo nel browser
    if (typeof window !== 'undefined') {
        const languages = ['it', 'en'];
        const namespaces = ['common', 'reperto'];

        for (const lng of languages) {
            for (const ns of namespaces) {
                await loadNamespaceTranslations(lng, ns);
            }
        }
    }
};

// Inizializza solo se nel browser
if (typeof window !== 'undefined') {
    initializeTranslations();
}

export default i18n;