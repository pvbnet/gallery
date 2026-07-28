import React, { useState } from 'react';
import { ShieldCheck, ExternalLink, ArrowLeft, Sliders } from 'lucide-react';
import { calculateRSSLongitudinal, RSSInputParams } from '../../utils/rssMath';

export const RssSafetyPage: React.FC = () => {
  const [params, setParams] = useState<RSSInputParams>({
    vEgoKmh: 90,
    vLeadKmh: 75,
    reactionTimeSec: 1.0,
    egoMaxAccel: 1.0,
    egoMinBrake: 4.0,
    leadMaxBrake: 5.0,
    currentDistanceM: 38
  });

  const res = calculateRSSLongitudinal(params);

  const handlePreset = (presetName: string) => {
    if (presetName === 'highway-safe') {
      setParams({ vEgoKmh: 100, vLeadKmh: 95, reactionTimeSec: 1.0, egoMaxAccel: 1.0, egoMinBrake: 4.0, leadMaxBrake: 4.5, currentDistanceM: 55 });
    } else if (presetName === 'highway-unsafe') {
      setParams({ vEgoKmh: 110, vLeadKmh: 60, reactionTimeSec: 1.2, egoMaxAccel: 1.5, egoMinBrake: 3.5, leadMaxBrake: 6.0, currentDistanceM: 25 });
    } else if (presetName === 'urban-stop') {
      setParams({ vEgoKmh: 45, vLeadKmh: 30, reactionTimeSec: 0.8, egoMaxAccel: 0.5, egoMinBrake: 4.5, leadMaxBrake: 4.5, currentDistanceM: 18 });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <a href="/#workbench" className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Technical Workbench
          </a>
        </div>

        {/* Title Banner */}
        <div className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4" /> DEMONSTRATION 02 — AV SAFETY SIMULATOR
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-3">
            Responsibility Sensitive Safety (RSS) Scenario Explorer
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            An interactive visual exploration based on publicly documented Responsibility Sensitive Safety mathematical principles and Peter’s confirmed leadership on the open-source Intel/Mobileye C++ library (`ad-rss-lib`).
          </p>
        </div>

        {/* Presets Bar */}
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 mb-8">
          <span className="text-xs font-mono text-slate-400 font-semibold mr-2 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Scenario Presets:
          </span>
          <button
            onClick={() => handlePreset('highway-safe')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700"
          >
            Highway Safe Following
          </button>
          <button
            onClick={() => handlePreset('highway-unsafe')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-amber-300 border border-slate-700"
          >
            High-Speed Hazard (Tailgating)
          </button>
          <button
            onClick={() => handlePreset('urban-stop')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-teal-300 border border-slate-700"
          >
            Urban Stop-and-Go
          </button>
        </div>

        {/* Main Grid: Roadway Simulation & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Top-Down Visual Roadway Canvas & Calculation Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top-Down Animated Roadway Canvas */}
            <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Top-Down 2D Roadway Simulation Visualizer
                </h3>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded border ${res.stateColor}`}>
                  STATE: {res.state}
                </span>
              </div>

              {/* Roadway Graphics Container */}
              <div className="relative h-44 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center px-8">
                {/* Lane Dividers */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-800"></div>

                {/* Roadway Distance Markers */}
                <div className="absolute bottom-2 left-8 right-8 flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Ego Front Bumper (0m)</span>
                  <span className="text-cyan-400 font-bold">RSS Margin: {res.minSafeDistanceM}m</span>
                  <span>Lead Rear Bumper ({res.currentDistanceM}m)</span>
                </div>

                {/* Ego Vehicle (Left) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-10 rounded-lg bg-cyan-500 border border-cyan-300 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-slate-950 font-mono font-bold text-xs">
                    EGO
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 mt-1 font-bold">{params.vEgoKmh} km/h</span>
                </div>

                {/* Distance Gauge Line */}
                <div className="flex-1 relative mx-4 h-6 flex items-center justify-center">
                  {/* Minimum RSS Safe Distance Required Bar */}
                  <div
                    className="absolute left-0 h-2 bg-cyan-500/30 rounded-full border border-cyan-400/60 transition-all duration-300"
                    style={{ width: `${Math.min(100, (res.minSafeDistanceM / 100) * 100)}%` }}
                    title={`RSS Min Safe Distance: ${res.minSafeDistanceM}m`}
                  ></div>

                  {/* Current Following Distance Line */}
                  <div className="w-full h-0.5 bg-slate-700 relative">
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        res.state === 'SAFE' ? 'bg-emerald-500 text-slate-950' : res.state === 'CAUTION' ? 'bg-amber-500 text-slate-950' : 'bg-red-500 text-white'
                      }`}
                      style={{ left: `${Math.min(90, (params.currentDistanceM / 100) * 100)}%` }}
                    >
                      {params.currentDistanceM}m
                    </div>
                  </div>
                </div>

                {/* Lead Vehicle (Right) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-10 rounded-lg bg-slate-800 border border-slate-600 shadow-lg flex items-center justify-center text-slate-300 font-mono font-bold text-xs">
                    LEAD
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 mt-1 font-bold">{params.vLeadKmh} km/h</span>
                </div>
              </div>

              {/* State Explanation Banner */}
              <div className={`p-4 rounded-xl border text-xs font-mono leading-relaxed ${res.stateColor}`}>
                <div className="font-bold uppercase mb-1">State Explanation:</div>
                <div>{res.explanation}</div>
              </div>
            </div>

            {/* Calculated Values Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Ego Speed (v_ego)</div>
                <div className="text-lg font-bold text-cyan-400 font-mono mt-1">{res.vEgoMs} m/s</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Lead Speed (v_lead)</div>
                <div className="text-lg font-bold text-slate-200 font-mono mt-1">{res.vLeadMs} m/s</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Min RSS Distance (d_min)</div>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-1">{res.minSafeDistanceM} m</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase">Safety Margin</div>
                <div className={`text-lg font-bold font-mono mt-1 ${res.marginM >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {res.marginM >= 0 ? `+${res.marginM} m` : `${res.marginM} m`}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Parameter Sliders & Formula Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Slider Controls Panel */}
            <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Interactive RSS Scenario Inputs
              </h3>

              {/* Slider 1: Ego Speed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Ego Vehicle Speed (v_ego)</span>
                  <span className="text-cyan-400 font-bold">{params.vEgoKmh} km/h</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="160"
                  value={params.vEgoKmh}
                  onChange={(e) => setParams({ ...params, vEgoKmh: Number(e.target.value) })}
                  className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Lead Speed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Lead Vehicle Speed (v_lead)</span>
                  <span className="text-slate-200 font-bold">{params.vLeadKmh} km/h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="160"
                  value={params.vLeadKmh}
                  onChange={(e) => setParams({ ...params, vLeadKmh: Number(e.target.value) })}
                  className="w-full accent-teal-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Current Following Distance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Current Following Distance (d_current)</span>
                  <span className="text-emerald-400 font-bold">{params.currentDistanceM} meters</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={params.currentDistanceM}
                  onChange={(e) => setParams({ ...params, currentDistanceM: Number(e.target.value) })}
                  className="w-full accent-emerald-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: Reaction Time */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Ego Response Time (t_response)</span>
                  <span className="text-amber-400 font-bold">{params.reactionTimeSec} seconds</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={params.reactionTimeSec}
                  onChange={(e) => setParams({ ...params, reactionTimeSec: Number(e.target.value) })}
                  className="w-full accent-amber-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 5: Ego Min Braking */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Ego Min Braking (a_min)</span>
                  <span className="text-slate-200 font-bold">{params.egoMinBrake} m/s²</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="8.0"
                  step="0.5"
                  value={params.egoMinBrake}
                  onChange={(e) => setParams({ ...params, egoMinBrake: Number(e.target.value) })}
                  className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 6: Lead Max Braking */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Lead Max Braking (b_max)</span>
                  <span className="text-slate-200 font-bold">{params.leadMaxBrake} m/s²</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="9.0"
                  step="0.5"
                  value={params.leadMaxBrake}
                  onChange={(e) => setParams({ ...params, leadMaxBrake: Number(e.target.value) })}
                  className="w-full accent-purple-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
                />
              </div>

            </div>

          </div>
        </div>

        {/* Formula Explanation Card */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider font-bold">
            RSS Mathematical Safety Formula & Verification
          </h3>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
            d_min = [ v_ego * t_response + 0.5 * a_accel * t_response^2 + (v_ego + t_response * a_accel)^2 / (2 * a_min_brake) - (v_lead^2 / (2 * b_max_brake)) ]+
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            The RSS mathematical model guarantees that if the following vehicle maintains at least d_min, no collision will occur even if the lead vehicle executes an emergency full deceleration stop.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://intel.github.io/ad-rss-lib/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold hover:bg-cyan-500/20 transition-colors"
            >
              <span>Explore Intel/Mobileye C++ Repository (`ad-rss-lib`)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
            <strong>Educational Disclosure:</strong> Educational visualization based on publicly documented RSS principles. It does not reproduce proprietary employer implementations, driving systems, or safety certifications.
          </div>
        </div>

      </div>
    </div>
  );
};
