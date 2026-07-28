import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ChevronDown, ChevronUp, Layers, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA, CaseStudy } from '../data/portfolioData';

export const FlagshipWork: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(PORTFOLIO_DATA.caseStudies[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="work" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Layers className="w-4 h-4" /> Selected Portfolio Stories
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Flagship AI Systems Engineering Work
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-3 md:mt-0 font-normal">
            Detailed technical breakdowns of real-world projects spanning speech AI, vision models, accelerator specs, and safety C++.
          </p>
        </div>

        {/* Case Studies Stack */}
        <div className="space-y-8">
          {PORTFOLIO_DATA.caseStudies.map((study: CaseStudy, index: number) => {
            const isExpanded = expandedId === study.id;
            return (
              <div
                key={study.id}
                className={`lab-card rounded-2xl transition-all border overflow-hidden ${
                  isExpanded ? 'border-cyan-500/50 bg-slate-900/90 shadow-2xl' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900/80'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(study.id)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  role="button"
                  aria-expanded={isExpanded}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleExpand(study.id); }}
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                        CASE STUDY 0{index + 1}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        {study.company}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs font-mono text-slate-400">
                        {study.period}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 hover:text-cyan-400 transition-colors">
                      {study.title}
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {study.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex flex-wrap gap-1.5 max-w-[220px]">
                      {study.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="tech-tag text-[11px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                      aria-label={isExpanded ? 'Collapse case study' : 'Expand case study details'}
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Technical Details Panel */}
                {isExpanded && (
                  <div className="px-6 pb-8 sm:px-8 pt-4 border-t border-slate-800/80 space-y-8 animate-fadeIn">
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs font-mono text-slate-400 font-semibold mr-2">Full Tech Stack:</span>
                      {study.techStack.map((tech, i) => (
                        <span key={i} className="tech-tag text-cyan-300 bg-slate-800/90">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column: Context, Constraint & Ownership */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5" /> Engineering Context & Challenge
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                            {study.context}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold mb-2">
                            Operating Constraints
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                            {study.constraint}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold mb-2">
                            Peter's Individual Ownership
                          </h4>
                          <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                            {study.ownership}
                          </p>
                        </div>
                      </div>

                      {/* Right Column: Technical Approach & Delivered Results */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-3">
                            Technical Approach & Methodologies
                          </h4>
                          <ul className="space-y-2.5">
                            {study.technicalApproach.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                          <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-semibold mb-1">
                            Result & Delivered Artifact
                          </h4>
                          <p className="text-sm text-slate-200 font-semibold leading-relaxed">
                            {study.resultsAndImpact}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
                            Why This Work Matters for Staff/Principal AI Roles
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {study.whyItMatters}
                          </p>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <a
                            href={
                              study.id === 'rivian-speech-ai' ? '/work/rivian-voice-ai' :
                              study.id === 'intel-vision-accelerator' ? '/work/intel-efficient-inference' :
                              study.id === 'intel-mobileye-rss' ? '/work/mobileye-rss' :
                              '/work/sharp-computer-vision'
                            }
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-md"
                          >
                            <span>Explore Dedicated Case Study Page</span>
                          </a>

                          {study.publicEvidence && (
                            <a
                              href={study.publicEvidence.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-mono text-xs font-bold transition-all group"
                            >
                              <span>{study.publicEvidence.label}</span>
                              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
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
