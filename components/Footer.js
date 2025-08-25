// components/Footer.js

export default function Footer({ isMostraModelli = false }) {
  return (
    <footer
      className={`text-sm mt-12 py-10 px-6 transition-all duration-300 ${
        isMostraModelli
          ? 'bg-gradient-to-b from-[#202044] to-[#1a1a3a] text-white border-t border-white/20'
          : 'bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Contatti Section */}
          <div>
            <h4 className={`font-semibold text-base mb-4 relative ${
              isMostraModelli 
                ? 'text-white' 
                : 'text-gray-800 dark:text-white'
            }`}>
              Contatti
              <div className={`absolute bottom-0 left-0 w-12 h-0.5 ${
                isMostraModelli 
                  ? 'bg-white/40' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`} />
            </h4>
            
            <div className={`p-4 rounded-lg backdrop-blur-sm transition-all duration-300 ${
              isMostraModelli 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 shadow-sm'
            }`}>
              <div className="space-y-2 leading-relaxed">
                <p className="font-semibold">Centro per i Musei</p>
                <p className="font-semibold">Università di Padova</p>
                
                <div className="mt-3 space-y-1">
                  <p>Palazzo Cavalli</p>
                  <p>Corso Garibaldi 39</p>
                  <p>35121 Padova</p>
                </div>
                
                <div className={`mt-4 pt-3 border-t space-y-1 ${
                  isMostraModelli ? 'border-white/20' : 'border-gray-200 dark:border-gray-600'
                }`}>
                  <p className="text-xs">P.I. 00742430283</p>
                  <p className="text-xs">C.F. 80006480281</p>
                </div>
                
                <div className="mt-4">
                  <a 
                    href="mailto:centromusei@unipd.it"
                    className={`inline-block font-medium transition-colors duration-200 underline decoration-1 underline-offset-2 ${
                      isMostraModelli 
                        ? 'text-white/90 hover:text-white decoration-white/50 hover:decoration-white' 
                        : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white decoration-gray-400 hover:decoration-gray-600 dark:decoration-gray-500 dark:hover:decoration-gray-300'
                    }`}
                  >
                    centromusei@unipd.it
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Link utili Section */}
          <div>
            <h4 className={`font-semibold text-base mb-4 relative ${
              isMostraModelli 
                ? 'text-white' 
                : 'text-gray-800 dark:text-white'
            }`}>
              Link utili
              <div className={`absolute bottom-0 left-0 w-12 h-0.5 ${
                isMostraModelli 
                  ? 'bg-white/40' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`} />
            </h4>
            
            <div className="space-y-3">
              <a 
                href="/privacy" 
                className={`block p-3 rounded transition-colors duration-200 ${
                  isMostraModelli 
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white' 
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <span className="font-medium">Privacy Policy</span>
              </a>
              
              <a 
                href="/termini" 
                className={`block p-3 rounded transition-colors duration-200 ${
                  isMostraModelli 
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white' 
                    : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-700/70 border border-gray-200/50 dark:border-gray-600/50 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                <span className="font-medium">Termini e condizioni</span>
              </a>
            </div>
          </div>

          {/* Progetto Section */}
          <div>
            <h4 className={`font-semibold text-base mb-4 relative ${
              isMostraModelli 
                ? 'text-white' 
                : 'text-gray-800 dark:text-white'
            }`}>
              Il Progetto
              <div className={`absolute bottom-0 left-0 w-12 h-0.5 ${
                isMostraModelli 
                  ? 'bg-white/40' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`} />
            </h4>
            
            <div className={`p-5 rounded-lg backdrop-blur-sm ${
              isMostraModelli 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-white/70 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 shadow-sm'
            }`}>
              <div className="text-center space-y-3">
                <div className="text-2xl">🏛️</div>
                <p className="leading-relaxed">
                  Esplorando i reperti museali in una forma innovativa
                </p>
                <div className={`w-12 h-px mx-auto ${
                  isMostraModelli 
                    ? 'bg-white/30' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`} />
                <p className="text-sm leading-relaxed">
                  con il supporto del<br />
                  <span className="font-semibold">Centro di Ateneo per i Musei</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={`mt-10 pt-6 border-t ${
          isMostraModelli 
            ? 'border-white/20' 
            : 'border-gray-200 dark:border-gray-700'
        }`}>
          <div className={`text-center py-4 px-6 rounded-lg ${
            isMostraModelli 
              ? 'bg-white/5' 
              : 'bg-white/50 dark:bg-gray-800/30'
          }`}>
            <p className={`text-xs font-medium ${
              isMostraModelli 
                ? 'text-white/80' 
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              &copy; {new Date().getFullYear()} Università di Padova &#45; Tutti i diritti riservati
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}