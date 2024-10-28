import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initGsap = () => {
  gsap.registerPlugin(ScrollTrigger, Draggable, Flip);
};

export const setupWheel = (wheel: HTMLElement, images: HTMLElement[]) => {
  const radius = wheel.offsetWidth / 2;
  const center = wheel.offsetWidth / 2;
  const slice = (2 * Math.PI) / images.length;

  images.forEach((item, i) => {
    const angle = i * slice;
    const x = center + radius * Math.sin(angle);
    const y = center - radius * Math.cos(angle);

    gsap.set(item, {
      rotation: angle + '_rad',
      xPercent: -50,
      yPercent: -50,
      x: x,
      y: y,
    });
  });

  images[0].classList.add('active');
};

export const handleDrag = (selector: string, images: HTMLElement[]) => {
  Draggable.create(selector, {
    type: 'rotation',
    snap: {
      rotation: gsap.utils.snap(360 / images.length),
    },
    onDragEnd: function () {
      const rotation = this.rotation % 360;
      const closestSnap = gsap.utils.snap(360 / images.length)(rotation);
      gsap.to(this.target, {
        rotation: closestSnap,
        duration: 0.5,
        ease: 'power2.out',
      });
    },
  });
};
