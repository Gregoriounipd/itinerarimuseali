import Link from 'next/link';

export default function NavigazioneReperti({ data, dataReperti }) {
  if (!data || !dataReperti) return null;


  // Filtra i reperti dello stesso itinerario
  const repertiFiltrati = [...dataReperti]
    .filter(r => r.itinerario_id === data.itinerario_id);

  

  // Ordina i reperti per 'ordine'
  const repertiOrdinati = repertiFiltrati.sort((a, b) => a.numero_marker - b.numero_marker);

  

  const currentIndex = repertiOrdinati.findIndex(r => r.id === data.id);
  const precedente = repertiOrdinati[currentIndex - 1];
  const successivo = repertiOrdinati[currentIndex + 1];

  

  return (
    <div className="mt-10 flex justify-between items-center gap-4">
      {precedente ? (
        <Link href={`/reperto/${precedente.slug}`}>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            ← {precedente.nome}
          </button>
        </Link>
      ) : <div />}

      {successivo ? (
        <Link href={`/reperto/${successivo.slug}`}>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            {successivo.nome} →
          </button>
        </Link>
      ) : <div />}
    </div>
  );
}