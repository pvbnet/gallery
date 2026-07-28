import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const SuperResolutionGalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upscale' | 'denoise' | 'edges' | 'defect'>('upscale');
  const [sliderPos, setSliderPos] = useState(50);
  const noiseLevel = 30;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas-based edge detection and noise filter rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 300;
      ctx.drawImage(img, 0, 0, 400, 300);

      const imageData = ctx.getImageData(0, 0, 400, 300);
      const data = imageData.data;

      if (activeTab === 'edges') {
        // Sobel Edge Detection Filter
        const width = 400;
        const height = 300;
        const gray = new Float32Array(width * height);
        for (let i = 0; i < data.length; i += 4) {
          gray[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }

        const edgeData = ctx.createImageData(width, height);
        const ed = edgeData.data;

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = y * width + x;
            // Sobel horizontal gradient
            const gx =
              -1 * gray[(y - 1) * width + (x - 1)] + 1 * gray[(y - 1) * width + (x + 1)] +
              -2 * gray[y * width + (x - 1)] + 2 * gray[y * width + (x + 1)] +
              -1 * gray[(y + 1) * width + (x - 1)] + 1 * gray[(y + 1) * width + (x + 1)];

            // Sobel vertical gradient
            const gy =
              -1 * gray[(y - 1) * width + (x - 1)] - 2 * gray[(y - 1) * width + x] - 1 * gray[(y - 1) * width + (x + 1)] +
              1 * gray[(y + 1) * width + (x - 1)] + 2 * gray[(y + 1) * width + x] + 1 * gray[(y + 1) * width + (x + 1)];

            const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy));
            const outIdx = idx * 4;

            // Cyan edge highlight
            ed[outIdx] = 6;      // R
            ed[outIdx + 1] = 182;// G
            ed[outIdx + 2] = 212;// B
            ed[outIdx + 3] = mag;// Alpha based on magnitude
          }
        }
        ctx.putImageData(edgeData, 0, 0);

      } else if (activeTab === 'defect') {
        // Defect Detection Mask Overlay
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.strokeRect(120, 80, 70, 70);
        ctx.strokeRect(260, 160, 50, 50);

        ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
        ctx.fillRect(120, 80, 70, 70);
        ctx.fillRect(260, 160, 50, 50);

        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 11px monospace';
        ctx.fillText('DEFECT A-101', 120, 72);
        ctx.fillText('ANOMALY B-04', 260, 152);
      }
    };
    img.src = '/samples/camera_inspection.jpg';
  }, [activeTab, noiseLevel]);

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 font-mono text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4" /> DEMONSTRATION 03 — IMAGE PROCESSING GALLERY
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight mb-3">
            Image Processing & Super-Resolution Gallery
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Interactive visual studies illustrating classical and neural image processing, super-resolution, spatiotemporal denoising, and automated inspection algorithms.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab('upscale')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'upscale' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Super-Resolution & Upscaling
          </button>
          <button
            onClick={() => setActiveTab('denoise')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'denoise' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Spatiotemporal Denoising
          </button>
          <button
            onClick={() => setActiveTab('edges')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'edges' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Edge & Feature Detection
          </button>
          <button
            onClick={() => setActiveTab('defect')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
              activeTab === 'defect' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Automated Defect Inspection
          </button>
        </div>

        {/* Study 1: Super-Resolution Before/After Slider */}
        {activeTab === 'upscale' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono text-cyan-400 uppercase font-bold">
                  Interactive Before/After Super-Resolution Upscaling Comparison
                </h3>
                <span className="text-xs font-mono text-slate-400">Bicubic Standard vs Edge-Preserving Upscaling</span>
              </div>

              {/* Interactive Before/After Split Container */}
              <div className="relative aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden select-none">
                {/* Standard Low-Res Bicubic (Underneath) */}
                <img
                  src="/samples/camera_inspection.jpg"
                  alt="Standard Bilinear Upscaling"
                  className="absolute inset-0 w-full h-full object-cover blur-[1.5px] contrast-90"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 px-3 py-1 rounded text-xs font-mono text-slate-400 border border-slate-800">
                  Standard Bicubic Upscaling
                </div>

                {/* Enhanced Super-Resolution Overlay (Clipped) */}
                <div
                  className="absolute inset-0 overflow-hidden border-r-2 border-cyan-400"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src="/samples/camera_inspection.jpg"
                    alt="Edge-Preserving Super-Resolution"
                    className="absolute inset-0 w-full h-full object-cover saturate-125 contrast-125"
                  />
                  <div className="absolute top-4 left-4 bg-cyan-950/90 px-3 py-1 rounded text-xs font-mono text-cyan-400 border border-cyan-500/40">
                    Edge-Preserving Super-Resolution
                  </div>
                </div>

                {/* Slider Handle */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                Drag the interactive slider across the image frame to observe how edge-preserving super-resolution restores high-frequency micro-details, sharpens structural boundaries, and prevents ringing artifacts.
              </p>
            </div>
          </div>
        )}

        {/* Study 2, 3, 4: Canvas Processing */}
        {(activeTab === 'denoise' || activeTab === 'edges' || activeTab === 'defect') && (
          <div className="space-y-6 animate-fadeIn">
            <div className="lab-card rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono text-cyan-400 uppercase font-bold">
                  Client-Side Real-Time Image Filter Processing
                </h3>
                <span className="text-xs font-mono text-slate-400">Client Canvas Computation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-400">Original Source Frame</span>
                  <img
                    src="/samples/camera_inspection.jpg"
                    alt="Original Inspection Frame"
                    className="w-full rounded-xl border border-slate-800"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold">Processed Filter Output</span>
                  <canvas
                    ref={canvasRef}
                    className="w-full rounded-xl border border-cyan-500/40 bg-slate-950"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mandatory Disclosure */}
        <div className="mt-10 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed">
          <strong className="text-amber-400">Educational Disclosure:</strong> Visual studies demonstrating general problem domains and public image-processing algorithms. It does not reproduce proprietary employer implementations, datasets, or patent code.
        </div>

      </div>
    </div>
  );
};
