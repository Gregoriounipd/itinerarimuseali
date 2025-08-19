import Image from "next/image";

export default function ProgettoMostraModelli() {
  return (
    <article
      className="max-w-6xl mx-auto px-4 py-8 sm:px-6 sm:py-12"
      role="main"
    >
      {/* Titolo principale */}
      <header className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
          Il progetto della Mostra Modelli
        </h1>
      </header>

      {/* Container principale */}
      <div className="flex flex-col xl:flex-row items-start gap-8 xl:gap-12">
        {/* Sezione immagine */}
        <figure
          className="w-full xl:w-2/5 xl:flex-shrink-0"
          role="img"
          aria-labelledby="banner-caption"
        >
          <Image
            src="/images/bannner-mostra-modelli.jpg"
            alt="Banner della mostra Modelli: Il sapere in 3 dimensioni. Esposizione di modelli storici scientifici presso il Museo Poleni dell'Università di Padova"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover w-full h-auto"
            priority
            onError={(e) => {
              console.log("Errore caricamento immagine:", e.target.src);
              e.target.src = "/images/placeholder-mostra.jpg";
            }}
          />
          <figcaption id="banner-caption" className="sr-only">
            Immagine promozionale della mostra temporanea sui modelli
            scientifici storici
          </figcaption>
        </figure>

        {/* Contenuto principale */}
        <main className="w-full xl:w-3/5 space-y-6 text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {/* Intro */}
          <section aria-labelledby="intro-heading">
            <h2 id="intro-heading" className="sr-only">
              Introduzione alla mostra
            </h2>
            <p>
              Animali, piante, ponti, statue, fossili, macchine, minerali… tutto
              può essere modellizzato! I modelli hanno di fatto svolto un ruolo
              cruciale per lo sviluppo del sapere in svariati settori.
            </p>

            <p>
              Si diffondono nelle università nel &apos;700 e soprattutto
              nell&apos;800. Li scoprirete nella nuova mostra temporanea del{" "}
              <strong>Museo Poleni</strong>, che vede per la prima volta esposti
              al pubblico modelli provenienti da vari musei e collezioni
              dell&apos;Università di Padova.
            </p>

            <p>
              Una mostra che svela anche pagine poco note della storia
              dell&apos;ateneo e del territorio.
            </p>
          </section>

          {/* Info chiave */}
          <section
            aria-labelledby="key-info-heading"
            className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-lg"
            role="complementary"
          >
            <h2
              id="key-info-heading"
              className="font-semibold text-blue-900 dark:text-blue-300 mb-3 text-lg"
            >
              📅 Informazioni essenziali
            </h2>
            <dl className="space-y-2">
              <div>
                <dt className="font-semibold text-blue-900 dark:text-blue-300 inline">
                  Date di apertura:
                </dt>
                <dd className="inline ml-2">
                  dall&apos;11 maggio 2025 al 3 maggio 2026
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-blue-900 dark:text-blue-300 inline">
                  Ingresso:
                </dt>
                <dd className="inline ml-2">
                  gratuito per tutti fino all&apos;8 giugno 2025
                </dd>
              </div>
            </dl>
          </section>

          {/* Info pratiche */}
          <section
            aria-labelledby="practical-info-heading"
            className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
          >
            <h2
              id="practical-info-heading"
              className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-lg"
            >
              🕐 Informazioni pratiche
            </h2>
            <dl className="space-y-3 text-sm sm:text-base">
              <div>
                <dt className="font-semibold text-gray-900 dark:text-gray-100">
                  Aperture:
                </dt>
                <dd>
                  Ogni domenica dall&apos;11 maggio al 3 giugno 2025, dalle
                  14:30 alle 18:30
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900 dark:text-gray-100">
                  Visite guidate gratuite:
                </dt>
                <dd>
                  <ul className="mt-1 ml-4 list-disc" role="list">
                    <li>Disponibili nelle domeniche fino all&apos;8 giugno 2025</li>
                    <li>Riprendono a settembre 2025</li>
                    <li>Due turni: ore 15:00 e ore 17:00</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </section>

          {/* Obiettivi */}
          <section aria-labelledby="objectives-heading">
            <h2 id="objectives-heading" className="sr-only">
              Obiettivi della mostra
            </h2>
            <p>
              La mostra dei modelli è nata con l&apos;obiettivo di rendere{" "}
              <strong>accessibili, tangibili e comprensibili</strong> alcuni dei
              reperti più significativi conservati nei musei. Ogni modello è
              stato realizzato con particolare attenzione all&apos;accessibilità
              e alla multisensorialità.
            </p>

            <aside
              className="border-l-4 border-green-500 pl-4 bg-green-50 dark:bg-green-900/30 p-3 rounded-r-lg mt-4"
              role="complementary"
              aria-labelledby="inclusion-note"
            >
              <h3
                id="inclusion-note"
                className="font-semibold text-green-800 dark:text-green-300 mb-2"
              >
                ♿ Inclusione e accessibilità
              </h3>
              <p className="text-green-700 dark:text-green-200">
                Il progetto si inserisce in un percorso più ampio di{" "}
                <strong>inclusione culturale</strong>, promuovendo strumenti
                visivi e tattili specificamente progettati per il pubblico con
                disabilità.
              </p>
            </aside>
          </section>

          {/* Contatti */}
          <section
            aria-labelledby="contact-heading"
            className="border-t pt-6 mt-6"
          >
            <h2
              id="contact-heading"
              className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-lg"
            >
              📞 Informazioni e prenotazioni
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Per informazioni dettagliate sulle visite guidate e
              sull&apos;accessibilità, contattare il Museo Poleni
              dell&apos;Università di Padova.
            </p>
          </section>
        </main>
      </div>
    </article>
  );
}
