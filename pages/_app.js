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

