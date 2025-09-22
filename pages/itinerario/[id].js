//pages/[id].js
import Footer from '../../components/Footer';
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '../../lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, MapPin, Eye, Sparkles, ChevronDown } from 'lucide-react'

const ItinerarioMap = dynamic(() => import('../../components/ItinerarioMap'), {
  ssr: false,
})

export default function Itinerario() {
  const router = useRouter()
  const { id } = router.query
  const [itinerario, setItinerario] = useState(null)
  const [reperti, setReperti] = useState([])
  const [selectedRepertoId, setSelectedRepertoId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const repertiRef = useRef(null)
  const isMostraModelli = id === 'ed9b295c-13d1-4ab5-a620-2294c8d3fac9'

  // Theme dinamico basato sul progetto
  const theme = {
    bg: isMostraModelli
      ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      : "bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800",
    cardBg: isMostraModelli
      ? 'bg-slate-800/90 backdrop-blur-sm border-slate-700'
      : 'bg-white/80 backdrop-blur-sm dark:bg-gray-800/80',
    textPrimary: isMostraModelli ? 'text-white' : 'text-gray-900 dark:text-white',
    textSecondary: isMostraModelli ? 'text-blue-200' : 'text-gray-600 dark:text-gray-300',
    accent: isMostraModelli ? 'from-blue-500 to-indigo-500' : 'from-blue-600 to-purple-600',
    ringColor: isMostraModelli ? 'ring-blue-400/50' : 'ring-purple-400/50',
    selectedBadge: isMostraModelli ? 'bg-blue-500' : 'bg-purple-500'
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const { data: itinerarioData, error: itinerarioError } = await supabase
          .from('itinerari')
          .select('*')
          .eq('id', id)
          .single()

        if (itinerarioError) {
          console.error("Errore nell'itinerario:", itinerarioError)
          return
        }
        setItinerario(itinerarioData)

        const { data: repertiData, error: repertiError } = await supabase
          .from('reperti')
          .select('*')
          .eq('itinerario_id', id)
          .order('numero_marker', { ascending: true })

        if (repertiError) {
          console.error('Errore nei reperti:', repertiError)
          return
        }
        setReperti(repertiData)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  const handleMarkerClick = (id) => {
    setSelectedRepertoId(id)
    const card = document.getElementById(`card-${id}`)
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Effetto pulsa per attirare l'attenzione
      card.classList.add('animate-pulse')
      setTimeout(() => card.classList.remove('animate-pulse'), 2000)
    }
  }

  const handleSkipToReperti = () => {
    repertiRef.current?.scrollIntoView({ behavior: 'smooth' })
    repertiRef.current?.focus()
  }

  // Loading state migliorato
  if (isLoading) {
    return (
      <div className={`min-h-screen w-full ${theme.bg} flex items-center justify-center`}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-500" />
          </div>
          <h2 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>Caricamento itinerario...</h2>
          <p className={theme.textSecondary}>Preparando la tua esperienza</p>
        </motion.div>
      </div>
    )
  }

  if (!itinerario) {
    return (
      <div className={`min-h-screen w-full ${theme.bg} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${theme.textPrimary} mb-2`}>Itinerario non trovato</h2>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Torna indietro
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen w-full ${theme.bg} ${isMostraModelli ? "bg-[url('/images/fondalecalendario.jpg')] bg-repeat bg-fixed" : ""}`}>
      {/* Skip link migliorato */}
      <a
        href="#reperti"
        onClick={(e) => { e.preventDefault(); handleSkipToReperti(); }}
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg focus:shadow-xl transition-all duration-300 transform focus:scale-105"
      >
        Salta alla lista reperti ⬇️
      </a>

      {/* Back button flottante */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 right-6 z-40 p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl group"
        aria-label="Torna agli itinerari"
      >
        <ArrowLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="relative">
        {/* HERO SECTION MIGLIORATO */}
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
          {/* Immagine con parallax effect */}
          <div className="absolute inset-0">
            <img
              src={itinerario.immagine_copertina || '/fallback.jpg'}
              alt={`Panoramica: ${itinerario.titolo}`}
              className="w-full h-full object-cover transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
          </div>

          {/* Contenuto hero */}
          <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                {itinerario.titolo}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed max-w-3xl">
                {itinerario.descrizione}
              </p>

              {/* CTA Button per Mostra Modelli */}
              {isMostraModelli && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => router.push('/progetto-mostra-modelli')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Scopri il progetto
                    <ChevronDown className="w-4 h-4 group-hover:transform group-hover:translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              )}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center text-white/80">
                <span className="text-sm mb-2">Esplora</span>
                <ChevronDown className="w-6 h-6 animate-bounce" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* CONTENUTO PRINCIPALE */}
        <div className="relative -mt-20 z-10">
          {/* MAPPA SECTION */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-4 mb-12"
          >
            <div className={`${theme.cardBg} rounded-3xl shadow-2xl p-6 md:p-8 border`}>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-500" />
                <h2 className={`text-2xl font-bold ${theme.textPrimary}`}>
                  Esplora la mappa interattiva
                </h2>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <ItinerarioMap
                  reperti={reperti}
                  onMarkerClick={handleMarkerClick}
                  selectedRepertoId={selectedRepertoId}
                />
              </div>
            </div>
          </motion.section>

          {/* SEZIONE REPERTI */}
          <section className="px-4 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Eye className="w-8 h-8 text-blue-500" />
                <h2 className={`text-4xl md:text-5xl font-bold ${theme.textPrimary}`}>
                  Scopri i reperti
                </h2>
              </div>
              <p className={`text-lg ${theme.textSecondary} max-w-2xl mx-auto`}>
                Clicca sui marker della mappa o esplora direttamente la collezione qui sotto
              </p>
            </motion.div>

            {/* GRIGLIA REPERTI MIGLIORATA */}
            <div
              id="reperti"
              ref={repertiRef}
              tabIndex="-1"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              <AnimatePresence>
                {reperti
                  .filter(reperto => !['Crani-frenologici', 'Modelli-di-foraminiferi'].includes(reperto.slug))
                  .map((reperto, index) => (
                    <motion.div
                      key={reperto.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    >
                      <Link
                        href={`/reperto/${reperto.slug}`}
                        id={`card-${reperto.id}`}
                        className={`group relative block ${theme.cardBg} rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border ${selectedRepertoId === reperto.id ? `ring-4 ${theme.ringColor} ring-offset-4 ring-offset-transparent` : ''}`}
                        aria-label={`Scopri il reperto: ${reperto.nome}`}
                      >
                        {/* Badge selezionato */}
                        {selectedRepertoId === reperto.id && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`absolute top-4 right-4 ${theme.selectedBadge} text-white text-xs px-3 py-1 rounded-full z-20 shadow-lg font-medium`}
                          >
                            ✨ Selezionato
                          </motion.span>
                        )}

                        {/* Immagine con overlay */}
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={reperto.immagine}
                            alt={reperto.descrizione_immagine || `Reperto: ${reperto.nome}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Overlay con info quick */}
                          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="inline-block px-3 py-1 bg-white/90 text-gray-900 text-sm rounded-full backdrop-blur-sm">
                              Clicca per esplorare →
                            </span>
                          </div>
                        </div>

                        {/* Contenuto carta */}
                        <div className="p-6">
                          <h3 className={`font-bold text-xl mb-3 ${theme.textPrimary} group-hover:text-blue-600 transition-colors duration-300`}>
                            {reperto.nome}
                          </h3>
                          <p className={`text-sm leading-relaxed ${theme.textSecondary} line-clamp-3`}>
                            {reperto.descrizione}
                          </p>

                          {/* Freccia indicatrice */}
                          <div className="mt-4 flex justify-end">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <ChevronDown className="w-4 h-4 text-white transform rotate-[-90deg]" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}

              </AnimatePresence>
            </div>

            {/* Empty state se non ci sono reperti */}
            {reperti.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                </div>
                <h3 className={`text-xl font-semibold ${theme.textPrimary} mb-2`}>
                  Nessun reperto disponibile
                </h3>
                <p className={theme.textSecondary}>
                  I reperti per questo itinerario saranno disponibili presto
                </p>
              </motion.div>
            )}
          </section>
        </div>

        <Footer isMostraModelli={isMostraModelli} />
      </div>
    </div>
  )
}
