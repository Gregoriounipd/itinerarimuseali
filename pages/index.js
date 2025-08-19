import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import HeroBanner from '@/components/Herobanner'
import { 
  Accessibility, 
  X, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles,
  ArrowRight,
  Star,
  Calendar
} from 'lucide-react'

export default function Home() {
  const [itinerari, setItinerari] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const modalRef = useRef(null)
  const itinerariRef = useRef(null)

  const scrollToItinerari = () => {
    if (itinerariRef.current) {
      itinerariRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Focus accessibilità iniziale
  useEffect(() => {
    const accessBtn = document.getElementById("access-message");
    if (accessBtn) accessBtn.focus();
  }, []);

  // Carica itinerari da Supabase con loading state
  useEffect(() => {
    const fetchItinerari = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase.from('itinerari').select('*')
        if (error) {
          console.error('Errore nel caricamento degli itinerari:', error)
        } else {
          setItinerari(data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchItinerari()
  }, [])

  // Gestione modale accessibilità
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Focus management per modale
    if (isModalOpen && modalRef.current) {
      const titolo = modalRef.current.querySelector('#titolo-guida')
      if (titolo) titolo.focus()
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  // Varianti di animazione
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  }

  const stats = [
    { icon: MapPin, label: "Itinerari", value: itinerari.length, color: "text-blue-600" },
    { icon: Clock, label: "Sempre aperti", value: "24/7", color: "text-green-600" },
    { icon: Users, label: "Visitatori", value: "1000+", color: "text-purple-600" },
    { icon: Star, label: "Esperienza", value: "Premium", color: "text-yellow-600" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Skip link accessibilità migliorato */}
      <div
        id="access-message"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-50 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-xl focus:shadow-2xl transition-all duration-300 transform focus:scale-105"
        role="button"
        tabIndex={0}
        aria-live="assertive"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setIsModalOpen(true)
          }
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Accessibility className="w-4 h-4" />
          <span>Sito accessibile - Premi Invio per la guida</span>
        </div>
      </div>

      <Head>
        <title>Itinerari Virtuali - Musei dell&apos;Università di Padova</title>
        <meta
          name="description"
          content="Scopri gli affascinanti itinerari virtuali dei musei dell'Università di Padova. Esplora collezioni storiche, reperti scientifici e patrimonio culturale in modo interattivo e accessibile."
        />
        <meta name="google-site-verification" content="U21Rf3YmByvViL8vH972RwllCumoKq-30GfMY5Cfc9Y" />
        <meta name="keywords" content="musei università padova, itinerari virtuali, patrimonio culturale, accessibilità" />
      </Head>

      {/* Floating accessibility button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/25 focus:outline-none focus:ring-4 focus:ring-blue-400/50 transition-all duration-300"
        aria-haspopup="dialog"
        aria-controls="guida-accessibilita"
        aria-label="Apri guida accessibilità"
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* Modale accessibilità ridisegnata */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titolo-guida"
            id="guida-accessibilita"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            ref={modalRef}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full shadow-2xl relative dark:bg-gray-900/95 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/50">
                  <Accessibility className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 id="titolo-guida" tabIndex="-1" className="text-2xl font-bold text-gray-900 dark:text-white">
                  Guida Accessibilità
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Premi <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono dark:bg-gray-800">Tab</kbd> per navigare tra elementi interattivi</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Usa <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono dark:bg-gray-800">H</kbd> per saltare tra i titoli (screen reader)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Link di salto rapido disponibili all&apos;inizio di ogni pagina</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Tutte le immagini hanno descrizioni alternative complete</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Contrasti conformi alle linee guida WCAG 2.1</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg transition-colors dark:hover:text-gray-200"
                aria-label="Chiudi guida accessibilità"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Perfetto, iniziamo!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <HeroBanner scrollToId="contenuto" />

      {/* Stats Section */}
      <section className="py-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 dark:bg-gray-800/70 dark:border-gray-700/30"
              >
                <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${
                  stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50' :
                  stat.color === 'text-green-600' ? 'from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50' :
                  stat.color === 'text-purple-600' ? 'from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50' :
                  'from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50'
                } mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color} dark:text-white`} />
                </div>
                <div className={`text-2xl font-bold ${stat.color} dark:text-white mb-1`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <main id="contenuto" role="main" className="px-4 pb-20">
        {/* Titolo principale ridisegnato */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-purple-400 dark:to-blue-400">
              Itinerari Virtuali
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-100 text-4xl md:text-5xl font-bold">
              Musei UniPD
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Esplora le meraviglie dei musei universitari di Padova attraverso percorsi interattivi, 
            accessibili e coinvolgenti. Scopri secoli di storia, scienza e cultura.
          </motion.p>
        </motion.section>

        {/* Sezione itinerari */}
        <section ref={itinerariRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12 max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Scopri gli Itinerari
              </h2>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {itinerari.length} {itinerari.length === 1 ? 'itinerario disponibile' : 'itinerari disponibili'}
            </div>
          </motion.div>

          {/* Loading state migliorato */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-2xl mb-4"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Griglia itinerari ridisegnata */}
          {!isLoading && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {itinerari.length > 0 ? (
                itinerari.map((itinerario, index) => (
                  <motion.div
                    key={itinerario.id}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -12, 
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                    onHoverStart={() => setHoveredCard(itinerario.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="group perspective-1000"
                  >
                    <Link
                      href={`/itinerario/${itinerario.id}`}
                      className="block"
                    >
                      <article className="relative bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-3xl shadow-xl border border-white/30 dark:border-gray-700/30 overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
                        {/* Badge premium */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-full shadow-lg">
                            <Star className="w-3 h-3" />
                            Premium
                          </span>
                        </div>

                        {/* Immagine con overlay dinamico */}
                        <div className="relative h-56 overflow-hidden">
                          <img 
                            src={itinerario.immagine} 
                            alt={`Copertina itinerario: ${itinerario.titolo}`}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                          
                          {/* Overlay content */}
                          <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-300 ${
                            hoveredCard === itinerario.id ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                          }`}>
                            <div className="flex items-center gap-2 text-white text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>Sempre accessibile</span>
                            </div>
                          </div>
                        </div>

                        {/* Contenuto carta */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {itinerario.titolo}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                            {itinerario.descrizione}
                          </p>
                          
                          {/* CTA */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                              Inizia il tour
                            </span>
                            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform duration-300">
                              <span className="text-sm font-semibold">Esplora</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* Glow effect su hover */}
                        <div className={`absolute inset-0 rounded-3xl transition-opacity duration-300 ${
                          hoveredCard === itinerario.id ? 'opacity-20' : 'opacity-0'
                        } bg-gradient-to-r from-purple-500 via-transparent to-blue-500 pointer-events-none`}></div>
                      </article>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-12 h-12 text-purple-500 dark:text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Itinerari in arrivo
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Stiamo preparando fantastici itinerari virtuali. Torna presto per scoprirli!
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </section>
      </main>
    </div>
  )
}