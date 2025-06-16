import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DettaglioReperto() {
  const router = useRouter();
  const { id } = router.query;
  const [reperto, setReperto] = useState(null);
  const [repertiStessoItinerario, setRepertiStessoItinerario] = useState([]);
  const [prossimoReperto, setProssimoReperto] = useState(null);


  useEffect(() => {

    async function fetchReperto() {
      if (!id) return;

      const { data, error } = await supabase.from("reperti_specifici").select("*").eq("id", parseInt(id)).single();
      if (error) {
        console.error("Errore nel caricamento:", error);
        return;
      }

      setReperto(data);
      const { data: altriReperti, error: errorReperti } = await supabase
        .from("reperti_specifici")
        .select("id, titolo, itinerario_id")
        .eq("itinerario_id", data.itinerario_id)
        .order("id", { ascending: true }); // se hai un campo tipo "ordine", metti order("ordine")

      if (errorReperti) {
        console.error("Errore nel caricamento altri reperti:", errorReperti);
        return;
      }

      const indexCorrente = altriReperti.findIndex(r => r.id === data.id);
      const prossimoRepertoTemp = altriReperti[indexCorrente + 1];

      if (prossimoRepertoTemp) { setProssimoReperto(prossimoRepertoTemp);
    } else {
      setProssimoReperto(null);
    }
  }


    fetchReperto();
}, [id]);

if (!reperto) return <p>Caricamento...</p>;

return (
  <div className="max-w-2xl mx-auto p-6">
    <h1 className="text-2xl font-bold">{reperto.titolo}</h1>
    <img src={reperto.immagine} alt={reperto.titolo} className="w-full h-auto rounded-lg mt-4" />

    <p className="mt-4 text-gray-700 italic">{reperto.testo_breve}</p>
    <p className="mt-2 text-gray-900">{reperto.testo_lungo}</p>

    <div className="mt-6 flex justify-between">
      <button
        onClick={() => router.back()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        ← Torna all'Itinerario
      </button>

      {prossimoReperto ? (
        <button
          onClick={() => router.push(`/reperto/${prossimoReperto.id}`)}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md ml-4 hover:bg-green-700 transition-all"
        >
          Vai al prossimo reperto → {prossimoReperto.titolo}
        </button>
      ) : (
        <p className="mt-4 text-sm text-gray-500">Hai raggiunto l'ultimo reperto.</p>
      )}
    </div>
  </div>
);
}

