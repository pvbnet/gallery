import React from 'react';
import { ArrowLeft, Layers } from 'lucide-react';

export const SharpCaseStudyPage: React.FC = () => {
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
              CASE STUDY 04
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">
              Sharp Labs of America (1998–2016)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Computer Vision Research, Team Leadership & Technology Transfer
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Technical Lead Manager (2013-2016) and Principal Researcher (1998-2013). Led computer-vision and video-processing development for mobile robots, automated inspection, 4K/8K/HDR TV, and security cameras while serving as an MPEG co-editor.
          </p>
        </div>

        {/* Visual Research-to-Application Map Flow */}
        <div className="lab-card rounded-2xl p-8 border border-slate-800 space-y-6 mb-12">
          <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
            <Layers className="w-4 h-4" /> Chronological Research-to-Application Methodology
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-cyan-400 font-bold mb-1">STEP 1. RESEARCH PROBLEM</div>
              <div className="text-sm font-bold text-slate-100">Vision & Video R&D</div>
              <div className="text-xs text-slate-400 mt-1">Super-resolution, defect detection, robotics</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-teal-400 font-bold mb-1">STEP 2. PROTOTYPING</div>
              <div className="text-sm font-bold text-slate-100">Algorithm Design</div>
              <div className="text-xs text-slate-400 mt-1">C++ prototype implementation</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-amber-400 font-bold mb-1">STEP 3. IP & STANDARDS</div>
              <div className="text-sm font-bold text-slate-100">Patents & MPEG</div>
              <div className="text-xs text-slate-400 mt-1">US patents & MPEG co-editor</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 font-bold mb-1">STEP 4. TECH TRANSFER</div>
              <div className="text-sm font-bold text-slate-100">Business Groups</div>
              <div className="text-xs text-slate-400 mt-1">Technology transfer to Sharp groups</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <a
            href="/lab/super-resolution"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg"
          >
            <span>Explore Interactive Super-Resolution Gallery</span>
          </a>
        </div>

      </div>
    </div>
  );
};
