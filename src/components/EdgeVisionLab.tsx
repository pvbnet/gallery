import React, { useState, useRef } from 'react';
import { Cpu, Play, RefreshCw, Upload, Image as ImageIcon, AlertCircle, Info, ShieldAlert, Sparkles, Activity, HardDrive } from 'lucide-react';
import { getClassName } from '../data/imagenetClasses';

interface Prediction {
  classId: number;
  label: string;
  probability: number;
}

interface BenchmarkMetrics {
  downloadSizeMB: number;
  initTimeMs: number;
  coldInferenceMs: number;
  medianWarmInferenceMs: number;
  backend: string;
  inputResolution: string;
}

export const EdgeVisionLab: React.FC = () => {
  const [isLabLaunched, setIsLabLaunched] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [session, setSession] = useState<any | null>(null);
  const [ortModule, setOrtModule] = useState<any | null>(null);
  const [metrics, setMetrics] = useState<BenchmarkMetrics | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string>('/samples/road_vision.jpg');
  const [selectedImageName, setSelectedImageName] = useState<string>('Road Driving Vision');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isInferring, setIsInferring] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const bundledSamples = [
    { name: 'Road Driving Vision', url: '/samples/road_vision.jpg' },
    { name: 'Camera Inspection', url: '/samples/camera_inspection.jpg' },
    { name: 'Mobile Robot Sensor', url: '/samples/mobile_robot.jpg' },
  ];

  // Lazy launcher function - downloads model & initializes ORT session only on click
  const handleLaunchLab = async () => {
    setIsLabLaunched(true);
    setIsLoadingModel(true);
    setErrorMsg(null);
    setLoadingStep('Loading ONNX Runtime Web engine...');

    const startTime = performance.now();

    try {
      // Dynamically import onnxruntime-web ONLY when user explicitly launches the lab
      const ort = await import('onnxruntime-web');
      setOrtModule(ort);

      setLoadingStep('Downloading ONNX model artifact (4.72 MB)...');

      // 1. Fetch model binary to measure exact download size & verify availability
      const modelUrl = '/models/squeezenet1.0-7.onnx';
      const response = await fetch(modelUrl);

      if (!response.ok) {
        throw new Error(`Failed to load ONNX model artifact (HTTP ${response.status})`);
      }

      const blob = await response.blob();
      const downloadSizeMB = +(blob.size / (1024 * 1024)).toFixed(2);

      setLoadingStep('Initializing ONNX Runtime session (testing WebGPU & WASM SIMD)...');

      const arrayBuffer = await blob.arrayBuffer();

      let detectedBackend = 'WebAssembly (CPU SIMD)';
      let createdSession: any;

      try {
        // Try WebGPU execution provider first
        createdSession = await ort.InferenceSession.create(arrayBuffer, {
          executionProviders: ['webgpu', 'wasm'],
          graphOptimizationLevel: 'all'
        });
        detectedBackend = 'WebGPU (GPU Accelerated)';
      } catch (gpuError) {
        console.warn('WebGPU execution provider unavailable, falling back to WebAssembly:', gpuError);
        createdSession = await ort.InferenceSession.create(arrayBuffer, {
          executionProviders: ['wasm'],
          graphOptimizationLevel: 'all'
        });
        detectedBackend = 'WebAssembly (WASM SIMD)';
      }

      const initTimeMs = Math.round(performance.now() - startTime);

      setSession(createdSession);
      setIsLoadingModel(false);

      // Initial benchmark run with sample image
      runInference(createdSession, ort, '/samples/road_vision.jpg', detectedBackend, downloadSizeMB, initTimeMs);

    } catch (err: any) {
      console.error('Model initialization error:', err);
      setErrorMsg(err.message || 'Failed to initialize browser vision model.');
      setIsLoadingModel(false);
    }
  };

  // Image preprocessing and ONNX tensor conversion (224x224 RGB, NCHW ImageNet normalized)
  const preprocessImage = (imageSrc: string): Promise<Float32Array> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 224;
        canvas.height = 224;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas context error'));

        ctx.drawImage(img, 0, 0, 224, 224);
        const imgData = ctx.getImageData(0, 0, 224, 224);
        const data = imgData.data;

        // ImageNet RGB normalization: mean = [0.485, 0.456, 0.406], std = [0.229, 0.224, 0.225]
        const float32Data = new Float32Array(3 * 224 * 224);
        const mean = [0.485, 0.456, 0.406];
        const std = [0.229, 0.224, 0.225];

        for (let i = 0; i < 224 * 224; i++) {
          const r = data[i * 4] / 255.0;
          const g = data[i * 4 + 1] / 255.0;
          const b = data[i * 4 + 2] / 255.0;

          // NCHW format
          float32Data[i] = (r - mean[0]) / std[0];
          float32Data[224 * 224 + i] = (g - mean[1]) / std[1];
          float32Data[2 * 224 * 224 + i] = (b - mean[2]) / std[2];
        }

        resolve(float32Data);
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = imageSrc;
    });
  };

  // Run Cold & Warm inference over 5 iterations and record benchmark metrics
  const runInference = async (
    currentSession: any,
    ortInstance?: any,
    imageSrc?: string,
    backendName?: string,
    downloadMB?: number,
    initMs?: number
  ) => {
    const targetOrt = ortInstance || ortModule;
    const targetImage = imageSrc || selectedImage;
    if (!currentSession || !targetOrt) return;
    setIsInferring(true);

    try {
      const inputData = await preprocessImage(targetImage);
      const inputTensor = new targetOrt.Tensor('float32', inputData, [1, 3, 224, 224]);
      const inputName = currentSession.inputNames[0];

      // 1. Cold Inference Run (1st execution)
      const coldStart = performance.now();
      const outputMapCold = await currentSession.run({ [inputName]: inputTensor });
      const coldInferenceMs = Math.round(performance.now() - coldStart);

      // Extract predictions from cold run
      const outputTensor = outputMapCold[currentSession.outputNames[0]];
      const outputData = outputTensor.data as Float32Array;

      // Calculate Softmax probabilities
      const topPredictions = parseSoftmaxTopK(outputData, 5);
      setPredictions(topPredictions);

      // 2. Warm Inference Runs (5 iterations to calculate median latency)
      const warmTimes: number[] = [];
      for (let i = 0; i < 5; i++) {
        const warmStart = performance.now();
        await currentSession.run({ [inputName]: inputTensor });
        warmTimes.push(performance.now() - warmStart);
      }

      warmTimes.sort((a, b) => a - b);
      const medianWarmInferenceMs = Math.round(warmTimes[2]); // Median of 5 runs

      // Update benchmark metrics
      setMetrics((prev) => ({
        downloadSizeMB: downloadMB ?? prev?.downloadSizeMB ?? 4.72,
        initTimeMs: initMs ?? prev?.initTimeMs ?? 150,
        coldInferenceMs,
        medianWarmInferenceMs,
        backend: backendName ?? prev?.backend ?? 'WebAssembly (WASM SIMD)',
        inputResolution: '224 × 224 px'
      }));

    } catch (err: any) {
      console.error('Inference error:', err);
      setErrorMsg('Inference execution failed: ' + err.message);
    } finally {
      setIsInferring(false);
    }
  };

  // Softmax normalization and top-K selection
  const parseSoftmaxTopK = (logits: Float32Array, k: number): Prediction[] => {
    let maxLogit = -Infinity;
    for (let i = 0; i < logits.length; i++) {
      if (logits[i] > maxLogit) maxLogit = logits[i];
    }

    let sumExp = 0;
    const exps = new Float32Array(logits.length);
    for (let i = 0; i < logits.length; i++) {
      exps[i] = Math.exp(logits[i] - maxLogit);
      sumExp += exps[i];
    }

    const indexed = Array.from(exps).map((val, idx) => ({
      classId: idx,
      probability: val / sumExp
    }));

    indexed.sort((a, b) => b.probability - a.probability);

    return indexed.slice(0, k).map((item) => ({
      classId: item.classId,
      label: getClassName(item.classId),
      probability: +(item.probability * 100).toFixed(1)
    }));
  };

  // Handle local image upload - 100% client side processing
  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSelectedImage(dataUrl);
      setSelectedImageName(file.name);
      if (session && ortModule) {
        runInference(session, ortModule, dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Select bundled sample image
  const handleSelectSample = (sample: { name: string; url: string }) => {
    setSelectedImage(sample.url);
    setSelectedImageName(sample.name);
    if (session && ortModule) {
      runInference(session, ortModule, sample.url);
    }
  };

  const handleResetLab = () => {
    setIsLabLaunched(false);
    setSession(null);
    setMetrics(null);
    setPredictions([]);
    setErrorMsg(null);
  };

  return (
    <section id="edge-lab" className="py-24 bg-slate-950/80 border-y border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
              <Cpu className="w-4 h-4" /> Live Browser Demonstration
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Edge Vision Inference Lab
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-xl mt-3 md:mt-0 font-normal">
            Run a public computer-vision model directly on your device and inspect the performance tradeoffs that matter in edge AI.
          </p>
        </div>

        {/* LAZY LAUNCH CARD - Displayed before user explicitly launches demo */}
        {!isLabLaunched && (
          <div className="lab-card rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto border border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/30 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-6">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-100 mb-3">
              Interactive On-Device Vision Inferencing
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Execute a real ONNX deep learning vision model locally inside your web browser using <code className="text-cyan-400 font-mono">onnxruntime-web</code>. Evaluates WebGPU and WebAssembly execution providers with zero server uploads.
            </p>

            <button
              onClick={handleLaunchLab}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base tracking-wide transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 group"
            >
              <Play className="w-5 h-5 text-slate-950 fill-current group-hover:scale-110 transition-transform" />
              <span>Launch Edge Vision Inference Lab</span>
            </button>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-cyan-400" /> Model Size: 4.72 MB
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" /> WebGPU & WASM SIMD
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> 100% Client-Side Privacy
              </span>
            </div>
          </div>
        )}

        {/* LOADING STATE - Download & Initialization progress */}
        {isLabLaunched && isLoadingModel && (
          <div className="lab-card rounded-2xl p-10 text-center max-w-xl mx-auto border border-slate-800 bg-slate-900/90">
            <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mx-auto mb-4" />
            <h4 className="text-lg font-bold text-slate-100 mb-2">Initializing Browser Neural Runtime</h4>
            <p className="text-xs font-mono text-cyan-300">{loadingStep}</p>
          </div>
        )}

        {/* ERROR STATE */}
        {errorMsg && (
          <div className="lab-card rounded-2xl p-8 border border-red-500/40 bg-red-950/20 max-w-2xl mx-auto mb-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-100 mb-1">Execution Error</h4>
            <p className="text-xs text-red-300 font-mono mb-4">{errorMsg}</p>
            <button
              onClick={handleLaunchLab}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700"
            >
              Retry Initialization
            </button>
          </div>
        )}

        {/* ACTIVE LAB INTERFACE */}
        {isLabLaunched && session && !isLoadingModel && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Toolbar & Control Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-slate-200">
                  MODEL RUNTIME ACTIVE: <span className="text-cyan-400">{metrics?.backend}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => runInference(session, selectedImage)}
                  disabled={isInferring}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isInferring ? 'animate-spin' : ''}`} />
                  <span>Re-run Benchmark</span>
                </button>

                <button
                  onClick={handleResetLab}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-900 text-xs font-mono text-slate-400 border border-slate-800 hover:text-slate-200"
                >
                  <span>Close Lab</span>
                </button>
              </div>
            </div>

            {/* REAL MEASUREMENTS BENCHMARK PANEL */}
            {metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Model Size</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono mt-1">{metrics.downloadSizeMB} MB</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Init Time</div>
                  <div className="text-xl font-bold text-teal-400 font-mono mt-1">{metrics.initTimeMs} ms</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Cold Latency</div>
                  <div className="text-xl font-bold text-amber-400 font-mono mt-1">{metrics.coldInferenceMs} ms</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Warm Latency (Median 5x)</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono mt-1">{metrics.medianWarmInferenceMs} ms</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Active Backend</div>
                  <div className="text-xs font-bold text-cyan-300 font-mono mt-1 truncate">{metrics.backend.split(' ')[0]}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Input Tensor</div>
                  <div className="text-xs font-bold text-slate-200 font-mono mt-1">{metrics.inputResolution}</div>
                </div>
              </div>
            )}

            {/* MAIN DEMO WORKSPACE: Image Selection & Vision Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Image Selection & Preview */}
              <div className="lg:col-span-6 space-y-6">
                <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> Input Image Selector
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">Processed 100% On-Device</span>
                  </div>

                  {/* Sample Selection Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    {bundledSamples.map((sample, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectSample(sample)}
                        className={`p-2 rounded-lg border text-left text-xs font-mono transition-all ${
                          selectedImageName === sample.name
                            ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <div className="truncate font-semibold">{sample.name}</div>
                      </button>
                    ))}
                  </div>

                  {/* Local File Picker */}
                  <div className="pt-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleLocalImageUpload}
                      accept="image/*"
                      className="hidden"
                      id="local-image-input"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Local Image File (Never Uploaded)</span>
                    </button>
                  </div>

                  {/* Image Display */}
                  <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Selected Input Vision Frame"
                      className="max-h-full max-w-full object-contain"
                    />
                    {isInferring && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Executing Tensor Graph...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Vision Model Output & Probability Distribution */}
              <div className="lg:col-span-6 space-y-6">
                <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono text-teal-400 uppercase tracking-wider font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Top Vision Model Predictions
                    </h4>
                    <span className="text-[11px] font-mono text-slate-400">SqueezeNet 1.0 (ONNX)</span>
                  </div>

                  {/* Predictions List */}
                  <div className="space-y-3 pt-2">
                    {predictions.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-200 font-medium">
                            {idx + 1}. {item.label}
                          </span>
                          <span className="text-cyan-400 font-bold">{item.probability}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(2, item.probability))}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Device Variation Disclaimer */}
                  <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <div className="flex items-center gap-1 text-slate-300 font-semibold">
                      <Info className="w-3.5 h-3.5 text-cyan-400" /> Device & Hardware Performance Variation:
                    </div>
                    <p>
                      Inference latency varies based on your local device CPU/GPU architecture, browser WebGPU support, SIMD WASM execution threads, and hardware thermal state.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MANDATORY PROVENANCE & DISCLOSURE FOOTER */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-slate-400">Model:</span> <span className="text-slate-200 font-bold">SqueezeNet 1.0</span>
                  <span className="mx-2">•</span>
                  <span className="text-slate-400">License:</span> <span className="text-slate-200">Apache 2.0 / MIT</span>
                  <span className="mx-2">•</span>
                  <span className="text-slate-400">Runtime:</span> <span className="text-slate-200">onnxruntime-web v1.20.1</span>
                </div>
                <a
                  href="https://github.com/onnx/models"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  View Model Source (ONNX Zoo) →
                </a>
              </div>

              {/* Cross Links to Case Study 02 and Co-Design Lab */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="/work/intel-efficient-inference"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700"
                >
                  ← Return to Case Study 02 (Intel Efficient Inference)
                </a>
                <a
                  href="/lab/model-to-silicon"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold"
                >
                  Launch Model-to-Silicon Co-Design Lab →
                </a>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-mono pt-1">
                <strong className="text-amber-400">Disclosure:</strong> Independent portfolio demonstration using a public model. It does not reproduce or expose systems, models, data, or intellectual property from Peter’s former employers.
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
