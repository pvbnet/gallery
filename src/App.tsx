import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ContactFooter } from './components/ContactFooter';

import { HomePage } from './pages/HomePage';
import { RivianCaseStudyPage } from './pages/work/RivianCaseStudyPage';
import { IntelCaseStudyPage } from './pages/work/IntelCaseStudyPage';
import { MobileyeCaseStudyPage } from './pages/work/MobileyeCaseStudyPage';
import { SharpCaseStudyPage } from './pages/work/SharpCaseStudyPage';
import { VisionInferencePage } from './pages/lab/VisionInferencePage';
import { RssSafetyPage } from './pages/lab/RssSafetyPage';
import { SuperResolutionGalleryPage } from './pages/lab/SuperResolutionGalleryPage';
import { SpeechOptimizationPage } from './pages/lab/SpeechOptimizationPage';
import { ModelToSiliconPage } from './pages/lab/ModelToSiliconPage';
import { ResearchAtlasPage } from './pages/ResearchAtlasPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
        <Header />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work/rivian-voice-ai" element={<RivianCaseStudyPage />} />
            <Route path="/work/intel-efficient-inference" element={<IntelCaseStudyPage />} />
            <Route path="/work/mobileye-rss" element={<MobileyeCaseStudyPage />} />
            <Route path="/work/sharp-computer-vision" element={<SharpCaseStudyPage />} />
            <Route path="/lab/vision-inference" element={<VisionInferencePage />} />
            <Route path="/lab/rss-safety" element={<RssSafetyPage />} />
            <Route path="/lab/super-resolution" element={<SuperResolutionGalleryPage />} />
            <Route path="/lab/speech-optimization" element={<SpeechOptimizationPage />} />
            <Route path="/lab/model-to-silicon" element={<ModelToSiliconPage />} />
            <Route path="/research" element={<ResearchAtlasPage />} />
          </Routes>
        </main>
        <ContactFooter />
      </div>
    </BrowserRouter>
  );
};

export default App;
