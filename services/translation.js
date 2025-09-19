// services/translation.js - versione MyMemory
import axios from 'axios';

class TranslationService {
  constructor() {
    this.cache = new Map();
  }

  async translateText(text, targetLang) {
    if (targetLang === 'it' || !text) return text;
    
    const langMap = {
      'en': 'en',
      'es': 'es'
    };
    
    const apiLang = langMap[targetLang];
    if (!apiLang) return text;
    
    try {
      // MyMemory API (gratuita, 5000 caratteri/giorno)
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=it|${apiLang}`;
      
      const response = await axios.get(url);
      
      if (response.data.responseStatus === 200) {
        return response.data.responseData.translatedText;
      }
      
      return text;
      
    } catch (error) {
      console.warn('Traduzione fallita:', error.message);
      return text;
    }
  }

  async translateWithCache(text, targetLang) {
    const cacheKey = `${text}-${targetLang}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    const translated = await this.translateText(text, targetLang);
    this.cache.set(cacheKey, translated);
    return translated;
  }
}

export default new TranslationService();