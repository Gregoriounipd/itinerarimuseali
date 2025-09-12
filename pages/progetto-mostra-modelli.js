import Image from "next/image";
import { Volume2, PlayCircle } from "lucide-react";
import { useState } from "react";


export default function ProgettoMostraModelli() {
  const [showAudio, setShowAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(false);



  return (
    <article
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex justify-center mb-12">
          <figure className="w-full max-w-3xl">
            <Image
              src="/images/banner-mostra-modelli.jpg"
              alt="Esterno del Museo Poleni dell'Università di Padova"
              width={800}
              height={450}
              className="rounded-2xl shadow-2xl object-cover w-full h-auto"
              priority
            />
          </figure>
        </div>

        {/* Sezione con i bottoon */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex flex-col lg:flex-row items-start gap-6">
            <button
              onClick={() => setShowAudio(true)}
              className="w-full group flex felx-col items-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl-transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
              aria-label="Ascolta l'audio descrizione per il funzionamento della Mostra Modelli"
            >
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <Volume2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100 "> Audioguida</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Ascolta l'audio descrizione per il funzionamento della Mostra Modelli</span>
            </button>
          </div>

          {/* TESTO CENTRALE */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
              Il progetto della Mostra Modelli
            </h1>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Animali, piante, ponti, statue, fossili, macchine, minerali… tutto
                può essere modellizzato! I modelli hanno di fatto svolto un ruolo
                cruciale per lo sviluppo del sapere in svariati settori.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Si diffondono nelle università nel '700 e soprattutto
                nell'800. Li scoprirete nella nuova mostra temporanea del{" "}
                <strong>Museo Poleni</strong>, che vede per la prima volta esposti
                al pubblico modelli provenienti da vari musei e collezioni
                dell'Università di Padova.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Una mostra che svela anche pagine poco note della storia
                dell'ateneo e del territorio.
              </p>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                La mostra dei modelli è nata con l'obiettivo di rendere{" "}
                <strong>accessibili, tangibili e comprensibili</strong> alcuni dei
                reperti più significativi conservati nei musei. Ogni modello è
                stato realizzato con particolare attenzione all'accessibilità
                e alla multisensorialità.
              </p>
            </div>
          </div>

          <div className="lg:w-48 w-full lg:sticky lg:top-8">
            <button
              onClick={() => setShowVideo(true)}
              className="w-full group flex flex-col items-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
              aria-label="Guarda il video in Lingua dei Segni Italiana (LIS)"
            >
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <PlayCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100"> Video in LIS</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Guarda il video in Lingua dei Segni Italiana (LIS)</span>
            </button>
          </div>
        </div>
      </div>

      {/* INFORMAZIONI MOSTRA */}
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6 rounded-r-xl">
          <h2 className="font-bold text-xl text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
            📅 Informazioni essenziali
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold text-blue-900 dark:text-blue-300 inline">
                Date di apertura:
              </dt>
              <dd className="inline ml-2">
                dall'11 maggio 2025 al 3 maggio 2026
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-blue-900 dark:text-blue-300 inline">
                Ingresso:
              </dt>
              <dd className="inline ml-2 text-gray-700 dark:text-gray-300">
                gratuito per tutti fino all'8 giugno 2025
              </dd>
            </div>
          </dl>
        </section>
        {/* Info pratiche */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            🕐 Informazioni pratiche
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">
                Aperture:
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                Ogni domenica dall'11 maggio al 3 giugno 2025, dalle 14:30 alle 18:30
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">
                Visite guidate gratuite:
              </dt>
              <dd className="mt-2">
                <ul className="ml-4 list-disc space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Disponibili nelle domeniche fino all'8 giugno 2025</li>
                  <li>Riprendono a settembre 2025</li>
                  <li>Due turni: ore 15:00 e ore 17:00</li>
                </ul>
              </dd>
            </div>
          </dl>
        </section>
        {/* Inclusione e accessibilità */}
        <section className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-6 rounded-r-xl">
          <h2 className="font-bold text-xl text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
            ♿ Inclusione e accessibilità
          </h2>
          <p className="text-green-700 dark:text-green-200">
            Il progetto si inserisce in un percorso più ampio di{" "}
            <strong>inclusione culturale</strong>, promuovendo strumenti
            visivi e tattili specificamente progettati per il pubblico con
            disabilità.
          </p>
        </section>

        {/* Contatti */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            📞 Informazioni e prenotazioni
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Per informazioni dettagliate sulle visite guidate e
            sull'accessibilità, contattare il Museo Poleni
            dell'Università di Padova.
          </p>
        </section>
      </div>

      {/*MOdale audio */}
      {showAudio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Audioguida Progetto Mostra Modelli
            </h3>
            <audio controls className="w-full mb-4">
              <source src="/audio/audioguida-mostra-modelli.mp3" type="audio/mpeg" />
              Il tuo browser non supporta l'elemento audio.
            </audio>
            <button
              onClick={() => setShowAudio(false)}
              className="w-full px-4 py-3 bg-blue-60 text-white rounded-lg hover:bg-blue-700"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}

      {/*MOdale video*/}
      {showVideo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Video in Lingua dei Segni Italiana (LIS)
            </h3>
            <div className="aspect-video bg-black rounded-lg mb-4">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/jNQXAC9IVRw" // Sostituisci con l'ID del tuo video 
                title="Video in Lingua dei Segni Italiana (LIS)"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              >
              </iframe>
            </div>
            <button
              onClick={() => setShowVideo(false)}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
      </article>
  );
}
