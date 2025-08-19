import NavigazioneReperti from '@/components/NavigazioneReperti';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, Volume2, PlayCircle, BookOpen, X, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ Server-side data fetching
export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Recupera il reperto base da 'reperti' tramite slug
  const { data, error } = await supabase
    .from('reperti')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { notFound: true };
  }

  // Recupera approfondimento da 'reperti_specifici'
  const { data: approfondimento, error: errorApprofondimento } = await supabase
    .from('reperti_specifici')
    .select('*')
    .eq('ordine', data.numero_marker)
    .single();

  // Recupera tutti i reperti per la navigazione
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
    },
  };
}

// ✅ Componente principale della pagina
export default function RepertoPage({ approfondimento, data, dataReperti }) {
  const [videoId, setVideoId] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const videoRef = useRef(null);

  // Gestione dark mode con localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
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
      const urlObj = new URL(approfondimento.video_lis_url);
      const id = urlObj.searchParams.get("v");
      setVideoId(id);
    }
  }, [approfondimento]);

  const scrollToVideo = () => {
    setShowVideo(true);
    setTimeout(() => {
      videoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header con navigazione - Ottimizzato per mobile */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link href="/reperti" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors touch-target">
              <ChevronLeft className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base truncate">Torna ai reperti</span>
            </Link>
            
            <div className="flex items-center gap-3">
              {/* Toggle Dark Mode */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors touch-target"
                aria-label={darkMode ? 'Attiva modalità chiara' : 'Attiva modalità scura'}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Numero marker */}
              {data.numero_marker && (
                <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap">
                  #{data.numero_marker}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Layout mobile-first */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-20">
          {/* Layout mobile: immagine sopra, testo sotto */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            
            {/* Immagine principale - Prima su mobile */}
            <div className="order-1 mb-6 lg:mb-0 lg:order-2">
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 ${imageLoaded ? '' : 'animate-pulse'}`}></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl overflow-hidden">
                  <img
                    src={approfondimento?.immagine || data.immagine}
                    alt={data.descrizione_immagine || 'Immagine reperto'}
                    className="w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] object-contain p-3 lg:p-4"
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  )}
                </div>
              </div>
            </div>

            {/* Contenuto testuale - Secondo su mobile */}
            <div className="order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight">
                {data.nome}
              </h1>
              
              {/* Badge categoria */}
              {data.categoria && (
                <div className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 bg-white dark:bg-gray-800 rounded-full shadow-md mb-4 lg:mb-6 border border-gray-200 dark:border-gray-600">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{data.categoria}</span>
                </div>
              )}
              
              {/* Descrizione breve */}
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 lg:mb-8">
                {data.descrizione}
              </p>

              {/* Pulsanti accessibilità - Stack su mobile */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 lg:gap-4">
                {approfondimento?.audioguida_url && (
                  <a 
                    href={approfondimento.audioguida_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-white dark:bg-gray-800 px-4 lg:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600 touch-target"
                  >
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                      <Volume2 className="w-4 lg:w-5 h-4 lg:h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">Audioguida</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">Ascolta la descrizione</span>
                    </div>
                  </a>
                )}

                {approfondimento?.video_lis_url && (
                  <button
                    onClick={scrollToVideo}
                    className="group flex items-center gap-3 bg-white dark:bg-gray-800 px-4 lg:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600 touch-target"
                  >
                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                      <PlayCircle className="w-4 lg:w-5 h-4 lg:h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">Video LIS</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">Lingua dei Segni</span>
                    </div>
                  </button>
                )}

                {approfondimento?.approfondimento_url && (
                  <a 
                    href={approfondimento.approfondimento_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 bg-white dark:bg-gray-800 px-4 lg:px-6 py-3 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600 touch-target"
                  >
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                      <BookOpen className="w-4 lg:w-5 h-4 lg:h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-gray-900 dark:text-white">CAA</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">Comunicazione Aumentativa</span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenuto principale */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Testo approfondito */}
        {(approfondimento?.testo_lungo || data.descrizione) && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 sm:h-8 bg-blue-500 rounded-full"></div>
              Descrizione dettagliata
            </h2>
            <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert">
              <p className="leading-relaxed">
                {approfondimento?.testo_lungo || data.descrizione}
              </p>
            </div>
          </div>
        )}

        {/* Video LIS */}
        {showVideo && approfondimento?.video_lis_url && videoId && (
          <div ref={videoRef} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 sm:h-8 bg-purple-500 rounded-full"></div>
                <span className="hidden sm:inline">Video in Lingua dei Segni Italiana</span>
                <span className="sm:hidden">Video LIS</span>
              </h2>
              <button
                onClick={() => setShowVideo(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 touch-target"
                aria-label="Chiudi video"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Video in Lingua dei segni italiana che descrive il reperto"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 italic">
              Questo video fornisce una descrizione del reperto in Lingua dei Segni Italiana per garantire l'accessibilità a tutti i visitatori.
            </p>
          </div>
        )}

        {/* Informazioni aggiuntive */}
        {(data.datazione || data.provenienza || data.materiale) && (
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8 border border-gray-200 dark:border-gray-600">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6 flex items-center gap-2">
              <div className="w-1 h-6 sm:h-8 bg-green-500 rounded-full"></div>
              Informazioni tecniche
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {data.datazione && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Datazione</h3>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 dark:text-white">{data.datazione}</p>
                </div>
              )}
              {data.provenienza && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Provenienza</h3>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 dark:text-white">{data.provenienza}</p>
                </div>
              )}
              {data.materiale && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-600">
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Materiale</h3>
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-900 dark:text-white">{data.materiale}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigazione reperti */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
          <NavigazioneReperti data={data} dataReperti={dataReperti} />
        </div>
      </div>
    </div>
  );
}
