import React, { useState } from 'react';
import { BookOpen, ExternalLink, Filter, ArrowLeft, Layers } from 'lucide-react';
import { PORTFOLIO_DATA, Publication } from '../data/portfolioData';

export const ResearchAtlasPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = [
    'All',
    'Efficient Inference',
    'Computer Vision',
    'Super-Resolution',
    'Video Processing',
    'Automated Driving',
    'Patents',
    'Standards'
  ];

  const filteredPubs = PORTFOLIO_DATA.publications.filter((pub) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Patents') return pub.type === 'patent';
    if (selectedFilter === 'Automated Driving') return pub.title.includes('AV Safety') || pub.title.includes('LIDAR') || pub.title.includes('RSS');
    if (selectedFilter === 'Super-Resolution') return pub.title.includes('Super-Resolution') || pub.title.includes('Upscaling');
    if (selectedFilter === 'Efficient Inference') return pub.title.includes('Neural Net') || pub.title.includes('Inference') || pub.title.includes('ISP');
    if (selectedFilter === 'Computer Vision') return pub.title.includes('Vision') || pub.title.includes('Depth') || pub.title.includes('ISP');
    if (selectedFilter === 'Standards') return pub.title.includes('Standardization') || pub.type === 'code';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <a href="/#research" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
          </a>
        </div>

        {/* Title Banner */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold mb-3">
            <BookOpen className="w-4 h-4" /> INTELLECTUAL & TECHNICAL ATLAS
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Visual Research & Patent Atlas
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Filterable research catalog mapping 25+ years of published papers, US patents, open-source C++ software, and MPEG international standard contributions.
          </p>
        </div>

        {/* Career Evolution Visual Timeline Banner */}
        <div className="lab-card rounded-2xl p-8 border border-slate-800 space-y-6 mb-12">
          <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
            <Layers className="w-4 h-4" /> Technical Focus Evolution Trajectory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-cyan-400 font-bold">1990 – 1998</div>
              <div className="text-xs font-bold text-slate-100">Signal & Video</div>
              <div className="text-[10px] text-slate-400">Delft & Rochester</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-teal-400 font-bold">1998 – 2016</div>
              <div className="text-xs font-bold text-slate-100">Vision & Super-Res</div>
              <div className="text-[10px] text-slate-400">Sharp Labs & MPEG</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-amber-400 font-bold">2017 – 2019</div>
              <div className="text-xs font-bold text-slate-100">AV Safety & C++</div>
              <div className="text-[10px] text-slate-400">Intel & Mobileye</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-purple-400 font-bold">2019 – 2024</div>
              <div className="text-xs font-bold text-slate-100">Silicon Co-Design</div>
              <div className="text-[10px] text-slate-400">Intel Vision Group</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-emerald-400 font-bold">2025 – 2026</div>
              <div className="text-xs font-bold text-slate-100">Speech AI Inference</div>
              <div className="text-[10px] text-slate-400">Rivian & VW Group</div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-mono text-slate-400 font-semibold mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter Work:
          </span>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                selectedFilter === f
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Publications & Patents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPubs.map((pub: Publication) => {
            const isCode = pub.type === 'code';
            const isPatent = pub.type === 'patent';
            return (
              <div
                key={pub.id}
                className="lab-card rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40"
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
                      {pub.venue}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{pub.year}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs font-mono text-slate-400">
                    Authors: {pub.authors}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    {pub.summary}
                  </p>
                </div>

                {pub.url && (
                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <a
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                    >
                      <span>Explore Source Repository / Record</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
