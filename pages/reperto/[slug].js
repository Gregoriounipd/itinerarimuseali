import NavigazioneReperti from '@/components/NavigazioneReperti';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ Server-side data fetching
export async function getServerSideProps({ params }) {
  const { slug } = params;

  // Recupera il reperto base da 'reperti' tramite slug
  const { data, error } = await supabase
    .from('reperti')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { notFound: true };
  }

  // Recupera approfondimento da 'reperti_specifici'
  const { data: approfondimento, error: errorApprofondimento } = await supabase
    .from('reperti_specifici')
    .select('*')
    .eq('ordine', data.numero_marker)
    .single();

  // Recupera tutti i reperti per la navigazione
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

// ✅ Componente principale della pagina
export default function RepertoPage({ approfondimento, data, dataReperti }) {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    if (approfondimento?.video_lis_url) {
      const urlObj = new URL(approfondimento.video_lis_url);
      const id = urlObj.searchParams.get("v");
      setVideoId(id);
    }
  }, [approfondimento]);

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mt-10 mb-6">{data.nome}</h2>

      <div className="flex justify-center mt-8">
        <img
          src={approfondimento?.immagine || data.immagine}
          alt={data.descrizione_immagine || 'Immagine reperto'}
          className="max-h-[400px] w-auto rounded shadow-lg object-contain"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        {/* Audioguida */}
        {approfondimento?.audioguida_url && (
          <a href={approfondimento.audioguida_url} target="_blank" rel="noopener noreferrer">
            <img src="/images/logo_cuffie.png" alt="Ascolta audioguida" className="h-12 w-auto hover:opacity-80 cursor-pointer" />
          </a>
        )}

        {/* Video LIS */}
        {approfondimento?.video_lis_url && (
          <a href={approfondimento.video_lis_url} target="_blank" rel="noopener noreferrer">
            <img src="/images/logo_lis.png" alt="Guarda video in LIS" className="h-12 w-auto hover:opacity-80 cursor-pointer" />
          </a>
        )}

        {/* CAA */}
        {approfondimento?.approfondimento_url && (
          <a href={approfondimento.approfondimento_url} target="_blank" rel="noopener noreferrer">
            <img src="/images/logo_caa.png" alt="Apri approfondimento in CAA" className="h-12 w-auto hover:opacity-80 cursor-pointer" />
          </a>
        )}
      </div>

      <div className="prose prose-lg max-w-none mt-6">
        <p>{approfondimento?.testo_lungo || data.descrizione}</p>
      </div>

      {approfondimento?.video_embed && (
        <figure className="my-6">
          <iframe
            className="w-[350px] h-[230px] aspect-video rounded-xl"
            src={`https://www.youtube.com/embed/${new URLSearchParams(new URL(approfondimento.video_embed).search).get('v')}`}
            title="Video in Lingua dei segni italiana che descrive il reperto"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <figcaption className="sr-only">
            Video in lingua dei segni italiana
          </figcaption>
        </figure>
      )}

      <div className="pt-8 border-t">
        <NavigazioneReperti data={data} dataReperti={dataReperti} />
      </div>
    </div>
  );
}

