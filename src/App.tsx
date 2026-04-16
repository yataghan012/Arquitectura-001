/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';
import Process from './components/Process';
import ShutterOverlay from './components/ShutterOverlay';
import GrainOverlay from './components/GrainOverlay';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import { Project } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={containerRef} className="relative h-screen overflow-y-auto overflow-x-hidden scroll-smooth bg-bg w-full no-scrollbar">
      <ScrollProgress containerRef={containerRef} />
      <Preloader />
      <GrainOverlay />
      <ShutterOverlay />
      <CustomCursor />
      <Navbar containerRef={containerRef} />
      <Hero />
      <Philosophy />
      <Portfolio onProjectClick={setSelectedProject} />
      <Process containerRef={containerRef} />
      <Services />
      <About />
      <Contact />
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  );
}
