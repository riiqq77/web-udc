import { Link } from 'react-router-dom';
import { Camera, Play, Briefcase, Code2, Mail, MapPin } from 'lucide-react';
import { orgInfo } from '@/data/mockData';

const footerLinks = [
  { title: 'Navigasi', links: [
    { label: 'Beranda', path: '/' }, { label: 'Tentang', path: '/tentang' },
    { label: 'Divisi', path: '/divisi' }, { label: 'Portofolio', path: '/portofolio' },
  ]},
  { title: 'Lainnya', links: [
    { label: 'Anggota', path: '/anggota' }, { label: 'Berita', path: '/berita' },
    { label: 'Prestasi', path: '/prestasi' }, { label: 'Kontak', path: '/kontak' },
  ]},
];

const socials = [
  { icon: Camera, href: orgInfo.instagram, label: 'Instagram' },
  { icon: Play, href: orgInfo.youtube, label: 'YouTube' },
  { icon: Briefcase, href: orgInfo.linkedin, label: 'LinkedIn' },
  { icon: Code2, href: orgInfo.github, label: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center gap-0.5">
                <div className="w-6 h-6 bg-royal-purple-600 rounded-tl-md rounded-bl-md" />
                <div className="w-3.5 h-6 bg-royal-purple-600 rounded-tr-md rounded-br-md" />
                <div className="w-3.5 h-6 bg-citron-400 rounded-tr-md rounded-br-md ml-0.5" />
              </div>
              <span className="font-bold text-white text-lg">UDC</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">{orgInfo.description}</p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-royal-purple-600 text-neutral-400 hover:text-white transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, path }) => (
                  <li key={path}><Link to={path} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs">
            <Mail size={14} /><span>{orgInfo.email}</span>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} UDC — Untirta Digital Creative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
