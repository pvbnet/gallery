import React from 'react';
import { ArrowLeft, ExternalLink, Code2, Play } from 'lucide-react';

export const MobileyeCaseStudyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <a href="/#work" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Selected Work
          </a>
        </div>

        {/* Header */}
        <div className="max-w-4xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded border border-cyan-500/30">
              CASE STUDY 03
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">
              Intel and Mobileye (2017–2019)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Automated-Driving Safety C++ Library & Scenario Safety KPIs
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Technical lead for the open-source release of the official C++ library implementing Mobileye's Responsibility Sensitive Safety (RSS) mathematical model for autonomous vehicles (`ad-rss-lib`).
          </p>
        </div>

        {/* Visual Flow Banner */}
        <div className="lab-card rounded-2xl p-8 border border-slate-800 space-y-6 mb-12">
          <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
            <Code2 className="w-4 h-4" /> Safety Principles to Open-Source C++ Software Flow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-cyan-400 font-bold mb-1">1. SAFETY PRINCIPLES</div>
              <div className="text-sm font-bold text-slate-100">RSS Safety Model</div>
              <div className="text-xs text-slate-400 mt-1">Mathematical safety boundaries</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-teal-400 font-bold mb-1">2. C++ ARCHITECTURE</div>
              <div className="text-sm font-bold text-slate-100">Deterministic Engine</div>
              <div className="text-xs text-slate-400 mt-1">C++ evaluation interfaces</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-amber-400 font-bold mb-1">3. SIMULATION KPIS</div>
              <div className="text-sm font-bold text-slate-100">Scenario Safety KPIs</div>
              <div className="text-xs text-slate-400 mt-1">Driving simulation test suites</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">4. OPEN SOURCE</div>
              <div className="text-sm font-bold text-slate-100">ad-rss-lib GitHub</div>
              <div className="text-xs text-slate-400 mt-1">Industry standard release</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <a
            href="/lab/rss-safety"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Interactive RSS Simulator</span>
          </a>

          <a
            href="https://intel.github.io/ad-rss-lib/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-sm font-semibold transition-all"
          >
            <Code2 className="w-4 h-4" />
            <span>View GitHub Repository (`ad-rss-lib`)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
