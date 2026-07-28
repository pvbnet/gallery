import React from 'react';
import { BookOpen, ExternalLink, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA, Publication } from '../data/portfolioData';

export const ResearchPublications: React.FC = () => {
  return (
    <section id="research" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <BookOpen className="w-4 h-4" /> Intellectual Contributions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Selected Publications, Code & Patents
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-3 md:mt-0 font-normal">
            Key research papers, open-source C++ software, and patents reflecting Peter’s work in hardware-aware AI, ISP enhancement, and AV safety.
          </p>
        </div>

        {/* Featured Open-Source Banner */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <Code2 className="w-4 h-4" /> FEATURED OPEN-SOURCE C++ SOFTWARE
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              Intel & Mobileye Responsibility Sensitive Safety Library (`ad-rss-lib`)
            </h3>
            <p className="text-sm text-slate-300">
              Technical lead for the open-source C++ implementation of Mobileye's Responsibility Sensitive Safety (RSS) mathematical safety model for autonomous vehicles.
            </p>
          </div>
          <a
            href="https://intel.github.io/ad-rss-lib/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shrink-0 transition-all shadow-lg shadow-cyan-500/20 group"
          >
            <span>Explore GitHub Repository</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.publications.map((item: Publication) => {
            const isCode = item.type === 'code';
            const isPatent = item.type === 'patent';
            return (
              <div
                key={item.id}
                className="lab-card rounded-xl p-6 flex flex-col justify-between border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded ${
                      isCode
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : isPatent
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {item.venue}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{item.year}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-100 leading-snug">
                    {item.title}
                  </h4>

                  <p className="text-xs text-slate-400 font-mono">
                    Authors: {item.authors}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {item.summary}
                  </p>
                </div>

                {item.url && (
                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
                    >
                      <span>Verify Record / Publication</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
