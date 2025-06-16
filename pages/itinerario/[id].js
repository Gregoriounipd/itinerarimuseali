import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '../../lib/supabase';
import { motion } from 'framer-motion';

const ItinerarioMap = dynamic(() => import('../../components/ItinerarioMap'), {
  ssr: false,
});

export default function Itinerario() {
  const router = useRouter();
  const { id } = router.query;
  const [itinerario, setItinerario] = useState(null);
  const [reperti, setReperti] = useState([]);
  const [selectedRepertoId, setSelectedRepertoId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: itinerarioData, error: itinerarioError } = await supabase
        .from('itinerari')
        .select('*')
        .eq('id', id)
        .single();

      if (itinerarioError) console.error('Errore nel caricamento dell\'itinerario:', itinerarioError);
      else setItinerario(itinerarioData);

      const { data: repertiData, error: repertiError } = await supabase
        .from('reperti')
        .select('*')
        .eq('itinerario_id', id);

      if (repertiError) console.error('Errore nel caricamento dei reperti:', repertiError);
      else setReperti(repertiData);
    };

    if (id) fetchData();
  }, [id]);

  const handleMarkerClick = (id) => {
    setSelectedRepertoId(id);
    const card = document.getElementById(`card-${id}`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      card.focus();
    }
  };

  if (!itinerario) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="p-8">
      <section className="relative mb-12 shadow-xl rounded-3xl overflow-hidden">
        <img
          src={itinerario.immagine_copertina || '/fallback.jpg'}
          alt={itinerario.titolo}
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-extrabold">{itinerario.titolo}</h1>
          <p className="mt-2 text-lg italic max-w-3xl">{itinerario.descrizione}</p>
        </div>
      </section>


      <div className="mb-8">
        <ItinerarioMap
          reperti={reperti}
          onMarkerClick={handleMarkerClick}
          selectedRepertoId={selectedRepertoId}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Guardiamo più da vicino
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reperti.map((reperto, index) => (
            <motion.div
              key={index}
              id={`card-${reperto.id}`}
              role="listitem"
              tabIndex="0"
              aria-label={`Reperto: ${reperto.nome}`}
              className={`bg-white border rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 ${selectedRepertoId === reperto.id ? 'ring-4 ring-blue-400' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedRepertoId(reperto.id)}
            >
              <img
                src={reperto.immagine}
                alt={reperto.nome}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{reperto.nome}</h3>
                <p className="text-sm text-gray-600 line-clamp-4">{reperto.descrizione}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <button
        onClick={() => router.back()}
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Torna agli Itinerari
      </button>
    </div >
  );
}
