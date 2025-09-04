import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { socialLinks } from '@/lib/socialLinks';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '@/components/LanguageToggle';

{/* Per utenti screen reader, compare appena si entra nella pagina */ }
<div
  className="sr-only"
  aria-live="assertive"
  tabIndex={-1}
>
  Questo sito è accessibile. Premi il tasto H per saltare ai titoli principali oppure Tab per iniziare la navigazione.
</div>

export default function Header({ itinerarioId }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t,i18n } = useTranslation('common');
  
  const isModelli = itinerarioId === 'ed9b295c-13d1-4ab5-a620-2294c8d3fac9';

  return (
    <header className={`w-full sticky top-0 z-50 min-h-[100px] backdrop-blur-md transition-all duration-300 ${isModelli
        ? 'bg-[url("/fondalecalendario.jpg")] bg-cover bg-center text-white shadow-2xl border-b border-white/20'
        : 'bg-white/95 dark:bg-gray-900/95 shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
      }`}>

      {/* Gradient overlay per migliorare la leggibilità su sfondo immagine */}
      {isModelli && (
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
      )}

      <div className="relative flex justify-between items-center px-6 py-4">

        {/* Logo Section con animazioni hover */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex-shrink-0 group">
            <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-unipd.png"
                alt="Questo sito è accessibile premi Invio per accedere al guida."
                width={160}
                height={160}
                className={`cursor-pointer transition-all duration-300 ${isModelli ? 'drop-shadow-lg' : 'dark:invert group-hover:brightness-110'
                  }`}
              />
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          <Link href="/info" className="flex-shrink-0 group">
            <div className="relative overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo_museabile.png"
                width={160}
                height={160}
                className={`cursor-pointer transition-all duration-300 ${isModelli ? 'drop-shadow-lg' : 'dark:invert group-hover:brightness-110'
                  }`}
              />
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        </div>

        {/* Menu Desktop con stili migliorati */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/info"
            className={`font-semibold text-sm uppercase tracking-wider relative group transition-all duration-300 ${isModelli
                ? 'text-white/90 hover:text-white'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
              }`}
          >
            <span className="relative z-10">Info</span>
            {/* Underline animato */}
            <div className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isModelli ? 'bg-white' : 'bg-blue-600 dark:bg-blue-400'
              }`} />
            {/* Glow effect per tema modelli */}
            {isModelli && (
              <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            )}
          </Link>

          <Link
            href="/accessibility"
            className={`font-semibold text-sm uppercase tracking-wider relative group transition-all duration-300 ${isModelli
                ? 'text-white/90 hover:text-white'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
              }`}
          >
            <span className="relative z-10">Accessibility Act</span>
            {/* Underline animato */}
            <div className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isModelli ? 'bg-white' : 'bg-blue-600 dark:bg-blue-400'
              }`} />
            {/* Glow effect per tema modelli */}
            {isModelli && (
              <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            )}
          </Link>

          {/* Language Toggle - AGGIUNTO QUI */}
          <div className={`pl-4 border-l ${isModelli ? 'border-white/30' : 'border-gray-300 dark:border-gray-600'}`}>
            <LanguageToggle isModelli={isModelli} />
          </div>

          {/* Social Links con effetti hover migliorati */}
          <div className={`flex items-center gap-4 ml-4 pl-4 border-l ${isModelli ? 'border-white/30' : 'border-gray-300 dark:border-gray-600'}`}>
            {socialLinks.map(({ name, url, icon: Icon, colorClass }) => (
              <Link
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`relative p-2 rounded-full transition-all duration-300 group ${isModelli
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                  } ${colorClass}`}
              >
                <Icon size={20} className="relative z-10" />
                {/* Ripple effect */}
                <div className="absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-10 transform scale-0 group-hover:scale-100 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </nav>

        {/* Toggle mobile con animazioni */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`relative p-2 rounded-lg transition-all duration-300 md:hidden ${isModelli
              ? 'text-white hover:bg-white/20'
              : 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <div className="relative w-7 h-7">
            <Menu
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${menuOpen ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
                }`}
            />
            <X
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-50'
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu con animazioni slide */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <nav className={`flex flex-col gap-1 px-6 pb-6 ${isModelli
            ? 'bg-black/20 backdrop-blur-sm border-t border-white/20'
            : 'bg-gray-50/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700'
          }`}>

          <Link
            href="/info"
            className={`font-medium py-3 px-4 rounded-lg transition-all duration-300 ${isModelli
                ? 'text-white/90 hover:text-white hover:bg-white/10'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            onClick={() => setMenuOpen(false)}
          >
            Info
          </Link>

          <Link
            href="/accessibility"
            className={`font-medium py-3 px-4 rounded-lg transition-all duration-300 ${isModelli
                ? 'text-white/90 hover:text-white hover:bg-white/10'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
              }`}
            onClick={() => setMenuOpen(false)}
          >
            Accessibility Act
          </Link>

          {/* Language Toggle Mobile - AGGIUNTO QUI */}
          <div className="px-4 py-2 mt-2 mb-2">
            <LanguageToggle isModelli={isModelli} />
          </div>

          {/* Social links mobile */}
          <div className="flex gap-2 px-4 py-2 mt-2">
            {socialLinks.map(({ name, url, icon: Icon, colorClass }) => (
              <Link
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`p-3 rounded-full transition-all duration-300 ${isModelli
                    ? 'text-white/80 hover:text-white hover:bg-white/20'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
                  } ${colorClass}`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}