import React from 'react';
import { Calendar, MapPin, GraduationCap, Award, Briefcase } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Briefcase className="w-4 h-4" /> Career & Education History
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Engineering Trajectory
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-3 md:mt-0 font-normal">
            A scan-friendly timeline highlighting scope, technical evolution, and senior technical leadership over 25+ years.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12">
          {PORTFOLIO_DATA.careerTimeline.map((item, index) => (
            <div key={index} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Marker Node */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors"></div>

              <div className="lab-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
                  <div>
                    <span className="font-mono text-xs text-cyan-400 font-semibold tracking-wider uppercase">
                      {item.role}
                    </span>
                    <h3 className="text-xl font-bold text-slate-100 mt-0.5">
                      {item.company}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {item.highlights.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2"></span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Honors Footer Card */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold mb-1">
                ACADEMIC DEGREE
              </div>
              <h4 className="text-lg font-bold text-slate-100">
                Delft University of Technology
              </h4>
              <p className="text-sm text-slate-300 font-medium mt-0.5">
                Ph.D. and M.Sc.Eng. in Electrical and Computer Engineering
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold mb-1">
                DISTINCTION
              </div>
              <h4 className="text-lg font-bold text-slate-100">
                US Frontiers of Engineering
              </h4>
              <p className="text-sm text-slate-300 font-medium mt-0.5">
                Alumnus, 2012 US Frontiers of Engineering Symposium (National Academy of Engineering)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
