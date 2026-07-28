import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { EdgeVisionLab } from '../../components/EdgeVisionLab';

export const VisionInferencePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <a href="/#workbench" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Technical Workbench
          </a>
        </div>
        <EdgeVisionLab />
      </div>
    </div>
  );
};
