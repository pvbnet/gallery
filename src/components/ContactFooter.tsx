import React, { useState } from 'react';
import { Mail, Linkedin, FileText, Copy, Check, MapPin, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="py-24 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            OPEN FOR STAFF & PRINCIPAL OPPORTUNITIES
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            If you are building AI that has to perform efficiently outside the lab, <span className="text-cyan-400">let’s talk.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Targeting senior AI engineering leadership, inference optimization, accelerator co-design, and real-time vision/speech roles at companies like NVIDIA, ASML, Tesla, and high-impact AI teams.
          </p>

          {/* Action Grid */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/20 group"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-slate-950" />
                  <span>{PORTFOLIO_DATA.profile.email}</span>
                  <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity ml-1" />
                </>
              )}
            </button>

            {/* LinkedIn Link */}
            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-mono text-sm font-semibold transition-all shadow-sm group"
            >
              <Linkedin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>LinkedIn Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
            </a>

            {/* Download Resume */}
            <a
              href="/peter-van-beek-resume.pdf"
              download="peter-van-beek-resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white font-mono text-sm font-semibold transition-all shadow-sm group"
            >
              <FileText className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Download PDF Résumé</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 pt-4">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{PORTFOLIO_DATA.profile.location}</span>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-20 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} Peter van Beek, Ph.D. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Built with React + TypeScript</span>
            <span className="text-slate-700">•</span>
            <span>Static Firebase Hosting Spark Tier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
