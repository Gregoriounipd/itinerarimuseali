// pages/_app.js

import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css"; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'
import { useRouter } from 'next/router';
import '../lib/i18n'; // Importa la configurazione di i18n


export default function App({ Component, pageProps }) {  // TORNA AL NORMALE
  const router = useRouter();
  const hideFooter = router.pathname.startsWith('/itinerario/');

  return (
    <>
      <Header />
      <Component {...pageProps} />
      {!hideFooter && <Footer />}
      <SpeedInsights />
    </>
  );
}

