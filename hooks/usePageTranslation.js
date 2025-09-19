import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import translationService from "@/services/translation";

export function usePageTranslation(originalTexts) {
    const { i18n } = useTranslation();
    const [texts, setTexts] = useState(originalTexts);
    const [isTranslating, setIsTranslating] = useState(false);

    useEffect(() => {
        if (!i18n.language || i18n.language === 'it') {
            setTexts(originalTexts);
            return;
        }
        const lang = i18n.language.split('-')[0];

        if (lang === 'it') {
            setTexts(originalTexts);
            return;
        }
        const translateAll = async () => {
            setIsTranslating(true);
            const translatedTexts = {};

            for (const [key, value] of Object.entries(originalTexts)) {
                translatedTexts[key] = await translationService.translateWithCache(
                    value,
                    i18n.language
                );
            }

            setTexts(translatedTexts);
            setIsTranslating(false);
        };

        translateAll();
    }, [i18n.language, originalTexts]);

    return { texts, isTranslating };
}
