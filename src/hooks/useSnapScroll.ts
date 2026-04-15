import { useEffect } from 'react';

export function useSnapScroll() {
  useEffect(() => {
    const sections = document.querySelectorAll('.snap-section');
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      const windowHeight = window.innerHeight;
      
      // Find current section
      let currentSectionIndex = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= -windowHeight / 2 && rect.top < windowHeight / 2) {
          currentSectionIndex = index;
        }
      });

      // Only apply snap logic if we are currently on a snap section
      // and scrolling to another snap section.
      const currentSection = sections[currentSectionIndex];
      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const isAtTop = rect.top >= -10;
      
      if (e.deltaY > 0 && currentSectionIndex < sections.length - 1) {
        // Scroll down
        isScrolling = true;
        sections[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => isScrolling = false, 1000);
        e.preventDefault();
      } else if (e.deltaY < 0 && currentSectionIndex > 0 && isAtTop) {
        // Scroll up
        isScrolling = true;
        sections[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => isScrolling = false, 1000);
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);
}
