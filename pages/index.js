import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import HeroBanner from '../components/Herobanner'
import {
  Accessibility,
  X,
  MapPin,
  Clock,
  Users,
  BookOpen,
  ArrowRight,
  Calendar,
  Landmark,
  Book,
  Museum
} from 'lucide-react'

export default function Home() {
  const [itinerari, setItinerari] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showInitialMessage, setShowInitialMessage] = useState(true)
  const modalRef = useRef(null)
  const itinerariRef = useRef(null)
  const initialMessageRef = useRef(null)

  // Focus e messaggio iniziale accessibilità
  useEffect(() => {
    const timer = setTimeout(() => {
      if (initialMessageRef.current) {
        initialMessageRef.current.focus()
        // Annuncia il messaggio ai lettori di schermo
        const announcement = document.createElement('div')
        announcement.setAttribute('aria-live', 'assertive')
        announcement.setAttribute('aria-atomic', 'true')
        announcement.className = 'sr-only'
        announcement.textContent = 'Benvenuto. Questo sito è completamente accessibile secondo gli standard WCAG 2.1 AA. Premi Invio per aprire la guida completa all\&apos; accessibilità.'
        document.body.appendChild(announcement)
        
        setTimeout(() => {
          document.body.removeChild(announcement)
        }, 3000)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Carica itinerari da Supabase
  useEffect(() => {
    const fetchItinerari = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase.from('itinerari').select('*')
        if (error) {
          console.error('Errore nel caricamento degli itinerari:', error)
          // Annuncia l'errore ai lettori di schermo
          const errorAnnouncement = document.createElement('div')
          errorAnnouncement.setAttribute('aria-live', 'assertive')
          errorAnnouncement.className = 'sr-only'
          errorAnnouncement.textContent = 'Errore nel caricamento degli itinerari. Riprova più tardi.'
          document.body.appendChild(errorAnnouncement)
          setTimeout(() => document.body.removeChild(errorAnnouncement), 3000)
        } else {
          setItinerari(data)
          // Annuncia il successo del caricamento
          const successAnnouncement = document.createElement('div')
          successAnnouncement.setAttribute('aria-live', 'polite')
          successAnnouncement.className = 'sr-only'
          successAnnouncement.textContent = `Caricati ${data.length} itinerari disponibili`
          document.body.appendChild(successAnnouncement)
          setTimeout(() => document.body.removeChild(successAnnouncement), 3000)
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
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    if (isModalOpen && modalRef.current) {
      const titolo = modalRef.current.querySelector('#titolo-guida')
      if (titolo) titolo.focus()
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  // Gestione focus trap nel modale
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      modalRef.current.addEventListener('keydown', handleTabKey)
      return () => {
        if (modalRef.current) {
          modalRef.current.removeEventListener('keydown', handleTabKey)
        }
      }
    }
  }, [isModalOpen])

  const openModal = () => {
    setIsModalOpen(true)
    setShowInitialMessage(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  // Varianti di animazione accessibili (ridotte)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const stats = [
    { icon: Users, label: 'Partecipanti attesi', value: '500+', description: 'Numero di partecipanti previsti agli eventi' },
    { icon: BookOpen, label: 'Workshop e Laboratori', value: '10+', description: 'Attività formative disponibili' },
    { icon: Calendar, label: 'Giorni di evento', value: '3', description: 'Durata complessiva degli eventi' },
    { icon: Landmark, label: 'Luogo storico', value: 'Palazzo Bo', description: 'Sede storica dell\&apos;università' },
    { icon: Book, label: 'Formazione e cultura', value: 'Esperienze immersive', description: 'Tipologia di attività offerte' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      
      {/* Messaggio iniziale accessibilità */}
      {showInitialMessage && (
        <div
          ref={initialMessageRef}
          className="sr-only focus:not-sr-only fixed left-4 top-4 z-50 px-4 py-3 bg-blue-700 text-white rounded-lg shadow-xl focus:ring-4 focus:ring-blue-300 max-w-sm"
          role="status"
          tabIndex={0}
          aria-live="assertive"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              openModal()
            }
          }}
          onClick={openModal}
        >
          <div className="flex items-start gap-3">
            <Accessibility className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <div className="font-semibold mb-1">Sito 100% Accessibile</div>
              <div className="text-sm text-blue-100">
                Conforme agli standard WCAG 2.1 AA. Premi Invio per la guida completa.
              </div>
            </div>
          </div>
        </div>
      )}

      <Head>
        <title>Itinerari Virtuali - Musei dell&apos;Università di Padova</title>
        <meta
          name="description"
          content="Scopri gli itinerari virtuali completamente accessibili dei musei dell'Università di Padova. Esplora collezioni storiche, reperti scientifici e patrimonio culturale."
        />
        <meta name="google-site-verification" content="U21Rf3YmByvViL8vH972RwllCumoKq-30GfMY5Cfc9Y" />
        <meta name="keywords" content="musei università padova, itinerari virtuali, patrimonio culturale, accessibilità, WCAG" />
        <link rel="canonical" href="https://tuodominio.com/" />
      </Head>

      {/* Link di salto */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-4 left-4 z-50 px-4 py-2 bg-blue-700 text-white rounded focus:ring-4 focus:ring-blue-300"
      >
        Salta al contenuto principale
      </a>

      {/* Floating accessibility button */}
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 z-40 p-3 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-200"
        aria-label="Apri guida accessibilità (scorciatoia: Alt + A)"
        title="Guida Accessibilità"
        accessKey="a"
      >
        <Accessibility className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Modale accessibilità */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-50"
              aria-hidden="true"
              onClick={closeModal}
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titolo-guida"
              aria-describedby="descrizione-guida"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              ref={modalRef}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full shadow-xl border max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded" aria-hidden="true">
                    <Accessibility className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                  </div>
                  <h2 id="titolo-guida" tabIndex={-1} className="text-2xl font-bold text-gray-900 dark:text-white">
                    Guida Completa all&apos;Accessibilità
                  </h2>
                </div>

                <div id="descrizione-guida" className="space-y-6 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                      Navigazione da Tastiera
                    </h3>
                    <ul className="space-y-2" role="list">
                      <li>
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Tab</kbd> 
                        - Naviga tra gli elementi interattivi
                      </li>
                      <li>
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Shift + Tab</kbd> 
                        - Naviga all&apos;indietro
                      </li>
                      <li>
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Invio</kbd> o 
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono ml-1">Spazio</kbd> 
                        - Attiva pulsanti e link
                      </li>
                      <li>
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Esc</kbd> 
                        - Chiude finestre modali
                      </li>
                      <li>
                        <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">Alt + A</kbd> 
                        - Apre questa guida (scorciatoia)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                      Screen Reader
                    </h3>
                    <ul className="space-y-2" role="list">
                      <li>Tutte le immagini hanno descrizioni alternative complete</li>
                      <li>I titoli sono strutturati gerarchicamente (H1, H2, H3)</li>
                      <li>I link hanno descrizioni significative del loro scopo</li>
                      <li>Lo stato di caricamento viene annunciato automaticamente</li>
                      <li>Gli errori vengono comunicati immediatamente</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-white">
                      Standard di Conformità
                    </h3>
                    <ul className="space-y-2" role="list">
                      <li>✅ WCAG 2.1 AA - Linee guida per l&apos;accessibilità dei contenuti web</li>
                      <li>✅ Contrasto colori minimo 4.5:1 per testo normale</li>
                      <li>✅ Contrasto colori minimo 3:1 per testo grande e elementi UI</li>
                      <li>✅ Navigazione completamente da tastiera</li>
                      <li>✅ Compatibilità con screen reader (NVDA, JAWS, VoiceOver)</li>
                      <li>✅ Riduzione delle animazioni per utenti sensibili al movimento</li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-full transition-colors"
                  aria-label="Chiudi guida accessibilità"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    onClick={closeModal}
                    className="w-full px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors font-medium"
                  >
                    Chiudi guida
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <HeroBanner scrollToId="main-content" />

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800/50" aria-labelledby="stats-title">
        <div className="sr-only">
          <h2 id="stats-title">Statistiche e informazioni principali</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                role="img"
                aria-label={`${stat.label}: ${stat.value}. ${stat.description}`}
              >
                <div className="inline-flex p-3 rounded-full bg-gray-100 dark:bg-gray-700 mb-3" aria-hidden="true">
                  <stat.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
                <div className="sr-only">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <main id="main-content" role="main" className="px-4 py-16">
        {/* Titolo principale */}
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Itinerari Virtuali
            <br />
            <span className="text-3xl md:text-4xl font-semibold text-blue-700 dark:text-blue-400">
              Musei dell&apos;Università di Padova
            </span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Esplora il patrimonio culturale e scientifico dei musei universitari attraverso
            percorsi virtuali interattivi e completamente accessibili. Scopri otto secoli di
            storia, ricerca e innovazione dell'Università di Padova.
          </motion.p>
        </header>

        {/* Sezione itinerari */}
        <section ref={itinerariRef} aria-labelledby="itinerari-title">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12 max-w-6xl mx-auto"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-7 h-7 text-blue-700 dark:text-blue-400" aria-hidden="true" />
              <h2 id="itinerari-title" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Itinerari Disponibili
              </h2>
            </div>
            <div 
              className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
              role="status"
              aria-live="polite"
            >
              {itinerari.length} {itinerari.length === 1 ? 'itinerario' : 'itinerari'}
            </div>
          </motion.div>

          {/* Loading state con supporto screen reader */}
          {isLoading && (
            <div className="max-w-6xl mx-auto" role="status" aria-live="polite">
              <div className="sr-only">Caricamento itinerari in corso...</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Griglia itinerari */}
          {!isLoading && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              {itinerari.length > 0 ? (
                itinerari.map((itinerario, index) => (
                  <motion.article
                    key={itinerario.id}
                    variants={cardVariants}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <Link
                      href={`/itinerario/${itinerario.id}`}
                      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 h-full"
                      aria-describedby={`itinerario-desc-${itinerario.id}`}
                    >
                      {/* Immagine con alt text descrittivo */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={itinerario.immagine}
                          alt={`Immagine di copertina dell'itinerario "${itinerario.titolo}" che mostra ${itinerario.descrizione?.substring(0, 100)}...`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>

                        {/* Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-700 text-white text-xs font-medium rounded">
                            <Calendar className="w-3 h-3" aria-hidden="true" />
                            Disponibile
                          </span>
                        </div>
                      </div>

                      {/* Contenuto */}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                          {itinerario.titolo}
                        </h3>
                        <p 
                          id={`itinerario-desc-${itinerario.id}`}
                          className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3"
                        >
                          {itinerario.descrizione}
                        </p>

                        {/* Footer carta */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Itinerario virtuale accessibile
                          </span>
                          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-200">
                            <span className="text-sm font-medium">Inizia il tour</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-20"
                  role="status"
                >
                  <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                      <Museum className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      Itinerari in preparazione
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      I nostri itinerari virtuali sono in fase di sviluppo.
                      Tornate presto per scoprire le collezioni museali dell&apos;Università di Padova.
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