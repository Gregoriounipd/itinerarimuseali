'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
    }, 5000); // Cambia immagine ogni 5 secondi

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative h-screen flex items-center justify-center text-white bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Immagine Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg"
        >
          Esplora i <br /> percorsi museali
        </motion.h1>
        <motion.button
          onClick={scrollToContent}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition"
        >
          Scopri gli itinerari ↓
        </motion.button>
      </div>
    </section>
  );
}
