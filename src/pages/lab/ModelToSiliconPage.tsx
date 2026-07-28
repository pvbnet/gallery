import React, { useState } from 'react';
import { ArrowLeft, Activity, Microchip, Layers, Info, Sliders, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Fixture {
  sizeMB: number;
  latencyMs: number;
  fps: number;
  bandwidthGBs: number;
  peakMemoryMB: number;
  energyMJ: number;
  quality: string;
  pipeline: {
    prepMs: number;
    backboneMs: number;
    decoderMs: number;
    postMs: number;
  };
}

const FIXTURES: Record<'seg' | 'depth' | 'sr', Record<'fp32' | 'fp16' | 'int8', Fixture>> = {
  seg: {
    fp32: { sizeMB: 96, latencyMs: 34.8, fps: 28.7, bandwidthGBs: 12.4, peakMemoryMB: 148, energyMJ: 6.8, quality: '78.4 mIoU', pipeline: { prepMs: 2.5, backboneMs: 21.4, decoderMs: 8.1, postMs: 2.8 } },
    fp16: { sizeMB: 48, latencyMs: 20.6, fps: 48.5, bandwidthGBs: 7.3, peakMemoryMB: 86, energyMJ: 3.9, quality: '78.3 mIoU', pipeline: { prepMs: 1.8, backboneMs: 12.4, decoderMs: 4.7, postMs: 1.7 } },
    int8: { sizeMB: 24, latencyMs: 11.2, fps: 89.3, bandwidthGBs: 4.1, peakMemoryMB: 52, energyMJ: 2.3, quality: '77.9 mIoU', pipeline: { prepMs: 1.4, backboneMs: 6.3, decoderMs: 2.5, postMs: 1.0 } }
  },
  depth: {
    fp32: { sizeMB: 82, latencyMs: 29.6, fps: 33.8, bandwidthGBs: 10.7, peakMemoryMB: 126, energyMJ: 5.9, quality: '0.112 AbsRel', pipeline: { prepMs: 2.1, backboneMs: 18.2, decoderMs: 6.9, postMs: 2.4 } },
    fp16: { sizeMB: 41, latencyMs: 17.3, fps: 57.8, bandwidthGBs: 6.4, peakMemoryMB: 74, energyMJ: 3.5, quality: '0.113 AbsRel', pipeline: { prepMs: 1.5, backboneMs: 10.5, decoderMs: 3.9, postMs: 1.4 } },
    int8: { sizeMB: 21, latencyMs: 9.8, fps: 102.0, bandwidthGBs: 3.6, peakMemoryMB: 46, energyMJ: 2.0, quality: '0.116 AbsRel', pipeline: { prepMs: 1.1, backboneMs: 5.6, decoderMs: 2.2, postMs: 0.9 } }
  },
  sr: {
    fp32: { sizeMB: 64, latencyMs: 41.5, fps: 24.1, bandwidthGBs: 14.9, peakMemoryMB: 192, energyMJ: 7.4, quality: '31.8 dB PSNR', pipeline: { prepMs: 2.8, backboneMs: 26.5, decoderMs: 9.2, postMs: 3.0 } },
    fp16: { sizeMB: 32, latencyMs: 24.7, fps: 40.5, bandwidthGBs: 8.8, peakMemoryMB: 112, energyMJ: 4.5, quality: '31.7 dB PSNR', pipeline: { prepMs: 2.0, backboneMs: 15.3, decoderMs: 5.4, postMs: 2.0 } },
    int8: { sizeMB: 16, latencyMs: 14.6, fps: 68.5, bandwidthGBs: 5.2, peakMemoryMB: 68, energyMJ: 2.8, quality: '31.5 dB PSNR', pipeline: { prepMs: 1.5, backboneMs: 8.8, decoderMs: 3.1, postMs: 1.2 } }
  }
};

export const ModelToSiliconPage: React.FC = () => {
  const [workload, setWorkload] = useState<'seg' | 'depth' | 'sr'>('seg');
  const [profile, setProfile] = useState<'fp32' | 'fp16' | 'int8'>('int8');

  // Hardware Budget Controls (Defaults: 60 FPS, 6.0 GB/s, 64 MB SRAM)
  const [targetFps, setTargetFps] = useState<number>(60);
  const [availBw, setAvailBw] = useState<number>(6.0);
  const [availSram, setAvailSram] = useState<number>(64);

  const [srSliderPos, setSrSliderPos] = useState<number>(50);

  const currentFixture = FIXTURES[workload][profile];
  const baselineFixture = FIXTURES[workload]['fp32'];

  const fpsPass = currentFixture.fps >= targetFps;
  const bwPass = currentFixture.bandwidthGBs <= availBw;
  const sramPass = currentFixture.peakMemoryMB <= availSram;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between mb-6 text-xs font-mono">
          <a href="/work/intel-efficient-inference" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Case Study 02 (Intel Efficient Inference)
          </a>
          <a href="/#workbench" className="text-slate-400 hover:text-slate-200">
            Technical Workbench →
          </a>
        </div>

        {/* PROMINENT MANDATORY DISCLOSURE HEADER */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Independent Synthetic Engineering Demonstration:</strong> Models, diagrams, hardware budgets, outputs, and measurements are illustrative. They do not represent Intel products, accelerator microarchitecture, internal tools, datasets, or benchmark results.
          </div>
        </div>

        {/* Title Banner */}
        <div className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold mb-3">
            <Microchip className="w-4 h-4" /> DEMONSTRATION 05 — SILICON HARDWARE CO-DESIGN
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-3">
            Vision Model-to-Silicon Co-Design Lab
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Explore how precision, memory traffic, and hardware budgets affect an illustrative edge-vision workload.
          </p>
        </div>

        {/* WORKLOAD & PROFILE SELECTOR TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Workload Selector (Left) */}
          <div className="lg:col-span-6 lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" /> 1. Select Synthetic Vision Workload
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWorkload('seg')}
                className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                  workload === 'seg'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                Semantic Segmentation
              </button>
              <button
                onClick={() => setWorkload('depth')}
                className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                  workload === 'depth'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                Depth Estimation
              </button>
              <button
                onClick={() => setWorkload('sr')}
                className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                  workload === 'sr'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                Super-Resolution
              </button>
            </div>
          </div>

          {/* Inference Profile Selector (Right) */}
          <div className="lg:col-span-6 lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-teal-400 uppercase font-bold flex items-center gap-2">
              <Activity className="w-4 h-4" /> 2. Select Precision Inference Profile
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setProfile('fp32')}
                className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                  profile === 'fp32'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-300 font-bold shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                Baseline FP32 (Full)
              </button>
              <button
                onClick={() => setProfile('fp16')}
                className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                  profile === 'fp16'
                    ? 'border-teal-500 bg-teal-500/10 text-teal-300 font-bold shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                Optimized FP16 (Half)
              </button>
              <button
                onClick={() => setProfile('int8')}
                className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                  profile === 'int8'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 font-bold shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                Optimized INT8 (8-bit)
              </button>
            </div>
          </div>
        </div>

        {/* WORKLOAD VISUALIZATION OUTPUT & BENCHMARKS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Visual Output Render */}
          <div className="lg:col-span-6 lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold">
                Synthetic Reference Output View
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Workload: {workload.toUpperCase()} | Profile: {profile.toUpperCase()}
              </span>
            </div>

            {/* Semantic Segmentation Output Render */}
            {workload === 'seg' && (
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <img src="/samples/road_vision.jpg" alt="Road Vision" className="w-full h-full object-cover" />
                  {/* Segmentation Color Mask Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-emerald-500/20 to-purple-500/30 mix-blend-color-dodge"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/80 text-slate-950 font-bold">Road (98.4%)</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/80 text-slate-950 font-bold">Vehicle (94.1%)</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/80 text-white font-bold">Vegetation (91.2%)</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/80 text-slate-950 font-bold">Sky (99.0%)</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Per-pixel semantic class overlay highlighting road surface, vehicles, vegetation, and sky boundaries.
                </div>
              </div>
            )}

            {/* Monocular Depth Estimation Output Render */}
            {workload === 'depth' && (
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <img src="/samples/road_vision.jpg" alt="Depth Frame" className="w-full h-full object-cover filter contrast-200 hue-rotate-180 invert" />
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 p-2 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1">
                    <div className="text-slate-400 font-semibold">Depth Map Color Legend:</div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-red-500"></span> <span>Near (&lt; 5m)</span>
                      <span className="w-3 h-3 rounded bg-yellow-500 ml-2"></span> <span>Mid (15m)</span>
                      <span className="w-3 h-3 rounded bg-blue-500 ml-2"></span> <span>Far (&gt; 50m)</span>
                    </div>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Dense false-color monocular depth map evaluating per-pixel distance to obstacles. (Lower AbsRel = better accuracy).
                </div>
              </div>
            )}

            {/* Super-Resolution Output Render */}
            {workload === 'sr' && (
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden select-none">
                  {/* Low Res Input */}
                  <img src="/samples/camera_inspection.jpg" alt="Low Res Input" className="absolute inset-0 w-full h-full object-cover blur-[2px]" />
                  <div className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded text-[10px] font-mono text-slate-400 border border-slate-800">
                    Bilinear Low-Res Input (1080p)
                  </div>

                  {/* Super Resolution Clipped Frame */}
                  <div className="absolute inset-0 overflow-hidden border-r-2 border-cyan-400" style={{ width: `${srSliderPos}%` }}>
                    <img src="/samples/camera_inspection.jpg" alt="Super Resolution Output" className="absolute inset-0 w-full h-full object-cover saturate-150 contrast-125" />
                    <div className="absolute top-3 left-3 bg-cyan-950/90 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/40 font-bold">
                      Super-Resolution Restored (4K)
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={srSliderPos}
                    onChange={(e) => setSrSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Drag the slider to compare low-res input versus edge-preserving super-resolution reconstruction.
                </div>
              </div>
            )}
          </div>

          {/* Illustrative Fixture Metrics Grid */}
          <div className="lg:col-span-6 lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold">
                Illustrative Performance & Quality Metrics
              </h3>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                All numbers illustrative
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Model Footprint</div>
                <div className="text-lg font-extrabold text-cyan-400 font-mono mt-1">{currentFixture.sizeMB} MB</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">vs {baselineFixture.sizeMB} MB Base</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Inference Latency</div>
                <div className="text-lg font-extrabold text-teal-400 font-mono mt-1">{currentFixture.latencyMs} ms</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">vs {baselineFixture.latencyMs} ms Base</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Throughput (FPS)</div>
                <div className="text-lg font-extrabold text-emerald-400 font-mono mt-1">{currentFixture.fps} FPS</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">vs {baselineFixture.fps} FPS Base</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Quality Metric</div>
                <div className="text-lg font-extrabold text-purple-400 font-mono mt-1">{currentFixture.quality}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">vs {baselineFixture.quality} Base</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Memory Bandwidth</div>
                <div className="text-base font-bold text-slate-100 font-mono mt-0.5">{currentFixture.bandwidthGBs} GB/s</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Peak Activation RAM</div>
                <div className="text-base font-bold text-slate-100 font-mono mt-0.5">{currentFixture.peakMemoryMB} MB</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">Estimated Energy</div>
                <div className="text-base font-bold text-slate-100 font-mono mt-0.5">{currentFixture.energyMJ} mJ/frame</div>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE HARDWARE-BUDGET CONTROLS & PASS/FAIL GATES */}
        <div className="lab-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Interactive Hardware Budget Constraints & Gates
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Adjust available edge silicon constraints to test whether the current profile meets target hardware budgets.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded text-xs font-mono font-bold border ${
                fpsPass && bwPass && sramPass
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-red-500/20 text-red-400 border-red-500/40'
              }`}>
                {fpsPass && bwPass && sramPass ? 'HARDWARE BUDGET: FIT PASSED' : 'HARDWARE BUDGET: EXCEEDED'}
              </span>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Target FPS Slider */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Target Throughput:</span>
                <span className="text-cyan-400 font-bold">{targetFps} FPS</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="5"
                value={targetFps}
                onChange={(e) => setTargetFps(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between items-center text-[11px] font-mono pt-1">
                <span className="text-slate-400">Achieved: {currentFixture.fps} FPS</span>
                <span className={`font-bold ${fpsPass ? 'text-emerald-400' : 'text-red-400'}`}>
                  {fpsPass ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>

            {/* Memory Bandwidth Slider */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Memory Bandwidth Limit:</span>
                <span className="text-teal-400 font-bold">{availBw} GB/s</span>
              </div>
              <input
                type="range"
                min="3"
                max="16"
                step="0.5"
                value={availBw}
                onChange={(e) => setAvailBw(Number(e.target.value))}
                className="w-full accent-teal-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between items-center text-[11px] font-mono pt-1">
                <span className="text-slate-400">Achieved: {currentFixture.bandwidthGBs} GB/s</span>
                <span className={`font-bold ${bwPass ? 'text-emerald-400' : 'text-red-400'}`}>
                  {bwPass ? 'PASS' : 'FAIL'}
                </span>
              </div>
            </div>

            {/* On-Chip SRAM Slider */}
            <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Available On-Chip SRAM:</span>
                <span className="text-purple-400 font-bold">{availSram} MB</span>
              </div>
              <input
                type="range"
                min="32"
                max="192"
                step="8"
                value={availSram}
                onChange={(e) => setAvailSram(Number(e.target.value))}
                className="w-full accent-purple-400 bg-slate-900 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between items-center text-[11px] font-mono pt-1">
                <span className="text-slate-400">Peak Memory: {currentFixture.peakMemoryMB} MB</span>
                <span className={`font-bold ${sramPass ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {sramPass ? 'SRAM FIT' : 'SPILL TO DRAM'}
                </span>
              </div>
            </div>
          </div>

          {/* DRAM Activation Spill Warning Banner */}
          {!sramPass && (
            <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-950/20 text-amber-300 text-xs font-mono flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong>Activation Spill to External Memory:</strong> Peak memory ({currentFixture.peakMemoryMB} MB) exceeds available on-chip SRAM ({availSram} MB). Activations will spill to external DRAM, increasing latency and memory traffic.
              </div>
            </div>
          )}

          <div className="text-[11px] font-mono text-slate-400 pt-1">
            <strong>Note:</strong> These controls represent engineering budget gates, not a physically accurate silicon microarchitecture simulator.
          </div>
        </div>

        {/* MODEL-TO-SILICON WORKFLOW VISUALIZATION */}
        <div className="lab-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 mb-10">
          <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
            <Activity className="w-4 h-4" /> Hardware Mapping & Pipeline Stage Timing
          </h3>

          {/* Pipeline Stage Timing Breakdown */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-300 font-semibold">
              Pipeline Stage Latency Breakdown (Total: {currentFixture.latencyMs} ms)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">1. Preprocessing</div>
                <div className="text-sm font-bold text-cyan-400 font-mono mt-0.5">{currentFixture.pipeline.prepMs} ms</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">2. Backbone Encoder</div>
                <div className="text-sm font-bold text-teal-400 font-mono mt-0.5">{currentFixture.pipeline.backboneMs} ms</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">3. Decoder / Head</div>
                <div className="text-sm font-bold text-amber-400 font-mono mt-0.5">{currentFixture.pipeline.decoderMs} ms</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-[10px] font-mono text-slate-400">4. Postprocessing</div>
                <div className="text-sm font-bold text-purple-400 font-mono mt-0.5">{currentFixture.pipeline.postMs} ms</div>
              </div>
            </div>
          </div>

          {/* Hardware Path Visualizer */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-mono text-slate-400 font-semibold">
              Hardware Mapping Path Visualizer:
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
              <div className={`p-3 rounded-lg border text-center flex-1 w-full ${!sramPass ? 'border-amber-500/60 bg-amber-500/10 text-amber-300' : 'border-slate-800 bg-slate-900 text-slate-400'}`}>
                External DRAM Traffic ({currentFixture.bandwidthGBs} GB/s)
              </div>
              <span className="text-slate-600 font-bold">→</span>
              <div className="p-3 rounded-lg border border-purple-500/40 bg-purple-500/10 text-purple-300 text-center flex-1 w-full font-bold">
                On-Chip SRAM ({availSram} MB Cap)
              </div>
              <span className="text-slate-600 font-bold">→</span>
              <div className="p-3 rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-center flex-1 w-full font-bold">
                Compute / MAC Engine
              </div>
              <span className="text-slate-600 font-bold">→</span>
              <div className="p-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-center flex-1 w-full font-bold">
                Output Tensor
              </div>
            </div>
          </div>
        </div>

        {/* WHAT THIS DEMONSTRATES & WHAT THIS DOES NOT CLAIM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> What This Lab Demonstrates
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Systematic profiling of memory bandwidth & MAC compute bottlenecks.</li>
              <li>• Precision & quantization tradeoffs between FP32, FP16, and INT8.</li>
              <li>• Memory footprint reduction for constrained edge silicon.</li>
              <li>• Mapping deep learning workloads to hardware SRAM & bandwidth gates.</li>
              <li>• Balancing vision model accuracy against latency and power constraints.</li>
            </ul>
          </div>

          <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <h4 className="text-xs font-mono text-amber-400 uppercase font-bold flex items-center gap-2">
              <Info className="w-4 h-4" /> What This Lab Does Not Claim
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Does not disclose proprietary Intel silicon microarchitecture or specs.</li>
              <li>• Does not represent confidential employer benchmark numbers or internal code.</li>
              <li>• Does not use proprietary employer datasets or trade secrets.</li>
              <li>• All figures are deterministic illustrative engineering fixtures.</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM MANDATORY DISCLOSURE */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <strong className="text-amber-400">Independent synthetic engineering demonstration:</strong> Models, diagrams, hardware budgets, outputs, and measurements are illustrative. They do not represent Intel products, accelerator microarchitecture, internal tools, datasets, or benchmark results.
        </div>

      </div>
    </div>
  );
};
