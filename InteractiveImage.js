import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";

export default function InteractiveImage({ imageUrl }) {
  const [reperti, setReperti] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchReperti() {
      const { data, error } = await supabase.from("reperti").select("*");
      if (error) console.error(error);
      else setReperti(data);
    }
    fetchReperti();
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* IMMAGINE DELLA MAPPA */}
      <img src={imageUrl} alt="Mappa" className="w-full h-auto rounded-lg shadow-md" />

      {/* POPUP DEI REPERTI */}
      {popupData && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/60">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm text-center relative">
            <h2 className="text-lg font-bold">{popupData.titolo}</h2>
            <p className="mt-2">{popupData.descrizione}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-md"
              onClick={() => router.push(`/reperto/${popupData.id}`)}
            >
              Scopri di più
            </button>
            <button
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded-md"
              onClick={() => setPopupData(null)}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
