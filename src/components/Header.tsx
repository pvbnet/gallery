import React, { useState, useEffect } from 'react';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'work', 'architecture', 'expertise', 'research', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', href: '/#work', id: 'work' },
    { label: 'Workbench', href: '/#workbench', id: 'workbench' },
    { label: 'Architecture', href: '/#architecture', id: 'architecture' },
    { label: 'Expertise', href: '/#expertise', id: 'expertise' },
    { label: 'Research', href: '/#research', id: 'research' },
    { label: 'Experience', href: '/#experience', id: 'experience' },
    { label: 'Contact', href: '/#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#hero" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 font-mono font-bold text-sm group-hover:border-cyan-500 transition-colors">
            PVB
          </div>
          <div>
            <span className="text-slate-100 font-bold tracking-tight text-base group-hover:text-cyan-400 transition-colors">
              {PORTFOLIO_DATA.profile.name}
            </span>
            <span className="block text-xs font-mono text-slate-400">
              AI Systems Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
                activeSection === item.id
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/peter-van-beek-resume.pdf"
            download="peter-van-beek-resume.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-mono font-medium text-slate-200 hover:text-cyan-400 transition-all shadow-sm group"
            title="Download PDF Resume"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Résumé PDF</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-400" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg ${
                  activeSection === item.id
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-900">
            <a
              href="/peter-van-beek-resume.pdf"
              download="peter-van-beek-resume.pdf"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono"
            >
              <FileText className="w-4 h-4" />
              <span>Download Résumé PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
