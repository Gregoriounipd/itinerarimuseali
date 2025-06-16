import { motion } from 'framer-motion'

export default function HeroBanner({ scrollToId }) {
  const scrollToContent = () => {
    document.getElementById(scrollToId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen flex items-center justify-center text-white bg-black">
      <img
        src="images/imaginepcoseria.jpg" 
        alt="Collage Musei"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg"
        >
          Esplora la cultura museale
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
  )
}

