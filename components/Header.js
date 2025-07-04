// components/Header.js
import Image from 'next/image';
import Link from 'next/link';
import { socialLinks } from '@/lib/socialLinks';
import Accessibility from '@/pages/accessibility';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 dark:text-white text-sm">
      {/* Logo UniPD */}
      <Link href="/" passHref className="flex-shrink-0">
          <Image
            src="/images/logo-unipd.png"
            alt="Logo UniPD"
            width={160}
            height={160}
            className="cursor-pointer dark:invert"
          />
      </Link>

      {/* Navigazione */}
      <nav className="flex items-center gap-6">
        <Link href="/info" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-50">
            Info
        </Link>
        <Link href="/accessibility" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-50">
            Accessibility Act
        </Link>
      
        {/* Icone social */}
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
    </header>
  );
}




