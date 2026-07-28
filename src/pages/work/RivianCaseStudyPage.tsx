import React from 'react';
import { ArrowLeft, Activity, Zap, ArrowRight } from 'lucide-react';

export const RivianCaseStudyPage: React.FC = () => {
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
              CASE STUDY 01
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">
              Rivian & Volkswagen Group Technologies (2025–2026)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Optimizing the Rivian Voice Assistant Across the Speech Inference Stack
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Senior Staff AI Engineer leading speech-AI model inference optimization for the Rivian Voice Assistant (text-to-speech, automatic speech recognition, noise suppression) and embedded vision algorithm development for camera security features.
          </p>
        </div>

        {/* Conceptual Pipeline Signal-Flow Diagram Banner */}
        <div className="lab-card rounded-2xl p-8 border border-slate-800 space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
              <Activity className="w-4 h-4" /> Conceptual Speech AI Signal Flow & Inference Pipeline
            </h3>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Conceptual Diagram — Not Rivian Architecture
            </span>
          </div>

          {/* 6 Stage Horizontal Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-xs text-cyan-400 font-bold">STAGE 1</div>
              <div className="text-sm font-bold text-slate-100">Cabin Audio</div>
              <div className="text-[11px] font-mono text-slate-400">Microphone Array</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-xs text-teal-400 font-bold">STAGE 2</div>
              <div className="text-sm font-bold text-slate-100">Noise Filter</div>
              <div className="text-[11px] font-mono text-slate-400">Neural Denoising</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-xs text-amber-400 font-bold">STAGE 3</div>
              <div className="text-sm font-bold text-slate-100">Speech Recog</div>
              <div className="text-[11px] font-mono text-slate-400">ASR Acoustic Model</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-xs text-purple-400 font-bold">STAGE 4</div>
              <div className="text-sm font-bold text-slate-100">Intent Parse</div>
              <div className="text-[11px] font-mono text-slate-400">Vehicle Command</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-xs text-emerald-400 font-bold">STAGE 5</div>
              <div className="text-sm font-bold text-slate-100">Response Gen</div>
              <div className="text-[11px] font-mono text-slate-400">Dialog Engine</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-xs text-blue-400 font-bold">STAGE 6</div>
              <div className="text-sm font-bold text-slate-100">Text-To-Speech</div>
              <div className="text-[11px] font-mono text-slate-400">TTS Audio Output</div>
            </div>
          </div>
        </div>

        {/* Detailed Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold">
              Engineering Context & Constraints
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              In-vehicle voice assistants must respond with near-zero latency while contending with noisy acoustic environments and competing against safety-critical processes for shared SoC memory bandwidth and compute cycles.
            </p>
          </div>

          <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono text-teal-400 uppercase font-bold">
              Confirmed Scope & Technical Ownership
            </h3>
            <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              Led speech-AI model inference optimization for text-to-speech, automatic speech recognition, and noise-filtering models. Led embedded-vision algorithm and software development for camera-based security features.
            </p>
          </div>
        </div>

        {/* Related Independent Demonstration Section */}
        <div className="lab-card rounded-2xl p-8 border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 space-y-4 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
            <Zap className="w-4 h-4" /> RELATED INDEPENDENT DEMONSTRATION
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            Interactive Speech Pipeline Optimization Lab
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore a synthetic, public-data demonstration of the latency, memory, noise, and quality tradeoffs involved in optimizing an embedded speech pipeline.
          </p>
          <div className="pt-2">
            <a
              href="/lab/speech-optimization"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 group"
            >
              <span>Launch Synthetic Speech Lab</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Mandatory Disclosure */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <strong className="text-amber-400">Disclosure:</strong> Conceptual visualization illustrating general speech AI pipeline constraints. It does not depict proprietary Rivian system architecture, confidential code, or employer benchmarks.
        </div>

      </div>
    </div>
  );
};
