// components/Header.js
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center bg-white shadow-md sticky top-0 z-50">
      {/* Logo UniPD */}
      <Link href="/">
        <Image
          src="/images/logo-unipd.png" //logo unpd
          alt="Logo UniPD"
          width={200}
          height={200}
          className="cursor-pointer"
        />
      </Link>

      {/* Bottoni/Link */}
      <nav className="flex gap-6">
        <Link href="/itinerari" className="text-gray-700 hover:text-blue-600 font-medium">Itinerari</Link>
        <Link href="/info" className="text-gray-700 hover:text-blue-600 font-medium">Info</Link>
        <Link href="/contatti" className="text-gray-700 hover:text-blue-600 font-medium">Social</Link>
      </nav>
    </header>
  );
}
