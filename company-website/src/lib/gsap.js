import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger, SplitText);

// Phone address bars resize the window while scrolling; recalculating then stutters.
ScrollTrigger.config({ ignoreMobileResize: true });

CustomEase.create('soft', '0.25,0.74,0.22,0.99');
CustomEase.create('curtain', '0.76,0,0.18,1');

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export const prefersReducedMotion = () => !window.matchMedia(MOTION_OK).matches;

export { gsap, ScrollTrigger, SplitText, useGSAP };
