// components/Footer.js
export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-600 text-sm mt-12 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Contatti</h4>
            <p>Centro per i Musei Università di Padova</p>
            <p>Palazzo Cavalli, Corso Garibaldi 39 - 35121 Padova</p>
            <p>P.I. 00742430283 - C.F. 80006480281</p>
            <p>Email: centromusei@unipd.it</p>

          </div>
          <div>
            <h4 className="font-semibold mb-2">Link utili</h4>
            <p><a href="/privacy" className="hover:underline">Privacy Policy</a></p>
            <p><a href="/termini" className="hover:underline">Termini e condizioni</a></p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Progetto</h4>
            <p>Esplorando i reperti museali in un altra forma,</p>
            <p>con il supporto del Centro di Ateneo per i Musei</p>
          </div>
        </div>
  
        <div className="text-center mt-6 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Università di Padova – Tutti i diritti riservati
        </div>
      </footer>
    );
  }
  