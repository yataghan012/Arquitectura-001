import { useEffect } from 'react';
import { PROJECTS } from '../constants';

const CRITICAL_IMAGES = [
  import.meta.env.BASE_URL + 'images/hero-bg.jpg',
  ...PROJECTS.filter(p => p.featured).flatMap(p => p.images),
  ...PROJECTS.filter(p => p.process).map(p => p.process!.final)
];

export default function Preloader() {
  useEffect(() => {
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return null;
}
