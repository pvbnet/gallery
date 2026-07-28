import React, { useState } from 'react';
import { AudioWaveform, Cpu, Activity, Microchip, ShieldCheck, Smartphone, Layers, Info } from 'lucide-react';

interface Stage {
  id: string;
  number: string;
  name: string;
  sub: string;
  icon: React.ElementType;
  color: string;
  description: string;
  keyWork: string;
  provenAt: string;
  tools: string[];
}

export const InteractiveArchitecture: React.FC = () => {
  const stages: Stage[] = [
    {
      id: 'signal',
      number: '01',
      name: 'Signal / Data',
      sub: 'Sensors & Streaming Inputs',
      icon: AudioWaveform,
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
      description: 'Handling acoustic speech audio, camera image signal processors (ISP), 4K/8K display video streams, and 3D LiDAR point clouds under real-time sensor constraints.',
      keyWork: 'ISP enhancement algorithms, speech acoustic feature extraction, and high-compression image-based LiDAR encoding.',
      provenAt: 'Intel Camera Tech, Sharp Labs TV Systems, Mobileye Fleet Data Collection',
      tools: ['Acoustic Audio', 'Camera ISP', 'LiDAR Data', 'Video Streams', 'C++']
    },
    {
      id: 'model',
      number: '02',
      name: 'Model / Algorithm',
      sub: 'Deep Learning Architectures',
      icon: Layers,
      color: 'text-teal-400 border-teal-500/40 bg-teal-500/10',
      description: 'Designing deep learning and signal processing algorithms tailored for high accuracy and structural efficiency.',
      keyWork: 'Automatic speech recognition (ASR), text-to-speech (TTS), semantic segmentation, monocular depth estimation, and single-image super-resolution.',
      provenAt: 'Rivian Voice Assistant, Intel DL Vision Models, Sharp Display Upscaling',
      tools: ['PyTorch', 'ASR/TTS', 'Segmentation', 'Depth Mapping', 'Super-Resolution']
    },
    {
      id: 'profile',
      number: '03',
      name: 'Profile / Optimize',
      sub: 'Quantization & Bottleneck Analysis',
      icon: Activity,
      color: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
      description: 'Systematic memory bandwidth, activation, and MAC throughput profiling to eliminate latency spikes and reduce compute footprint.',
      keyWork: 'INT8 / FP16 post-training quantization, semi-frozen network optimization, graph transformations, and runtime engine execution layout.',
      provenAt: 'Rivian Speech Inference, Intel Profiling & Quantization Toolchain',
      tools: ['INT8/FP16', 'ONNX Runtime', 'TensorRT', 'OpenVINO', 'TVM', 'Pruning']
    },
    {
      id: 'hardware',
      number: '04',
      name: 'Map to Silicon',
      sub: 'Accelerator Functional Specs',
      icon: Microchip,
      color: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
      description: 'Bridging software models with hardware microarchitecture by co-designing silicon accelerator functional specifications.',
      keyWork: 'Functional hardware specifications for low-precision neural network accelerators, MAC array sizing, and activation buffer dataflow mapping.',
      provenAt: 'Intel Camera & Vision Technology Group DL Accelerator Co-Design',
      tools: ['Hardware Functional Specs', 'MAC Optimization', 'Memory Reuse', 'Bandwidth Limits']
    },
    {
      id: 'safety',
      number: '05',
      name: 'Validate & Safety',
      sub: 'KPIs & Deterministic Rules',
      icon: ShieldCheck,
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
      description: 'Validating safety-critical rules and performance KPIs under rigorous real-world scenario testing.',
      keyWork: 'Scenario-based safety KPI algorithms and technical lead for the open-source C++ Responsibility Sensitive Safety library (`ad-rss-lib`).',
      provenAt: 'Intel & Mobileye Automated Driving Safety',
      tools: ['C++14/17', 'ad-rss-lib', 'Safety KPIs', 'Scenario Simulation', 'GTest']
    },
    {
      id: 'product',
      number: '06',
      name: 'Product Integration',
      sub: 'Embedded Real-World Deployment',
      icon: Smartphone,
      color: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
      description: 'Deploying optimized AI into production automotive platforms, mobile robots, smart security cameras, and high-end displays.',
      keyWork: 'In-vehicle voice assistant execution, production camera security algorithms, consumer electronics tech transfer, and international MPEG standards.',
      provenAt: 'Rivian Vehicles, Sharp Consumer TVs & Robots, Mobileye Fleet Platforms',
      tools: ['Automotive SoC', 'Embedded Vision', 'Mobile Robots', 'MPEG Standards']
    }
  ];

  const [activeStage, setActiveStage] = useState<Stage>(stages[0]);

  return (
    <section id="architecture" className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Cpu className="w-4 h-4" /> End-to-End Operating Range
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              From Signal to System
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-lg mt-3 md:mt-0 font-normal">
            Click through the pipeline stages below to examine Peter’s hands-on engineering contributions at every layer of the AI stack.
          </p>
        </div>

        {/* Pipeline Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {stages.map((stage) => {
            const Icon = stage.icon;
            const isSelected = activeStage.id === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage)}
                className={`p-4 rounded-xl text-left transition-all border relative overflow-hidden group ${
                  isSelected
                    ? `${stage.color} border-cyan-500/60 shadow-lg shadow-cyan-500/10`
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
                aria-selected={isSelected}
                role="tab"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-400">{stage.number}</span>
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                </div>
                <div className="font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                  {stage.name}
                </div>
                <div className="text-[11px] font-mono text-slate-400 truncate mt-0.5">
                  {stage.sub}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="lab-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  STAGE {activeStage.number}
                </span>
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                  {activeStage.name}
                </h3>
              </div>

              <p className="text-slate-300 text-base leading-relaxed">
                {activeStage.description}
              </p>

              <div className="pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  Key Technical Work Delivered:
                </div>
                <p className="text-slate-200 font-medium text-sm bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                  {activeStage.keyWork}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-xl border border-slate-800 space-y-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1 font-semibold">
                  Proven Experience:
                </div>
                <div className="text-sm font-semibold text-slate-100">
                  {activeStage.provenAt}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  Primary Toolchains & Technologies:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeStage.tools.map((tool, idx) => (
                    <span key={idx} className="tech-tag text-cyan-300 bg-slate-800/80">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Conceptual representation of Peter van Beek's end-to-end engineering methodology.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
