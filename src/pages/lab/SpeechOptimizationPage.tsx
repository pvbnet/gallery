import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Activity, ArrowLeft, Info, Layers, CheckCircle2, Zap } from 'lucide-react';

interface MetricItem {
  name: string;
  baseline: string;
  optimized: string;
  unit: string;
  change: string;
  explanation: string;
}

export const SpeechOptimizationPage: React.FC = () => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(30); // 0 to 100%
  const [selectedTechnique, setSelectedTechnique] = useState<'quant' | 'stream' | 'graph' | 'reuse'>('quant');

  const [audioProgress, setAudioProgress] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const baselineBufferRef = useRef<AudioBuffer | null>(null);
  const optimizedBufferRef = useRef<AudioBuffer | null>(null);

  const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Load audio buffers locally into Web Audio API context
  useEffect(() => {
    let isMounted = true;
    const initAudio = async () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Fetch baseline & optimized audio buffers
        const [resBase, resOpt] = await Promise.all([
          fetch('/audio/speech_baseline.wav'),
          fetch('/audio/speech_optimized.wav')
        ]);

        const [bufBase, bufOpt] = await Promise.all([
          resBase.arrayBuffer(),
          resOpt.arrayBuffer()
        ]);

        const [decodedBase, decodedOpt] = await Promise.all([
          ctx.decodeAudioData(bufBase),
          ctx.decodeAudioData(bufOpt)
        ]);

        if (isMounted) {
          baselineBufferRef.current = decodedBase;
          optimizedBufferRef.current = decodedOpt;
          drawWaveform(decodedBase, 30);
        }
      } catch (err) {
        console.error('Audio buffer loading error:', err);
      }
    };

    initAudio();

    return () => {
      isMounted = false;
      stopAudio();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Redraw waveform when mode or noise slider changes
  useEffect(() => {
    const currentBuf = isOptimized ? optimizedBufferRef.current : baselineBufferRef.current;
    if (currentBuf) {
      drawWaveform(currentBuf, isOptimized ? Math.max(5, noiseLevel * 0.2) : noiseLevel);
    }
  }, [isOptimized, noiseLevel]);

  // Play audio buffer via Web Audio API
  const playAudio = (forceOptimized?: boolean) => {
    const optState = forceOptimized !== undefined ? forceOptimized : isOptimized;
    stopAudio();

    const ctx = audioContextRef.current;
    const targetBuffer = optState ? optimizedBufferRef.current : baselineBufferRef.current;
    if (!ctx || !targetBuffer) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const source = ctx.createBufferSource();
    const gain = ctx.createGain();

    source.buffer = targetBuffer;
    
    // Apply noise slider factor to gain
    const noiseFactor = (noiseLevel / 50);
    gain.gain.value = Math.min(1.5, Math.max(0.2, noiseFactor));

    source.connect(gain);
    gain.connect(ctx.destination);

    sourceNodeRef.current = source;
    gainNodeRef.current = gain;

    const startTime = ctx.currentTime;
    const duration = targetBuffer.duration;

    source.start(0);
    setIsPlaying(true);

    // Track playback progress
    const updateProgress = () => {
      if (!ctx || !setIsPlaying) return;
      const elapsed = ctx.currentTime - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setAudioProgress(pct);

      if (elapsed < duration && isPlaying) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      } else if (elapsed >= duration) {
        setIsPlaying(false);
        setAudioProgress(0);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    source.onended = () => {
      setIsPlaying(false);
      setAudioProgress(0);
    };
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      } catch (e) {
        // Source already stopped
      }
      sourceNodeRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setIsPlaying(false);
    setAudioProgress(0);
  };

  const handleToggleMode = () => {
    const nextState = !isOptimized;
    setIsOptimized(nextState);
    if (isPlaying) {
      playAudio(nextState);
    }
  };

  // Draw PCM Waveform on Canvas
  const drawWaveform = (buffer: AudioBuffer, effectiveNoise: number) => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const pcm = buffer.getChannelData(0);
    const step = Math.ceil(pcm.length / width);
    const amp = height / 2;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, amp);
    ctx.lineTo(width, amp);
    ctx.stroke();

    // Speech active highlight zone (0.2s to 2.2s -> ~8% to ~88% of width)
    ctx.fillStyle = isOptimized ? 'rgba(45, 212, 191, 0.08)' : 'rgba(251, 191, 36, 0.08)';
    ctx.fillRect(width * 0.08, 0, width * 0.8, height);

    // Draw Waveform lines
    ctx.beginPath();
    ctx.strokeStyle = isOptimized ? '#2dd4bf' : '#fbbf24';
    ctx.lineWidth = 1.8;

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = pcm[i * step + j] || 0;
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }

      // Add noise visual jitter based on slider
      const noiseOffset = (Math.random() - 0.5) * (effectiveNoise / 100) * 0.3;
      const yMin = (1 + min + noiseOffset) * amp;
      const yMax = (1 + max + noiseOffset) * amp;

      if (i === 0) {
        ctx.moveTo(i, yMin);
      } else {
        ctx.lineTo(i, yMin);
        ctx.lineTo(i, yMax);
      }
    }
    ctx.stroke();
  };

  const metricsData: MetricItem[] = [
    {
      name: 'End-to-End Latency',
      baseline: '420 ms',
      optimized: '165 ms',
      unit: 'ms',
      change: '-60.7% Latency',
      explanation: 'Total pipeline execution time from microphone cabin audio frame to completed TTS speech synthesis.'
    },
    {
      name: 'Model Footprint',
      baseline: '92 MB',
      optimized: '28 MB',
      unit: 'MB',
      change: '-69.6% RAM',
      explanation: 'Combined binary memory size of ASR, TTS, and neural noise suppression weights.'
    },
    {
      name: 'Peak Memory Allocation',
      baseline: '310 MB',
      optimized: '145 MB',
      unit: 'MB',
      change: '-53.2% Peak RAM',
      explanation: 'Maximum transient activation buffer and workspace RAM allocated during inferencing.'
    },
    {
      name: 'Word-Error Rate (WER)',
      baseline: '8.4%',
      optimized: '8.7%',
      unit: '%',
      change: '+0.3% Tradeoff',
      explanation: 'Speech recognition accuracy metric. Quantization trades 0.3% WER for 60% latency reduction.'
    },
    {
      name: 'Real-Time Factor (RTF)',
      baseline: '0.82×',
      optimized: '0.31×',
      unit: 'RTF',
      change: '2.6× Faster',
      explanation: 'Ratio of processing time to audio duration. RTF < 1.0 indicates faster-than-real-time execution.'
    }
  ];

  const techniques = {
    quant: {
      title: 'FP32 → INT8 Quantization',
      bottleneck: 'Memory Bandwidth & MAC Energy',
      benefit: '3.3× Model Size & Memory Bandwidth Reduction',
      tradeoff: 'Slight ~0.3% WER precision tradeoff',
      description: 'Converts 32-bit floating-point neural network weights and activations into 8-bit integers. Reduces memory bus bandwidth saturation and increases MAC throughput on hardware vector units.'
    },
    stream: {
      title: 'Streaming Audio Chunks',
      bottleneck: 'First-Token Response Latency',
      benefit: 'Streaming 40ms Audio Frame Processing',
      tradeoff: 'Requires overlapping window buffer state management',
      description: 'Replaces batch audio inference with streaming frame processing (40ms chunks), allowing ASR and intent parsing to begin before the user finishes speaking.'
    },
    graph: {
      title: 'Runtime Graph Simplification',
      bottleneck: 'Execution Engine & Kernel Dispatch Overhead',
      benefit: 'Fused Conv+ReLU Kernels & Eliminated Reshapes',
      tradeoff: 'Target-specific operator fusion pass complexity',
      description: 'Fuses adjacent tensor operations (e.g. Conv + Bias + Activation) into single execution kernels, eliminating unnecessary memory reads/writes and reducing runtime engine dispatch overhead.'
    },
    reuse: {
      title: 'Tensor & Memory-Buffer Reuse',
      bottleneck: 'Dynamic Peak Memory Allocation',
      benefit: 'Fixed Pre-Allocated Workspace & Zero-Copy Execution',
      tradeoff: 'Static buffer allocation budget',
      description: 'Pre-allocates a fixed contiguous memory workspace for model activations. Reuses internal tensor buffers across sequential layers to prevent dynamic heap allocations during real-time inferencing.'
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

        {/* PROMINENT MANDATORY DISCLOSURE HEADER */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-8 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Synthetic Technical Demonstration:</strong> All audio, architecture, processing stages, and measurements are generated for illustration. They do not represent Rivian or Volkswagen systems, data, benchmarks, models, production architecture, or measured results.
          </div>
        </div>

        {/* Title Banner */}
        <div className="max-w-4xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-semibold mb-3">
            <Zap className="w-4 h-4" /> DEMONSTRATION 04 — SYNTHETIC SPEECH OPTIMIZATION
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-3">
            In-Vehicle Speech Optimization Lab
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Interactively explore latency, memory footprint, noise suppression, and speech recognition tradeoffs across synthetic baseline and accelerated speech AI pipelines.
          </p>
        </div>

        {/* MAIN CONTROLS BAR: Mode Toggle & Audio Controls */}
        <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-6 mb-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            {/* Large Mode Switch Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 font-semibold">PIPELINE MODE:</span>
              <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => { setIsOptimized(false); if (isPlaying) playAudio(false); }}
                  className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    !isOptimized
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Baseline Mode (Constrained 420ms)
                </button>
                <button
                  onClick={() => { setIsOptimized(true); if (isPlaying) playAudio(true); }}
                  className={`px-5 py-2.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    isOptimized
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Optimized Mode (Accelerated 165ms)
                </button>
              </div>
            </div>

            {/* Playback Control Buttons */}
            <div className="flex items-center gap-3">
              {!isPlaying ? (
                <button
                  onClick={() => playAudio()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Play {isOptimized ? 'Optimized' : 'Baseline'} Audio</span>
                </button>
              ) : (
                <button
                  onClick={stopAudio}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs shadow-lg transition-all"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Audio</span>
                </button>
              )}

              <button
                onClick={handleToggleMode}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 font-mono text-xs font-semibold text-slate-200 hover:text-cyan-400 transition-colors"
              >
                Toggle Baseline/Optimized
              </button>

              <button
                onClick={() => { stopAudio(); playAudio(); }}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                title="Restart Comparison"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cabin Noise Intensity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-400" /> Simulated Cabin Acoustic Noise Intensity:
              </span>
              <span className="text-cyan-400 font-bold">{noiseLevel}% Noise Injection</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={noiseLevel}
              onChange={(e) => setNoiseLevel(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-950 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Quiet Stationary Vehicle (0%)</span>
              <span>Highway Speed HVAC & Road Noise (100%)</span>
            </div>
          </div>

        </div>

        {/* SIGNAL VISUALIZATION PANEL */}
        <div className="lab-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 mb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
              <Activity className="w-4 h-4" /> Live Web Audio PCM Waveform & Signal Analysis
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Phrase: <strong className="text-slate-200">“Set the cabin temperature to seventy degrees.”</strong>
            </span>
          </div>

          {/* Waveform Canvas */}
          <div className="relative h-40 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
            <canvas
              ref={waveformCanvasRef}
              width={800}
              height={160}
              className="w-full h-full"
            />
            {/* Playhead Progress Overlay */}
            {isPlaying && (
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_8px_#38bdf8]"
                style={{ left: `${audioProgress}%` }}
              ></div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Signal State</div>
              <div className={`font-bold mt-0.5 ${isOptimized ? 'text-cyan-400' : 'text-amber-400'}`}>
                {isOptimized ? 'Noise Filtered (Denoised)' : 'Unfiltered Raw Acoustic'}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Est. Signal-To-Noise (SNR)</div>
              <div className="font-bold text-slate-200 mt-0.5">
                {isOptimized ? '+24.2 dB (High Clarity)' : '+8.5 dB (Noisy)'}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Active Speech Region</div>
              <div className="font-bold text-teal-400 mt-0.5">0.20s – 2.20s (2.0s)</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Audio Format</div>
              <div className="font-bold text-slate-200 mt-0.5">16-bit PCM 22.05kHz</div>
            </div>
          </div>
        </div>

        {/* ANIMATED SPEECH PIPELINE & LATENCY BARS */}
        <div className="lab-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 mb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" /> 6-Stage Speech Inference Pipeline Breakdown
            </h3>
            <span className="text-[11px] font-mono text-amber-300">
              Illustrative synthetic timing—not measured Rivian performance.
            </span>
          </div>

          {/* Stage Timings Table / Horizontal Animated Bars */}
          <div className="space-y-4 pt-2">
            {[
              { stage: '1. Cabin Audio Input', baseMs: 0, optMs: 0, desc: 'Microphone array sampling' },
              { stage: '2. Noise Filtering', baseMs: 65, optMs: 24, desc: 'Spectral / Neural Noise Suppression' },
              { stage: '3. ASR Model Inference', baseMs: 220, optMs: 78, desc: 'Automatic Speech Recognition Acoustic Model' },
              { stage: '4. Intent Processing', baseMs: 35, optMs: 18, desc: 'Natural Language Intent & Entity Parser' },
              { stage: '5. Response Generation', baseMs: 0, optMs: 0, desc: 'In-vehicle dialog manager' },
              { stage: '6. TTS Model Inference', baseMs: 100, optMs: 45, desc: 'Text-to-Speech Acoustic Synthesis' }
            ].map((stg, idx) => {
              const currentMs = isOptimized ? stg.optMs : stg.baseMs;
              const maxMs = 220;
              const pct = maxMs > 0 ? (currentMs / maxMs) * 100 : 0;
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200 font-semibold">{stg.stage}</span>
                    <span className={`font-bold ${isOptimized ? 'text-cyan-400' : 'text-amber-400'}`}>
                      {stg.baseMs > 0 ? `${currentMs} ms` : 'Pass-through'}
                    </span>
                  </div>

                  {stg.baseMs > 0 && (
                    <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOptimized ? 'bg-cyan-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.max(4, pct)}%` }}
                      ></div>
                    </div>
                  )}
                  <div className="text-[10px] text-slate-400 font-mono">{stg.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">Total Pipeline End-to-End Latency:</span>
            <span className={`text-base font-extrabold ${isOptimized ? 'text-cyan-400' : 'text-amber-400'}`}>
              {isOptimized ? '165 ms (Accelerated)' : '420 ms (Baseline)'}
            </span>
          </div>
        </div>

        {/* METRICS DASHBOARD - COMPARISON CARDS */}
        <div className="space-y-4 mb-10">
          <h3 className="text-xs font-mono text-cyan-400 uppercase font-bold">
            Synthetic Benchmark Metrics Comparison
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {metricsData.map((m, idx) => (
              <div key={idx} className="lab-card rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="text-[11px] font-mono text-slate-400 font-semibold">{m.name}</div>
                
                <div className="flex items-baseline justify-between pt-1">
                  <div className="text-xs font-mono text-slate-400 line-through">{m.baseline}</div>
                  <div className={`text-lg font-bold font-mono ${isOptimized ? 'text-cyan-400' : 'text-amber-400'}`}>
                    {isOptimized ? m.optimized : m.baseline}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded text-center border border-emerald-500/20">
                  {m.change}
                </div>

                <p className="text-[11px] text-slate-400 leading-snug pt-1 border-t border-slate-800/80">
                  {m.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TRANSCRIPT PANEL */}
        <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4 mb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono text-teal-400 uppercase font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Synthetic ASR Recognition Result & Transcript
            </h3>
            <span className="text-xs font-mono text-slate-400">Duration: 2.4s</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-sm text-slate-100 font-semibold">
            “Set the cabin temperature to seventy degrees.”
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px]">Simulated Word Confidence</span>
              <div className="text-cyan-400 font-bold mt-0.5">{isOptimized ? '95.8%' : '96.4%'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px]">Real-Time Factor (RTF)</span>
              <div className="text-emerald-400 font-bold mt-0.5">{isOptimized ? '0.31×' : '0.82×'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px]">Noise Level</span>
              <div className="text-amber-400 font-bold mt-0.5">{noiseLevel}%</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px]">Model Footprint</span>
              <div className="text-slate-200 font-bold mt-0.5">{isOptimized ? '28 MB' : '92 MB'}</div>
            </div>
          </div>
        </div>

        {/* OPTIMIZATION EXPLORER PANEL */}
        <div className="lab-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 mb-10">
          <div>
            <h3 className="text-sm font-mono text-cyan-400 uppercase font-bold mb-1">
              Illustrative Optimization Techniques
            </h3>
            <p className="text-xs text-slate-400">
              Select an embedded optimization technique to examine its architectural impact.
            </p>
          </div>

          {/* Technique Selectors */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.keys(techniques) as Array<keyof typeof techniques>).map((key) => {
              const item = techniques[key];
              const isSelected = selectedTechnique === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTechnique(key)}
                  className={`p-3 rounded-xl text-left border transition-all font-mono text-xs ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300 shadow-md'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="font-bold truncate">{item.title}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Technique Detail */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="text-base font-bold text-slate-100">
              {techniques[selectedTechnique].title}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed">
              {techniques[selectedTechnique].description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Target Bottleneck</div>
                <div className="text-cyan-400 font-bold mt-0.5">{techniques[selectedTechnique].bottleneck}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Expected Benefit</div>
                <div className="text-emerald-400 font-bold mt-0.5">{techniques[selectedTechnique].benefit}</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <div className="text-slate-400 text-[10px]">Tradeoff / Complexity</div>
                <div className="text-amber-400 font-bold mt-0.5">{techniques[selectedTechnique].tradeoff}</div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-400">
            <strong>Note:</strong> These techniques illustrate common optimization strategies. They are not a disclosure of Peter’s Rivian implementation.
          </div>
        </div>

        {/* BOTTOM MANDATORY DISCLOSURE */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
          <strong className="text-amber-400">Synthetic Technical Demonstration:</strong> All audio, architecture, processing stages, and measurements are generated for illustration. They do not represent Rivian or Volkswagen systems, data, benchmarks, models, production architecture, or measured results.
        </div>

      </div>
    </div>
  );
};
