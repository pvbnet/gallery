import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

export const TechnicalWorkbench: React.FC = () => {
  const workbenchItems = [
    {
      id: 'vision-lab',
      number: '01',
      title: 'Edge Vision Inference Lab',
      badge: 'LIVE ON-DEVICE COMPUTATION',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      description: 'Run a public computer-vision model directly in your browser and inspect latency, backend, and memory tradeoffs.',
      whatYouCanDo: 'Select sample frames or upload local images (100% private, zero uploads). Measure cold vs warm latency across WebGPU and WASM SIMD.',
      whatIsRunning: 'Real ONNX model execution via `onnxruntime-web` using SqueezeNet 1.0 (4.72 MB).',
      type: 'Live Browser ML Model',
      href: '/lab/vision-inference',
      actionLabel: 'Launch Edge Vision Lab'
    },
    {
      id: 'rss-explorer',
      number: '02',
      title: 'RSS Safety Scenario Explorer',
      badge: 'LIVE MATHEMATICAL SIMULATION',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      description: 'Interactive top-down 2D autonomous vehicle safety simulator evaluating Responsibility Sensitive Safety (RSS) mathematical rules.',
      whatYouCanDo: 'Adjust ego speed, lead speed, reaction time, and braking parameters. Observe real-time safe distance boundary calculation.',
      whatIsRunning: 'Client-side RSS mathematical engine implementing formulas from the open-source Intel/Mobileye `ad-rss-lib` project.',
      type: 'Live AV Safety Simulator',
      href: '/lab/rss-safety',
      actionLabel: 'Launch RSS Simulator'
    },
    {
      id: 'super-resolution',
      number: '03',
      title: 'Image Processing & Super-Resolution Gallery',
      badge: 'INTERACTIVE VISUAL STUDIES',
      badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      description: 'Interactive before/after gallery illustrating video upscaling, spatiotemporal denoising, Sobel edge detection, and defect inspection.',
      whatYouCanDo: 'Drag before/after sliders, adjust noise levels, inspect Sobel edge detection filters, and examine defect inspection overlays.',
      whatIsRunning: 'Client-side HTML5 Canvas pixel manipulation and filter algorithms.',
      type: 'Interactive Visual Gallery',
      href: '/lab/super-resolution',
      actionLabel: 'Explore Image Gallery'
    },
    {
      id: 'speech-lab',
      number: '04',
      title: 'In-Vehicle Speech Optimization Lab',
      badge: 'SYNTHETIC SYSTEMS SIMULATION',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      description: 'Compare synthetic baseline and optimized speech pipelines through playable audio, waveforms, spectrograms, latency breakdowns, and memory tradeoffs.',
      whatYouCanDo: 'Toggle baseline/optimized audio, adjust cabin noise intensity slider, examine animated stage latency bars and memory metrics.',
      whatIsRunning: 'Web Audio API PCM synthesis, dynamic gain nodes, and animated pipeline performance dashboard.',
      type: 'Synthetic Systems Simulation',
      href: '/lab/speech-optimization',
      actionLabel: 'Launch Speech Lab'
    },
    {
      id: 'model-to-silicon',
      number: '05',
      title: 'Vision Model-to-Silicon Lab',
      badge: 'HARDWARE-SOFTWARE CO-DESIGN',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description: 'Explore how precision, memory bandwidth, and hardware mapping affect synthetic segmentation, depth, and super-resolution workloads.',
      whatYouCanDo: 'Switch FP32/FP16/INT8 profiles, test throughput/bandwidth/SRAM budget gates, observe DRAM spill warnings and hardware mapping paths.',
      whatIsRunning: 'Deterministic hardware co-design simulation engine evaluating synthetic vision workloads.',
      type: 'Hardware-Software Co-Design',
      href: '/lab/model-to-silicon',
      actionLabel: 'Launch Co-Design Lab'
    }
  ];

  return (
    <section id="workbench" className="py-24 bg-slate-950/80 border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Terminal className="w-4 h-4" /> Live Interactive Prototypes
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Technical Workbench
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-lg mt-3 md:mt-0 font-normal">
            Explore working demonstrations and visual engineering studies built with public models, public data, and open technical sources.
          </p>
        </div>

        {/* Workbench Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {workbenchItems.map((item) => (
            <div
              key={item.id}
              className="lab-card rounded-2xl p-6 flex flex-col justify-between border border-slate-800 hover:border-cyan-500/50 bg-slate-900/60"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    DEMO {item.number}
                  </span>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border truncate ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-100">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 pt-2 text-[11px]">
                  <div>
                    <span className="font-mono text-cyan-400 font-bold">What you can do:</span>
                    <p className="text-slate-300 mt-0.5">{item.whatYouCanDo}</p>
                  </div>
                  <div>
                    <span className="font-mono text-teal-400 font-bold">What is running:</span>
                    <p className="text-slate-300 mt-0.5">{item.whatIsRunning}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <a
                  href={item.href}
                  className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold transition-all group"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
