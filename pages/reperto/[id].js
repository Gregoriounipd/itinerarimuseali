import NavigazioneReperti from '@/components/NavigazioneReperti';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps({ params }) {
  const { id } = params;

  // ✅ 1. Recupera il reperto base da 'reperti' tramite id (uuid)
  const { data, error } = await supabase
    .from('reperti')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return { notFound: true };
  }

  // ✅ 2. Recupera approfondimento da 'reperti_specifici'
  // Usando un campo comune (es. numero_marker === ordine) se ce l’hai
  const { data: approfondimento, error: errorApprofondimento } = await supabase
    .from('reperti_specifici')
    .select('*')
    .eq('ordine', data.numero_marker) // ← o un altro campo che combacia
    .single();

  // ✅ 3. Recupera tutti i reperti per la navigazione
  const { data: dataReperti, error: errorReperti } = await supabase
    .from('reperti')
    .select('*');

  if (errorReperti) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      approfondimento: approfondimento || null,
      dataReperti,
    },
  };
}



export default function RepertoPage({ data, approfondimento, dataReperti }) {
  return (
    <div className="px-4 py-8 max-w-4xl mx-auto space-y-8">
      {/* Titolo */}
      <h1 className="text-3xl font-bold text-center">{data.nome}</h1>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        {approfondimento?.audioguida_url && (
          <audio controls preload="none" className="w-full sm:w-auto">
            <source src={approfondimento.audioguida.url} type="audio/mpeg " />
            Il tuo browser non supporta l'elemento audio.
          </audio>
        )}
        {approfondimento?.video_lis_url && (
          <a
            href={approfondimento.video_lis_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block">
              
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Guarda video in LIS
            </button>
          </a>
        )}


        {approfondimento?.approfondimento_url && (
          <a
            href={approfondimento.approfondimento_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              CAA
            </button>
          </a>
        )}
      </div>


      {/* Immagine */}
      <div className="flex justify-center">
        <img
          src={approfondimento?.immagine || data.immagine}
          alt={data.descrizione_immagine || 'Immagine reperto'}
          className="max-h-[400px] w-auto rounded shadow-lg object-contain"
        />
      </div>

      {/* Testo lungo o descrizione */}
      <div className="prose prose-lg max-w-none">
        <p>{approfondimento?.testo_lungo || data.descrizione}</p>
      </div>



      {/* Navigazione */}
      <div className="pt-8 border-t">
        <NavigazioneReperti data={data} dataReperti={dataReperti} />
      </div>
    </div>
  );
}
