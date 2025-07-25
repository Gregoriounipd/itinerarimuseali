import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { socialLinks } from '@/lib/socialLinks';
import { Menu, X } from 'lucide-react';

{/* Per utenti screen reader, compare appena si entra nella pagina */}
<div
  className="sr-only"
  aria-live="assertive"
  tabIndex={-1}
>
  Questo sito è accessibile. Premi il tasto H per saltare ai titoli principali oppure Tab per iniziare la navigazione.
</div>

export default function Header({ itinerarioId }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isModelli = itinerarioId === 'ed9b295c-13d1-4ab5-a620-2294c8d3fac9';
  
  return (
    <header className={`w-full sticky top-0 z-50 shadow-md ${isModelli ? 'bg-[url("/fondalecalendario.jpg")] bg-cover bg-center text-white' : 'bg-white dark:bg-gray-900'} `}>
      <div className="flex justify-between items-center px-6 py-4">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-unipd.png"
            alt="Questo sito è accessibile premi Invio per accedere al guida."
            width={160}
            height={160}
            className={`cursor-pointer ${isModelli ? '' : 'dark:invert'}`}
          />
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/info" className={`font-medium ${isModelli ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600 dark:text-gray-50'}`}>Info</Link>
          <Link href="/accessibility" className={`font-medium ${isModelli ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600 dark:text-gray-50'}`}>Accessibility Act</Link>

          {socialLinks.map(({ name, url, icon: Icon, colorClass }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={`text-xl ${isModelli ? 'text-white' : 'text-gray-700 dark:text-gray-200'} ${colorClass}`}
            >
              <Icon />
            </Link>
          ))}
        </nav>

        {/* Toggle per mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`${isModelli ? 'text-white' : 'text-gray-800 dark:text-white'} md:hidden`}
          aria-label="Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <Link href="/info" className={`font-medium ${isModelli ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600 dark:text-gray-50'}`}>Info</Link>
          <Link href="/accessibility" className={`font-medium ${isModelli ? 'text-white hover:text-blue-300' : 'text-gray-700 hover:text-blue-600 dark:text-gray-50'}`}>Accessibility Act</Link>
          {socialLinks.map(({ name, url, icon: Icon, colorClass }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={`text-xl ${isModelli ? 'text-white' : 'text-gray-700 dark:text-gray-200'} ${colorClass}`}
            >
              <Icon />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
