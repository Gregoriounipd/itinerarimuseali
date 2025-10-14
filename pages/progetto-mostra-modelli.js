import Image from "next/image";
import { Volume2, PlayCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import { usePageTranslation } from "@/hooks/usePageTranslation";
import { t } from "i18next";
// Componente per formattare il testo con a capo
const FormattedText = ({ text, className = "" }) => {
  if (!text) return null;

  // Sostituisci ||| con <br/> per andare a capo
  const formattedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // **grassetto**
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // *corsivo*
    .replace(/\|\|\|/g, '<br/>'); // ||| = a capo

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};
export default function ProgettoMostraModelli() {
  const [showAudio, setShowAudio] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const originalTexts = {
    title: "Il progetto della Mostra Modelli",
    paragraph1: "Animali, piante, ponti, statue, fossili, macchine, minerali… tutto può essere modellizzato! I modelli hanno di fatto svolto un ruolo cruciale per lo sviluppo del sapere in svariati settori.",
    paragraph2: "Si diffondono nelle università nel '700 e soprattutto nell'800. Li scoprirete nella nuova mostra temporanea del Museo Poleni, che vede per la prima volta esposti al pubblico modelli provenienti da vari musei e collezioni dell'Università di Padova.",
    paragraph3: "Una mostra che svela anche pagine poco note della storia dell'ateneo e del territorio",
    paragraph4: "La mostra dei modelli è nata con l'obiettivo di rendere accessibili, tangibili e comprensibili alcuni dei reperti più significativi conservati nei musei. Ogni modello è stato realizzato con particolare attenzione all'accessibilità e alla multisensorialità.",
    dateLabel: "Date di apertura:",
    dateValue: "dall'11 maggio 2025 al 3 maggio 2026",
    entryLabel: "Ingresso:",
    entryValue: "gratuito per tutti fino all'8 giugno 2025",
    practicalInfoTitle: "🕐 Informazioni pratiche",
    practicalInfo1Label: "Aperture:",
    practicalInfo1Value: "Ogni domenica dall'11 maggio al 3 giugno 2025, dalle 14:30 alle 18:30",
    practicalInfo2Label: "Visite guidate gratuite:",
    practicalInfo2Value: "Disponibili nelle domeniche fino all'8 giugno 2025, Riprendono a settembre 2025, Due turni: ore 15:00 e ore 17:00",
    inclusionTitle: "♿ Inclusione e accessibilità",
    inclusionText: "Il progetto si inserisce in un percorso più ampio di inclusione culturale, promuovendo strumenti visivi e tattili specificamente progettati per il pubblico con disabilità.",
    contactTitle: "📞 Informazioni e prenotazioni",
    contactText: "Per informazioni dettagliate sulle visite guidate e sull'accessibilità, contattare il Museo Poleni dell'Università di Padova.",
    audioButton: "Audioguida",
    videoButton: "Video in LIS",
    practicalInfo3Label: "Informazioni essenziali",
  };

  const { texts, isTranslating } = usePageTranslation(originalTexts);

  return (
    <article
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {isTranslating && (
        <div className="fixed top-20 right-4 bg-blue-100 px-4 py-2 rounded-lg shadow z-50">
          Traduzione in corso...
        </div>
      )}

      {/* BANNER INIZIALE */}
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
      </div>

      {/* SEZIONE CON I BOTTONI LATERALI E TESTO CENTRALE */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row items-start gap-8">

          {/* COLONNA SINISTRA - 2 BOTTONI */}
          <div className="lg:w-48 w-full lg:sticky lg:top-8 space-y-4">
            <button
              onClick={() => setShowAudio(true)}

              className="w-full group flex flex-col items-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
              aria-label="Ascolta l'audio descrizione per il funzionamento della Mostra Modelli"
            >
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
                <Volume2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{texts.audioButton}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Ascolta la descrizione</span>
            </button>

            <a
              href={"https://ylibjgveunetwyavmcyb.supabase.co/storage/v1/object/sign/storie%20sociali/Storie%20Sociali%20Mostra%20Modelli.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jZWFhNjQ3Zi0wOTM1LTQ1YjQtYWJjMy02NDQxMjk2OTlkN2YiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzdG9yaWUgc29jaWFsaS9TdG9yaWUgU29jaWFsaSBNb3N0cmEgTW9kZWxsaS5wZGYiLCJpYXQiOjE3NTk4MzQ1MjcsImV4cCI6NDkxMzQzNDUyN30.1aAt4pq4AyNOfPj7k3oRxZInu6LjWrqeJFCbtdAYjoc"}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group flex flex-col items-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
            >
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full group-hover:bg-green-200 dark:group-hover:bg-green-800 transition-colors">
                <BookOpen className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">Storie Sociali</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Della Mostra Modelli</span>
            </a>
          </div>
          {/* TESTO CENTRALE */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
              {texts.title}
            </h1>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <FormattedText text={texts.paragraph1} />
              </div>

              <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <FormattedText text={texts.paragraph2} />
              </div>

              <div className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                <FormattedText text={texts.paragraph3} />
              </div>

              <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <FormattedText text={texts.paragraph4} />
              </div>
            </div>
          </div>

          {/* COLONNA DESTRA - 2 BOTTONI */}
          <div className="lg:w-48 w-full lg:sticky lg:top-8 space-y-4">
            <button
              onClick={() => setShowVideo(true)}
              className="w-full group flex flex-col items-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
              aria-label="Guarda il video in Lingua dei Segni Italiana (LIS)"
            >
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors">
                <PlayCircle className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">{texts.videoButton}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Con Sottotitoli In Italiano</span>
            </button>
            <a
              href={"https://ylibjgveunetwyavmcyb.supabase.co/storage/v1/object/sign/easy%20to%20read/ETR_Guida_Mostra.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jZWFhNjQ3Zi0wOTM1LTQ1YjQtYWJjMy02NDQxMjk2OTlkN2YiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJlYXN5IHRvIHJlYWQvRVRSX0d1aWRhX01vc3RyYS5wZGYiLCJpYXQiOjE3NTk4MzUyNjEsImV4cCI6NDkxMzQzNTI2MX0.1b3f13ZOQ9u2Gqae4tIG-FdzVjYacEkUgc3gKHjQZpw"}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group flex flex-col items-center gap-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
            >
              <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors">
                <BookOpen className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">Guida Sociale</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">easy to read</span>
            </a>
          </div>
        </div>
      </div>
      {/* INFORMAZIONI MOSTRA */}
      <div className="max-w-4xl mx-auto space-y-6">
        <section className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6 rounded-r-xl">
          <h2 className="font-bold text-xl text-blue-900 dark:text-blue-300 mb-4 flex items-center gap-2">
            📅 {texts.practicalInfo3Label}
          </h2>
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold text-blue-900 dark:text-blue-300 inline">
                <FormattedText text={texts.dateLabel} />
              </dt>
              <dd className="inline ml-2">
                <FormattedText text={texts.dateValue} />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-blue-900 dark:text-blue-300 inline">
                <FormattedText text={texts.entryLabel} />
              </dt>
              <dd className="inline ml-2 text-gray-700 dark:text-gray-300">
                <FormattedText text={texts.entryValue} />
              </dd>
            </div>
          </dl>
        </section>
        {/* Info pratiche */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            🕐 {texts.practicalInfoTitle}
          </h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">
                <FormattedText text={texts.practicalInfo1Label} />
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                <FormattedText text={texts.practicalInfo1Value} />
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-gray-900 dark:text-gray-100">
                <FormattedText text={texts.practicalInfo2Label} />
              </dt>
              <dd className="mt-2 text-gray-700 dark:text-gray-300">
                <FormattedText text={texts.practicalInfo2Value} />
              </dd>
            </div>
          </dl>
        </section>
        {/* Inclusione e accessibilità */}
        <section className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-6 rounded-r-xl">
          <h2 className="font-bold text-xl text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
            {texts.inclusionTitle}
          </h2>
          <p className="text-green-700 dark:text-green-200">
            <FormattedText text={texts.inclusionText} />
          </p>
        </section>

        {/* Contatti */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            {texts.contactTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {texts.contactText}
          </p>
        </section>
      </div>

      {/*MOdale audio */}
      {
        showAudio && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Audioguida Progetto Mostra Modelli
              </h3>
              <audio controls className="w-full mb-4">
                <source src="https://ylibjgveunetwyavmcyb.supabase.co/storage/v1/object/public/audio_mp4/0.0%20introduzione.mp3" type="audio/mpeg" />
                Il tuo browser non supporta l'elemento audio.
              </audio>
              <button
                onClick={() => setShowAudio(false)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Chiudi
              </button>
            </div>
          </div>
        )
      }

      {/*MOdale video*/}
      {
        showVideo && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Video in Lingua dei Segni Italiana (LIS)
              </h3>
              <div className="aspect-video bg-black rounded-lg mb-4">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/VB_4ag9dp-8"
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
        )
      }
    </article >
  );
}
