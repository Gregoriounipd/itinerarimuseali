import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css"; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'


export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}

{/* Per utenti screen reader, compare appena si entra nella pagina */}
<div
  className="sr-only"
  aria-live="assertive"
>
  Questo sito è accessibile. Premi il tasto H per saltare ai titoli principali oppure Tab per iniziare la navigazione.
</div>
