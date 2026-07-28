import React from 'react';
import { ArrowLeft, Microchip } from 'lucide-react';

export const IntelCaseStudyPage: React.FC = () => {
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
              CASE STUDY 02
            </span>
            <span className="text-xs font-mono text-slate-400 font-semibold">
              Intel Corporation — Camera & Vision Tech Group (2019–2024)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Efficient Deep Learning Vision Models & Accelerator Hardware Co-Design
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Developed efficient deep-learning models for semantic segmentation, depth estimation, and super-resolution while owning functional specifications for deep-learning inference accelerator hardware.
          </p>
        </div>

        {/* Conceptual Model-to-Silicon Visual Flow */}
        <div className="lab-card rounded-2xl p-8 border border-slate-800 space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
              <Microchip className="w-4 h-4" /> Conceptual Model-to-Silicon Co-Design Methodology
            </h3>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Conceptual Visual Narrative — Not Actual Intel Accelerator Microarchitecture
            </span>
          </div>

          {/* 7 Stage Co-Design Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-cyan-400 font-bold">STEP 1</div>
              <div className="text-xs font-bold text-slate-100">Vision Task</div>
              <div className="text-[10px] font-mono text-slate-400">Segmentation/Depth</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-teal-400 font-bold">STEP 2</div>
              <div className="text-xs font-bold text-slate-100">Profiling</div>
              <div className="text-[10px] font-mono text-slate-400">Memory/MAC</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-amber-400 font-bold">STEP 3</div>
              <div className="text-xs font-bold text-slate-100">Optimization</div>
              <div className="text-[10px] font-mono text-slate-400">Model Topology</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-purple-400 font-bold">STEP 4</div>
              <div className="text-xs font-bold text-slate-100">Quantization</div>
              <div className="text-[10px] font-mono text-slate-400">Low Precision</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-emerald-400 font-bold">STEP 5</div>
              <div className="text-xs font-bold text-slate-100">HW Mapping</div>
              <div className="text-[10px] font-mono text-slate-400">Activation Buffer</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-blue-400 font-bold">STEP 6</div>
              <div className="text-xs font-bold text-slate-100">HW Specs</div>
              <div className="text-[10px] font-mono text-slate-400">Accelerator Specs</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <div className="font-mono text-[10px] text-cyan-300 font-bold">STEP 7</div>
              <div className="text-xs font-bold text-slate-100">Validation</div>
              <div className="text-[10px] font-mono text-slate-400">Hardware-Ready</div>
            </div>
          </div>
        </div>

        {/* Detailed Evidence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold">
              Deep Learning Vision Models Owned
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Semantic Segmentation models for scene understanding</li>
              <li>• Monocular Depth Estimation architectures</li>
              <li>• Object Detection neural network designs</li>
              <li>• Ultra-efficient single-image Super-Resolution model</li>
            </ul>
          </div>

          <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-xs font-mono text-teal-400 uppercase font-bold">
              Accelerator Hardware Co-Design Owned
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Functional hardware specifications for low-precision accelerators</li>
              <li>• Model-profiling, optimization, and quantization toolchains</li>
              <li>• Hardware-mapping tools connecting neural net layers to silicon buffers</li>
            </ul>
          </div>
        </div>

        {/* Related Independent Demonstration Section */}
        <div className="lab-card rounded-2xl p-8 border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/30 space-y-4 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
            <Microchip className="w-4 h-4" /> RELATED INDEPENDENT DEMONSTRATIONS
          </div>
          <h3 className="text-xl font-bold text-slate-100">
            Vision Model & Accelerator Co-Design Tools
          </h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore a synthetic public demonstration of profiling, quantization, memory mapping, and accelerator tradeoffs for an efficient vision workload.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="/lab/model-to-silicon"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 group"
            >
              <span>Launch Co-Design Lab</span>
            </a>

            <a
              href="/lab/vision-inference"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs font-bold transition-all"
            >
              <span>Run Live ONNX Benchmark</span>
            </a>
          </div>
        </div>

        {/* Mandatory Disclosure */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <strong className="text-amber-400">Disclosure:</strong> Conceptual visual narrative illustrating deep learning silicon co-design concepts. It does not depict proprietary Intel accelerator microarchitecture, confidential silicon specifications, or employer benchmarks.
        </div>

      </div>
    </div>
  );
};
