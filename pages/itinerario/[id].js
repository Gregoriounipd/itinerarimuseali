import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'
import { NavigazioneReperti } from "@/components/NavigazioneReperti"

const ItinerarioMap = dynamic(() => import('../../components/ItinerarioMap'), {
  ssr: false,
})

export default function Itinerario() {
  const router = useRouter()
  const { id } = router.query
  const [itinerario, setItinerario] = useState(null)
  const [reperti, setReperti] = useState([])
  const [selectedRepertoId, setSelectedRepertoId] = useState(null)
  const repertiRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: itinerarioData, error: itinerarioError } = await supabase
        .from('itinerari')
        .select('*')
        .eq('id', id)
        .single()

      if (itinerarioError) console.error("Errore nell'itinerario:", itinerarioError)
      else setItinerario(itinerarioData)

      const { data: repertiData, error: repertiError } = await supabase
        .from('reperti')
        .select('*')
        .eq('itinerario_id', id)

      if (repertiError) console.error('Errore nei reperti:', repertiError)
      else setReperti(repertiData)
    }

    if (id) fetchData()
  }, [id])

  const handleMarkerClick = (id) => {
    setSelectedRepertoId(id)
    const card = document.getElementById(`card-${id}`)
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center' })
      card.focus()
    }
  }

  const handleSkipToReperti = () => {
    const section = repertiRef.current
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      section.focus()
    }
  }

  if (!itinerario) {
    return <div>Caricamento...</div>
  }

  return (
    <div className="p-8">
      {/* 🆕 LINK ACCESSIBILE PER SKIPPARE */}
      <button
        onClick={handleSkipToReperti}
        className="sr-only focus:not-sr-only absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Salta la mappa e vai ai reperti
      </button>

      {/* 🆕 ANNUNCIO PER SCREEN READER */}
      <div aria-live="assertive" className="sr-only">
        Questa è la seconda pagina. Premi invio per saltare direttamente alla lista dei reperti.
      </div>

      {/* HEADER */}
      <section className="relative mb-12 shadow-xl rounded-3xl overflow-hidden">
        <img
          src={itinerario.immagine_copertina || '/fallback.jpg'}
          alt={`Copertina: ${itinerario.titolo}`}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">{itinerario.titolo}</h1>
          <p className="mt-2 text-lg italic max-w-3xl">{itinerario.descrizione}</p>
        </div>
      </section>

      {/* MAPPA */}
      <div className="mb-8">
        <ItinerarioMap
          reperti={reperti}
          onMarkerClick={handleMarkerClick}
          selectedRepertoId={selectedRepertoId}
        />
      </div>

      {/* TITOLO */}
      <motion.h2
        className="text-3xl font-extrabold text-gray-800 mb-6 text-center dark:text-gray-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Guardiamo più da vicino
      </motion.h2>

      {/* GRIGLIA REPERTI */}
      <div
        id="reperti"
        ref={repertiRef}
        tabIndex="-1" // 👈 serve per il focus accessibile
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {reperti.map((reperto, index) => (
          <motion.div
            key={reperto.id}
            id={`card-${reperto.id}`}
            role="listitem"
            tabIndex="0"
            aria-label={`Reperto: ${reperto.nome}`}
            onClick={() => setSelectedRepertoId(reperto.id)}
            className={`relative bg-white border rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden cursor-pointer ${selectedRepertoId === reperto.id ? 'ring-4 ring-blue-400' : ''
              }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {selectedRepertoId === reperto.id && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10 shadow">
                Selezionato
              </span>
            )}
            <img
              src={reperto.immagine}
              alt={reperto.descrizione_immagine || `Immagine del reperto: ${reperto.nome}`}
              className="h-48 w-full object-cover rounded-t-2xl"
            />
            <div className="bg-white text-gray-800 dark:bg-gray-800 border dark:border-gray-700 dark:text-gray-100">
              <h3 className="font-bold text-lg">{reperto.nome}</h3>
              <p className="text-sm">{reperto.descrizione}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PULSANTE RITORNO */}
      <button
        onClick={() => router.back()}
        className="mt-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Torna agli Itinerari
      </button>
    </div>
  )
}
