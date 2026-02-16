import Head from 'next/head';

export default function Info() {
  return (
    <>
      <Head>
        <title>Cos&apos;è questo sito?</title>
      </Head>
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Cos&apos;è questo sito?</h1>
        <div className="mb-8">
          <img
            src="/images/banner-infol.png"
            alt="Disegno per accessibilità in modalità chiara"
            className="w-full max-h-64 object-cover rounded-xl shadow-md dark:hidden"
          />
          <img
            src="/images/banner-infos.png"
            alt="Banner per accessibilità in modalità scura"
            className="w-full max-h-64 object-cover rounded-xl shadow-md hidden dark:block"
          />
        </div>

        <p className="text-lg text-gray-700 leading-relaxed dark:text-gray-100">
          questa pagina web raccoglie e racconta una serie di <strong>itinerari culturali </strong>
          proposti dall&apos;Università di Padova. Ogni itinerario è pensato per guidarti alla scoperta
          di opere d&apos;arte, reperti e luoghi storici, attraverso percorsi tematici.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed dark:text-gray-100">
          Scegli un itinerario, esplora i contenuti collegati e lasciati ispirare!
        </p>
      </main>
    </>
  );
}
