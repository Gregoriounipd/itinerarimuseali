//pages/_app.js

import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css"; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/700.css'
import { useRouter } from 'next/router'; // 👈 aggiungi questa riga

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const hideFooter = router.pathname.startsWith('/itinerario/'); // 👈 nascondi per itinerari

  return (
    <>
      <Header />
      <Component {...pageProps} />
      {!hideFooter && <Footer />}
    </>
  );
}
