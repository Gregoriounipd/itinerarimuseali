import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import HeroBanner from '@/components/Herobanner'

export default function Home() {
  const [itinerari, setItinerari] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef(null)

  const itinerariRef = useRef(null)

  const scrollToItinerari = () => {
    if (itinerariRef.current) {
      itinerariRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  //Far leggere per primo il messaggio screenreader
  useEffect(() => {
    const accessBtn = document.getElementById("access-message");
    if (accessBtn) accessBtn.focus();
  }, []);


  // Carica itinerari da Supabase
  useEffect(() => {
    const fetchItinerari = async () => {
      const { data, error } = await supabase.from('itinerari').select('*')
      if (error) {
        console.error('Errore nel caricamento degli itinerari:', error)
      } else {
        setItinerari(data)
      }
    }
    fetchItinerari()
  }, [])
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    // Quando si apre la modale, metti il focus sul titolo
    if (isModalOpen && modalRef.current) {
      const titolo = modalRef.current.querySelector('#titolo-guida')
      if (titolo) titolo.focus()
    }

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])


  // Chiudi modale con Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div>
      <div
        id="access-message"
        className="sr-only focus:not-sr-only absolute left-2 top-2 bg-white text-black p-2 rounded shadow z-50"
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
        Questo sito è accessibile. Premi Invio per aprire la guida all&apos;accessibilità.
      
      
      </div><Head>
        <title>Itinerari Virtuali - Musei dell&apos;Università</title>
        <meta
          name="description"
          content="Esplora gli itinerari virtuali dei musei dell&apos;Università di Padova." />
          <meta name="google-site-verification" content="U21Rf3YmByvViL8vH972RwllCumoKq-30GfMY5Cfc9Y" />
      </Head><button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-gray-100 dark:bg-blue-600"
        aria-haspopup="dialog"
        aria-controls="guida-accessibilita"
      >
        Guida Accessibilità
      </button>

      {/* Modale accessibilità */ }
  {
    isModalOpen && (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titolo-guida"
        id="guida-accessibilita"
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        ref={modalRef}
      >
        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl relative dark:bg-blue-950 dark:text-gray-100">
          <h2 id="titolo-guida" tabIndex="-1" className="text-2xl font-sans mb-4">
            Guida all&apos;accessibilità
          </h2>
          <ul className="space-y-2">
            <li> Premi <strong>Tab</strong> per muoverti tra link e bottoni.</li>
            <li> Usa <strong>H</strong> per saltare ai titoli principali (con alcuni screen reader).</li>
            <li> C&apos;è un link nascosto all&apos;inizio della pagina per saltare subito al contenuto.</li>
            <li> Le immagini hanno testi alternativi.</li>
          </ul>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span aria-hidden="true">&times;</span>
            <span className="sr-only">Chiudi modale</span>
          </button>
        </div>
      </div>
    )
  }
      <HeroBanner scrollToId="contenuto" />

      <main id="contenuto" role="main" className="p-8">

        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 tracking-tight">
          <span className="bg-gradient-to-r from-red-900 to-red-600 text-transparent bg-clip-text dark:from-green-700 dark:to-green-400 text-transparent">
            Itinerari Musei Unipd
          </span>
        </h1>

        {/* Griglia itinerari con animazioni */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {itinerari.length > 0 ? (
            itinerari.map((itinerario, index) => (
              <motion.div
                key={itinerario.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/itinerario/${itinerario.id}`} legacyBehavior>
                  <a className="block">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
                      <img src={itinerario.immagine} alt={itinerario.titolo} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">{itinerario.titolo}</h2>
                        <p className="text-gray-600 dark:text-white">{itinerario.descrizione}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">Nessun itinerario disponibile</p>
          )}
        </div>
      </main>
    </div >
  )
}
