import React from 'react';
import { ArrowRight, FileText, Mail, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Signal Grid Lines */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Glowing Gradient Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/90 border border-slate-800 text-cyan-400 font-mono text-xs font-semibold mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{PORTFOLIO_DATA.profile.name.toUpperCase()} — {PORTFOLIO_DATA.profile.title.toUpperCase()}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1] mb-6">
            From signal to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">system.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
            {PORTFOLIO_DATA.profile.subTagline}
          </p>

          {/* Proof Badge Line */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 py-3 px-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 mb-10 backdrop-blur-sm">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> Verified Track Record:
            </span>
            <span>Rivian & VW Group</span>
            <span className="text-slate-600">•</span>
            <span>Intel & Mobileye</span>
            <span className="text-slate-600">•</span>
            <span>Sharp Labs</span>
            <span className="text-slate-600">•</span>
            <span>MPEG Editor</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-200">Ph.D. Delft University</span>
          </div>

          {/* Primary Calls to Action */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 group"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/peter-van-beek-resume.pdf"
              download="peter-van-beek-resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-mono text-sm font-semibold transition-all shadow-sm group"
            >
              <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Download Résumé PDF</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-slate-400 hover:text-cyan-400 text-sm font-mono font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>

        {/* Highlight Stats Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">25+ Yrs</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">End-to-End AI & Signal R&D</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono">Speech & CV</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">ASR, TTS, Segmentation, Super-Res</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">Silicon Specs</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">DL Accelerator HW-SW Co-Design</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">C++ & Open Source</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">`ad-rss-lib` & Standards Lead</div>
          </div>
        </div>
      </div>
    </section>
  );
};
