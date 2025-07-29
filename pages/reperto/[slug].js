import NavigazioneReperti from '@/components/NavigazioneReperti';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getServerSideProps({ params }) {
  const { slug } = params;

  // ✅ Recupera il reperto base da 'reperti' tramite slug
  const { data, error } = await supabase
    .from('reperti')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return { notFound: true };
  }

  // ✅ Recupera approfondimento da 'reperti_specifici'
  const { data: approfondimento, error: errorApprofondimento } = await supabase
    .from('reperti_specifici')
    .select('*')
    .eq('ordine', data.numero_marker)
    .single();

  // ✅ Recupera tutti i reperti per la navigazione
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

export default function RepertoPage({ reperto, approfondimento, data, dataReperti }) {
  console.log("APPROFONDIMENTO:", approfondimento); // <-- qui ci sta bene!

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {/* ...altri elementi titolo, descrizione, */}
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
          <a

            href={approfondimento.audioguida_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/logo_cuffie.png"
              alt="Ascolta audioguida"
              className="h-12 w-auto hover:opacity-80 cursor-pointer"
            />
          </a>
        )}

        {/* Video LIS */}
        {approfondimento?.video_lis_url && (
          <a
            href={approfondimento.video_lis_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/logo_lis.png"
              alt="Guarda video in LIS"
              className="h-12 w-auto hover:opacity-80 cursor-pointer"
            />
          </a>
        )}

        {/* CAA */}
        {approfondimento?.approfondimento_url && (
          <a
            href={approfondimento.approfondimento_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/logo_caa.png"
              alt="Apri approfondimento in CAA"
              className="h-12 w-auto hover:opacity-80 cursor-pointer"
            />
          </a>
        )}
      </div>

      <div className="prose prose-lg max-w-none mt-6">
        <p>{approfondimento?.testo_lungo || data.descrizione}</p>
      </div>


      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-md aspect-video">
          <iframe
            className="w-full h-full rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/EQL2WcuFcgM"
            title="Video YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="pt-8 border-t">
        <NavigazioneReperti data={data} dataReperti={dataReperti} />
      </div>
    </div>
  );
}

