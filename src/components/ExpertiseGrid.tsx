import React from 'react';
import { CheckCircle2, Wrench } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExpertiseGrid: React.FC = () => {
  return (
    <section id="expertise" className="py-24 bg-slate-950/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Wrench className="w-4 h-4" /> Technical Competencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Proof-Backed Engineering Stack
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-3 md:mt-0 font-normal">
            Every listed capability is grounded in production deployment, published research, silicon co-design specs, or open-source software.
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.expertiseCategories.map((category, index) => (
            <div
              key={index}
              className="lab-card rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/40"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    {category.title}
                  </h3>
                  <span className="font-mono text-xs text-slate-400 font-semibold">
                    0{index + 1}
                  </span>
                </div>

                {/* Skill List */}
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Proven At Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-1">
                  Verified Proof:
                </div>
                <div className="text-xs text-cyan-300/90 font-medium">
                  {category.provenAt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
