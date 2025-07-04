// lib/socialLinks.js
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/museiunipd/?locale=it_ITa',
    icon: FaFacebook,
    colorClass: 'hover:text-blue-600',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/museiunipd',
    icon: FaInstagram,
    colorClass: 'hover:text-pink-600',
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/company/centromuseiunipd/?viewAsMember=true',
    icon: FaLinkedin,
    colorClass: 'hover:text-sky-600',
  },
];
