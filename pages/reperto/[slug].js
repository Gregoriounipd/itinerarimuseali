import NavigazioneReperti from '@/components/NavigazioneReperti';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, Volume2, PlayCircle, BookOpen, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Helper function per testi da database
const useDbTranslation = () => {
  const { t, i18n } = useTranslation('common');
  const [mounted, setMounted] = useState(false);




  useEffect(() => {
    setMounted(true);
  }, []);

  const getDbText = (item, field) => {
    if (!item) return '';



    // Se la lingua è inglese Ed esiste il campo tradotto, usa quello
    if (!mounted) {
      return item[field];
    }


    const currentLang = i18n.language; // 'it', 'en', 'es', ecc.
    const englishField = `${field}_eng`;
    const spanishField = `${field}_spa`;



    if (currentLang === 'en' && item[englishField]) {
      return item[englishField]; // Usa il campo in inglese se esiste
    }
    if (currentLang === 'es' && item[spanishField]) {
      return item[spanishField]; // Usa il campo in spagnolo se esiste
    }
    return item[field];

  };

  return { getDbText };
};



export async function getServerSideProps({ params, locale }) {
  const { slug } = params;

  // Query reperti collegati
  const { data: repertiCollegati, error: collegatiError } = await supabase
    .from('reperti_collegati')
    .select('*')
    .eq('reperto_slug', slug)
    .order('ordine', { ascending: true });

  const { data, error } = await supabase
    .from('reperti')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { notFound: true };
  }

  const { data: approfondimento } = await supabase
    .from('reperti_specifici')
    .select('*')
    .eq('ordine', data.numero_marker)
    .single();

  const { data: dataReperti, error: errorReperti } = await supabase
    .from('reperti')
    .select('*');

  if (errorReperti) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      approfondimento: approfondimento || null,
      dataReperti,
      repertiCollegati: repertiCollegati || [],
      initialLocale: locale || 'it',
    },
  };
}

// Componente Modale Audio Accessibile
function AudioModal({ url, onClose, repertoNome }) {
  const modalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), audio'
      );

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }

        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [onClose]);

  if (!url) return null;




  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="audio-title" className="text-xl font-bold text-gray-900 dark:text-white">
            Audioguida: {repertoNome}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Chiudi audioguida"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <audio
          ref={audioRef}
          controls
          className="w-full mb-4 focus:ring-4 focus:ring-blue-300 rounded"
          aria-label={`Audioguida per ${repertoNome}`}
        >
          <source src={url} type="audio/mpeg" />
          <source src={url} type="audio/wav" />
          <source src={url} type="audio/ogg" />
          Il tuo browser non supporta la riproduzione audio.
          <a href={url} download>Scarica il file audio</a>
        </audio>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Utilizza i controlli audio per ascoltare la descrizione dettagliata del reperto.
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors font-medium"
        >
          Chiudi audioguida
        </button>
      </div>
    </div>
  );
}

export default function RepertoPage({ approfondimento, data, dataReperti, repertiCollegati }) {
  const { t } = useTranslation('common');
  const { getDbText } = useDbTranslation();
  const [videoId, setVideoId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [repertoNome, setRepertoNome] = useState('');
  const { i18n } = useTranslation('common');
  const videoRef = useRef(null);
  const announcementRef = useRef(null);
  const [currentLang, setCurrentLang] = useState(null); // parte vuoto tutto finche non si pigia un bottone

  const lingueDisponibili = [
    { field: 'arabo', iso: 'ARA', label: 'Arabo' },
    { field: 'cinese', iso: 'CHI', label: 'Cinese' },
    { field: 'inglse', iso: 'ENG', label: 'English' },
    { field: 'hindi', iso: 'HIN', label: 'Hindi' },
    { field: 'persiano', iso: 'PER', label: 'Persiano' },
    { field: 'spagnolo', iso: 'SPA', label: 'Español' },
    { field: 'urdu', iso: 'URD', label: 'Urdu' },
  ];
  // Subito dopo la dichiarazione di lingueDisponibili, aggiungi:
  useEffect(() => {
    console.log('Approfondimento completo:', approfondimento);
    console.log('Campo selezionato:', currentLang);
    console.log('Valore del campo:', approfondimento?.[currentLang]);
  }, [approfondimento, currentLang]);

  // Gestione client-side mounting
  useEffect(() => {
    setIsClient(true);

    // Solo dopo mount lato client
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Annuncio per screen reader quando la pagina si carica
  useEffect(() => {
    if (isClient && data) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.textContent = `Pagina del reperto ${data.nome} caricata. ${approfondimento?.audioguida_url ? 'Audioguida disponibile.' : ''} ${approfondimento?.video_lis_url ? 'Video in lingua dei segni disponibile.' : ''}`;
      document.body.appendChild(announcement);

      setTimeout(() => {
        if (document.body.contains(announcement)) {
          document.body.removeChild(announcement);
        }
      }, 3000);
    }
  }, [isClient, data, approfondimento]);

  const toggleDarkMode = () => {
    if (!isClient) return;

    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (approfondimento?.video_lis_url) {
      try {
        const urlObj = new URL(approfondimento.video_lis_url);
        const id = urlObj.searchParams.get("v");
        if (id) setVideoId(id);
      } catch (error) {
        console.error('URL video non valido:', error);
      }
    }
  }, [approfondimento]);

  const scrollToVideo = () => {
    setShowVideo(true);

    // Annuncio per screen reader
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'Video in lingua dei segni caricato. Scorri per visualizzarlo.';
    document.body.appendChild(announcement);

    setTimeout(() => {
      videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      document.body.removeChild(announcement);
    }, 100);
  };

  // Genera descrizione immagine dettagliata
  const getImageDescription = () => {
    if (data.descrizione_immagine) return data.descrizione_immagine;

    let description = `Reperto archeologico: ${data.nome}`;
    if (data.categoria) description += `, categoria ${data.categoria}`;
    if (data.datazione) description += `, datato ${data.datazione}`;
    if (data.materiale) description += `, realizzato in ${data.materiale}`;
    if (data.descrizione) description += `. ${data.descrizione}`;

    return description;
  };

  return (
    <>
      <Head>
        <title>{getDbText(data, 'nome')} - Musei Università di Padova</title>
        <meta name="description" content={`${getDbText(data, 'descrizione') || data.nome} - Reperto dei Musei dell'Università di Padova con contenuti accessibili`} />
        <meta name="keywords" content={`${data.nome}, ${data.categoria || ''}, musei università padova, accessibilità, WCAG`} />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

        {/* Skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-4 left-4 z-50 px-4 py-2 bg-blue-700 text-white rounded focus:ring-4 focus:ring-blue-300"
        >
          Salta al contenuto principale
        </a>

        {/* Header */}
        <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/itinerario/ed9b295c-13d1-4ab5-a620-2294c8d3fac9"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 min-h-[44px]"
                aria-label="Torna all'itinerario dei reperti"
              >
                <ChevronLeft className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">Torna ai reperti</span>
              </Link>

              <div className="flex items-center gap-3">
                {/* Toggle Dark Mode */}
                <button
                  onClick={toggleDarkMode}
                  disabled={!isClient}
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 min-h-[44px] min-w-[44px]"
                  aria-label={darkMode ? "Disattiva modalità scura" : "Attiva modalità scura"}
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* Numero marker */}
                {data.numero_marker && (
                  <div
                    className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-full text-sm font-semibold"
                    role="img"
                    aria-label={`Reperto numero ${data.numero_marker}`}
                  >
                    #{data.numero_marker}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Contenuto principale */}
        <main id="main-content" role="main">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-20">
              <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

                {/* Immagine */}
                <div className="order-1 mb-8 lg:mb-0 lg:order-2">
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    <figure className="relative bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden">
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">Caricamento...</span>
                        </div>
                      )}
                      <img
                        src={approfondimento?.immagine || data.immagine}
                        alt={getImageDescription()}
                        className="w-full h-auto max-h-[400px] lg:max-h-[500px] object-contain p-4"
                        onLoad={() => setImageLoaded(true)}
                        loading="eager"
                      />
                    </figure>
                  </div>
                </div>

                {/* Contenuto */}
                <div className="order-2 lg:order-1">
                  <header>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                      {getDbText(approfondimento || data, approfondimento ? 'testo_breve' : 'nome')}
                    </h1>

                    {data.categoria && (
                      <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md mb-6 border border-gray-200 dark:border-gray-600">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Categoria: {getDbText(data, 'categoria')}
                        </span>
                      </div>
                    )}

                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                      {getDbText(data, 'descrizione')}
                    </p>
                  </header>

                  {/* Pulsanti accessibilità */}
                  <div
                    className="flex flex-col gap-4"
                    role="group"
                    aria-label="Contenuti accessibili per questo reperto"
                  >
                    {/* Prima riga - 2 bottoni */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {approfondimento?.audioguida_url && (
                        <button
                          onClick={() => setShowAudio(true)}
                          className="group flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600 min-h-[64px]"
                          aria-describedby="audio-desc"
                        >
                          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                            <Volume2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="text-left">
                            <span className="block text-base font-semibold text-gray-900 dark:text-white">Audioguida</span>
                            <span id="audio-desc" className="block text-sm text-gray-500 dark:text-gray-400">Ascolta la descrizione completa</span>
                          </div>
                        </button>
                      )}

                      {approfondimento?.video_lis_url && ( //tabella riferimento supabase
                        <button
                          onClick={scrollToVideo}
                          className="group flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600 min-h-[64px]"
                          aria-describedby="video-desc"
                        >
                          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                            <PlayCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="text-left">
                            <span className="block text-base font-semibold text-gray-900 dark:text-white">Video LIS</span>
                            <span id="video-desc" className="block text-sm text-gray-500 dark:text-gray-400">Lingua dei Segni Italiana</span>
                          </div>
                        </button>
                      )}
                    </div>

                    {/* Storia sociale */}
                    <section className="max-w-5xl mx-auto px-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Bottone CAA */}
                        {approfondimento?.approfondimento_url && (
                          <a
                            href={approfondimento.approfondimento_url}
                            download={
                              approfondimento.approfondimento_url.endsWith(".pdf") ||
                              approfondimento.approfondimento_url.endsWith(".docx")
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600 min-h-[64px]"
                            aria-describedby="caa-desc"
                          >
                            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                              <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="text-left">
                              <span className="block text-base font-semibold text-gray-900 dark:text-white">CAA</span>
                              <span id="caa-desc" className="block text-sm text-gray-500 dark:text-gray-400">
                                Comunicazione Aumentativa
                              </span>
                            </div>
                          </a>
                        )}


                      </div>
                      {/* === BOTTONI LINGUA === */}
                      <div className="flex flex-wrap gap-2 mt-6" role="group" aria-label="Seleziona lingua">
                        {lingueDisponibili.map((lang) => (
                          <button
                            key={lang.field}
                            onClick={() => {
                              setCurrentLang(lang.field);
                              // Se nella casella c'è un link PDF, aprilo
                              if (approfondimento?.[lang.field]?.includes('.pdf')) {
                                window.open(approfondimento[lang.field], '_blank');
                              }
                            }}
                            className={`px-3 py-2 rounded-full border text-sm font-medium transition-all ${currentLang === lang.field
                              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                              : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="font-mono font-bold text-base">{lang.iso}</span>
                              {currentLang === lang.field && <span>✓</span>}
                            </span>
                          </button>
                        ))}
                      </div>
                      {/* === TESTO SELEZIONATO === */}
                      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 mt-6 whitespace-pre-wrap">
                        <p>
                          {approfondimento
                            ? approfondimento[currentLang] ||
                            "⚠️ Testo non disponibile in questa lingua."
                            : data.descrizione}
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contenuto dettaglio - QUESTA SEZIONE VA FUORI DALLA HERO */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Descrizione approfondita */}
            {(approfondimento?.testo_lungo || approfondimento?.testo_lungo_eng) && (
              <section
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8 mb-8"
                aria-labelledby="descrizione-title"
              >
                <h2 id="descrizione-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
                  {getDbText(approfondimento, 'testo_breve') || 'Descrizione dettagliata'}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                  <p className="leading-relaxed text-lg">
                    {getDbText(approfondimento, 'testo_lungo') || data.descrizione}
                  </p>
                </div>
              </section>
            )}

            {/* Video LIS */}
            {showVideo && approfondimento?.video_lis_url && videoId && (
              <section
                ref={videoRef}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8 mb-8"
                aria-labelledby="video-title"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 id="video-title" className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                    Video in Lingua dei Segni Italiana
                  </h2>
                  <button
                    onClick={() => setShowVideo(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px]"
                    aria-label="Chiudi video in lingua dei segni"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-4">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    title={`Video in Lingua dei Segni Italiana che descrive il reperto ${data.nome}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    aria-describedby="video-description"
                  />
                </div>
                <p id="video-description" className="text-sm text-gray-600 dark:text-gray-400 italic leading-relaxed">
                  Questo video fornisce una descrizione completa del reperto &#34;{data.nome}&#34; in Lingua dei Segni Italiana,
                  garantendo l&apos;accessibilità per le persone sorde e ipoudenti.
                </p>
              </section>
            )}

            {/* Informazioni tecniche */}
            {(data.datazione || data.provenienza || data.materiale) && (
              <section
                className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-6 lg:p-8 mb-8 border border-gray-200 dark:border-gray-600"
                aria-labelledby="info-tecniche-title"
              >
                <h2 id="info-tecniche-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-green-500 rounded-full"></div>
                  Informazioni tecniche
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.datazione && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-600">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Datazione</h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{data.datazione}</p>
                    </div>
                  )}
                  {data.provenienza && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-600">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Provenienza</h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{data.provenienza}</p>
                    </div>
                  )}
                  {data.materiale && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-600">
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Materiale</h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{data.materiale}</p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Altri reperti collegati */}
            {repertiCollegati && repertiCollegati.length > 0 && (
              <section
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8 mb-8"
                aria-labelledby="collegati-title"
              >
                <h2 id="collegati-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                  Altri reperti collegati
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {repertiCollegati.map((rep, index) => (
                    <div
                      key={rep.id || index}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-600 flex flex-col gap-3"
                    >
                      {rep.immagine && (
                        <img
                          src={rep.immagine}
                          alt={rep.titolo || 'Reperto collegato'}
                          className="w-full h-40 object-contain rounded-lg bg-white dark:bg-gray-800"
                        />
                      )}

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {rep.titolo}
                      </h3>

                      {rep.descrizione_breve && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">{rep.descrizione_breve}</p>
                      )}

                      {rep.link_esterno && (
                        <Link
                          href={rep.link_esterno}
                          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] justify-center"
                        >
                          <span>🔗</span>
                          Vai al modello
                        </Link>
                      )}

                      {rep.audiodescrizione_url && (
                        <button
                          onClick={() => {
                            setShowAudio(true);
                            setAudioUrl(rep.audiodescrizione_url);
                            setRepertoNome(rep.titolo);
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
                          aria-label={`Ascolta audiodescrizione di ${rep.titolo}`}
                        >
                          <Volume2 className="w-4 h-4" />
                          Ascolta audiodescrizione
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Navigazione reperti */}
            <section
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:p-8"
              aria-label="Navigazione tra i reperti"
            >
              <NavigazioneReperti data={data} dataReperti={dataReperti} />
            </section>
          </div>
        </main>

        {/* Modale Audio */}
        {showAudio && (
          <AudioModal
            url={audioUrl || approfondimento?.audioguida_url}
            onClose={() => {
              setShowAudio(false);
              setAudioUrl(null);
              setRepertoNome('');
            }}
            repertoNome={repertoNome || data.nome}
          />
        )}
      </div>
    </>
  );
}