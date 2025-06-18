import Head from 'next/head';

export default function Info() {
  return (
    <>
      <Head>
        <title>Cos&apos;è questo sito?</title>
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Cos'è questo sito?</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Questo sito raccoglie e racconta una serie di <strong>itinerari culturali </strong> 
          proposti dall&apos;Università di Padova. Ogni itinerario è pensato per guidarti alla scoperta 
          di opere d&apos;arte, reperti e luoghi storici, attraverso percorsi tematici.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Scegli un itinerario, esplora i contenuti collegati e lasciati ispirare!
        </p>
      </main>
    </>
  );
}
