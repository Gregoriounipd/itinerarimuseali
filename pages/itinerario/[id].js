import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '../../lib/supabase'
import { motion } from 'framer-motion'

const ItinerarioMap = dynamic(() => import('../../components/ItinerarioMap'), {
  ssr: false,
})

export default function Itinerario() {
  const router = useRouter()
  const { id } = router.query
  const [itinerario, setItinerario] = useState(null)
  const [reperti, setReperti] = useState([])
  const [selectedRepertoId, setSelectedRepertoId] = useState(null)

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

  if (!itinerario) {
    return <div>Caricamento...</div>
  }

  return (
    <div className="p-8">
      {/* Header immagine + overlay */}
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
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        Questa è la seconda pagina. Sotto la mappa c&apos;è una griglia con tutti i reperti. Premi invio per saltare direttamente li. 

      </div>

      {/* Mappa interattiva */}
      <div className="mb-8">
        <ItinerarioMap
          reperti={reperti}
          onMarkerClick={handleMarkerClick}
          selectedRepertoId={selectedRepertoId}
        />
      </div>

      {/* Titolo sezione reperti */}
      <motion.h2
        className="text-3xl font-extrabold text-gray-800 mb-6 text-center dark:text-gray-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Guardiamo più da vicino
      </motion.h2>

      {/* Griglia card dei reperti */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            {/* Badge “Selezionato” */}
            {selectedRepertoId === reperto.id && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full z-10 shadow">
                Selezionato
              </span>
            )}

            {/* Immagine con alt descrittivo */}
            <img
              src={reperto.immagine}
              alt={reperto.descrizione_immagine || `Immagine del reperto: ${reperto.nome}`}
              className="h-48 w-full object-cover rounded-t-2xl"
            />

            {/* Testi */}
            <div className="bg-white text-gray-800 dark:bg-gray-800 border dark:border-gray-700 dark:text-gray-100">
              <h3 className="font-bold text-lg">{reperto.nome}</h3>
              <p className="text-sm">{reperto.descrizione}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pulsante ritorno */}
      <button
        onClick={() => router.back()}
        className="mt-10 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Torna agli Itinerari
      </button>
    </div>
  )
}

