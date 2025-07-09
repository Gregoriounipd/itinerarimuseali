import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';


const faq = [
  {
    domanda: 'Stato di conformità',
    risposta:
      'Il sito è conforme ai principali requisiti WCAG 2.1 livello AA. Tuttavia, ci impegniamo a migliorarlo costantemente.',
  },
  {
    domanda: 'Screen-reader e navigazione da tastiera',
    risposta:
      'Tutti i contenuti sono leggibili con screen reader. È possibile navigare tramite tastiera usando Tab, Enter e Esc.',
  },
  {
    domanda: 'Profili di disabilità supportati',
    risposta:
      'Il sito è pensato per utenti con disabilità visive, motorie e cognitive. I testi sono chiari, scalabili, ben contrastati.',
  },
  {
    domanda: 'Regolazioni dell’interfaccia utente',
    risposta:
      'Supportiamo la dark mode, il focus visibile, e la navigazione semplificata per utenti con difficoltà.',
  },
  {
    domanda: 'Tecnologie assistive e compatibilità',
    risposta:
      'Testato con VoiceOver, NVDA, TalkBack. Compatibile con i browser moderni e i principali sistemi operativi.',
  },
  {
    domanda: 'Commenti e segnalazioni',
    risposta:
      'Scrivi a accessibilita@unipd.it per segnalare problemi o darci un consiglio. Le segnalazioni sono benvenute!',
  },
]
export default function Accessibility() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <Head>
        <title>Accessibility Act - Itinerari Virtuali</title>
      </Head>
      <main className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold mb-4">Accessibilità del sito</h1>
        <div className="mb-8">
          <img
            src="/images/banner-luce.png"
            alt="Disegno per accessibilità in modalità chiara"
            className="w-full max-h-64 object-cover rounded-xl shadow-md dark:hidden"
          />
          <img
            src="/images/banner-scuro.png"
            alt="Banner per accessibilità in modalità scura"
            className="w-full max-h-64 object-cover rounded-xl shadow-md hidden dark:block"
          />
        </div>

        <p className="text-lg mb-4">
          Questo sito nasce con l&apos;obiettivo di essere accessibile a tutte le persone,
          indipendentemente dalle loro capacità, dispositivi o modalità di navigazione.
        </p>
        <p className="text-lg mb-4">
          L&apos;<strong>Accessibility Act</strong> è una legge europea che richiede a molti siti web di rispettare determinati criteri.
          Noi, però, non aspettiamo obblighi: <strong>lavoriamo per l&apos;accessibilità da prima</strong>, per scelta e responsabilità sociale.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Domande frequenti</h2>

        <div className="space-y-4">
          {faq.map((item, index) => (
            <div key={index} className="border rounded-lg bg-white dark:bg-gray-800">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left p-4 font-medium text-lg flex justify-between items-center focus:outline-none"
              >
                {item.domanda}
                <span className="ml-4">{activeIndex === index ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden px-4 pb-4 text-gray-700 dark:text-gray-300"
                  >
                    {item.risposta}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}