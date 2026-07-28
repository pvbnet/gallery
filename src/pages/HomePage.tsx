import React from 'react';
import { Hero } from '../components/Hero';
import { FlagshipWork } from '../components/FlagshipWork';
import { TechnicalWorkbench } from '../components/TechnicalWorkbench';
import { InteractiveArchitecture } from '../components/InteractiveArchitecture';
import { ExpertiseGrid } from '../components/ExpertiseGrid';
import { ResearchPublications } from '../components/ResearchPublications';
import { ExperienceTimeline } from '../components/ExperienceTimeline';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FlagshipWork />
      <TechnicalWorkbench />
      <InteractiveArchitecture />
      <ExpertiseGrid />
      <ResearchPublications />
      <ExperienceTimeline />
    </>
  );
};
