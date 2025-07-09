// ✅ VERSIONE RESPONSIVE DELLA NAVBAR

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { socialLinks } from '@/lib/socialLinks';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-unipd.png"
            alt="Logo UniPD"
            width={160}
            height={160}
            className="cursor-pointer dark:invert"
          />
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/info" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-50">Info</Link>
          <Link href="/accessibility" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-50">Accessibility Act</Link>

          {socialLinks.map(({ name, url, icon: Icon, colorClass }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={`text-gray-700 dark:text-gray-200 text-xl ${colorClass}`}
            >
              <Icon />
            </Link>
          ))}
        </nav>

        {/* Menu Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-white"
          aria-label="Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <Link href="/info" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-50">Info</Link>
          <Link href="/accessibility" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-50">Accessibility Act</Link>

          {socialLinks.map(({ name, url, icon: Icon, colorClass }) => (
            <Link
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className={`text-gray-700 dark:text-gray-200 text-xl ${colorClass}`}
            >
              <Icon />
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}



