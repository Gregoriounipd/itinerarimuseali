'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroBanner({ scrollToId }) {
  const scrollToContent = () => {
    document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const images = [
    '/images/herobanner/astropole.png',
    '/images/herobanner/minemnu.jpg',
    '/images/herobanner/tartas.jpg',
    '/images/herobanner/geospecchio.png'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-white bg-gray-900 overflow-hidden">
      
      {/* Slideshow delle immagini */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={`Collezione museale ${index + 1} - Università di Padova`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay scuro per migliorare leggibilità */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenuto principale */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            <span className="block text-white/90">Musei dell&apos;Università</span>
            <span className="block text-blue-300 font-semibold">di Padova</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto">
            Ottoocento secoli di storia, cultura e ricerca scientifica.<br />
            Esplora le nostre collezioni attraverso percorsi virtuali accessibili.
          </p>
        </motion.div>

        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50"
          aria-label={`Scorri alla sezione degli itinerari`}
        >
          <span>Esplora gli Itinerari</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>

        {/* Indicatori immagini */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center gap-2 mt-8"
        >
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Vai all'immagine ${i + 1}`}
            />
          ))}
          </motion.div>
        </div>
      

      {/* Informazioni istituzionali */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-8 right-8 z-10"
      >
        <div className="flex justify-between items-end max-w-6xl mx-auto">
          <div className="text-left">
            <div className="text-white/60 text-sm uppercase tracking-wider mb-1">
              Dal 1222
            </div>
            <div className="text-white text-lg font-semibold">
              Centro di Ateneo per i Musei - UniPd
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-white/60 text-sm">
              Patrimonio culturale e scientifico di Ateneo
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}