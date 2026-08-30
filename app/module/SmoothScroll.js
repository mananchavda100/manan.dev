'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  const scrollContainer = useRef(null);

  useEffect(() => {
    // Implement smooth scroll or Lenis pairing here
    ScrollTrigger.refresh();
  }, []);

  return <div ref={scrollContainer}>{children}</div>;
}
