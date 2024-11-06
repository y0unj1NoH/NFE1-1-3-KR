import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';

import { handleItemClick } from 'utils';

const wrapProgress = gsap.utils.wrap(0, 1);

const snap = (length: number) => {
  return gsap.utils.snap(1 / length);
};

const rotateSlider = (
  target: HTMLDivElement,
  rotation: number,
  duration: number,
  ease: string,
  onComplete?: () => void,
) => {
  gsap.to(target, {
    rotation,
    duration,
    ease,
    onComplete,
  });
};

const moveWheel = (
  items: HTMLDivElement[],
  amount: number,
  tl: gsap.core.Timeline,
  tracker: { index: number },
  setActiveIndex: (index: number) => void,
) => {
  const total = items.length;

  gsap.to(tl, {
    progress: snap(total)(tl.progress() + amount),
    modifiers: {
      progress: wrapProgress,
    },
    onComplete: () => {
      setActiveIndex(tracker.index);
    },
  });
};

export const setupWheel = (wheel: HTMLDivElement, items: HTMLDivElement[]) => {
  const radius = wheel.offsetWidth / 2;
  const center = wheel.offsetWidth / 2;
  const slice = (2 * Math.PI) / items.length;

  items.forEach((item, i) => {
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
};

export const setupTimeline = (
  total: number,
  tl: gsap.core.Timeline,
  tracker: { index: number },
) => {
  const wrapTracker = gsap.utils.wrap(0, total);

  tl.to(
    '.wheel',
    {
      rotation: '+=360',
      transformOrigin: 'center',
      duration: 1,
      ease: 'none',
    },
    0,
  );

  tl.to(
    tracker,
    {
      index: total,
      duration: 1,
      ease: 'none',
      modifiers: {
        index(value: number) {
          return wrapTracker(total - Math.round(value));
        },
      },
    },
    0,
  );

  gsap.to(tl, {
    duration: 1.5,
    progress: snap(total)(tl.progress() - 1),
    modifiers: {
      progress: wrapProgress,
    },
  });
};

export const handleDrag = (
  items: HTMLDivElement[],
  tl: gsap.core.Timeline,
  tracker: { index: number },
  setActiveIndex: (index: number) => void,
) => {
  const total = items.length;
  const AnglePerImage = 360 / total;
  let startRotation = 0;

  Draggable.create('.wheel', {
    type: 'rotation',
    onPress: function () {
      startRotation = this.rotation as number;
    },
    onDrag: function () {
      rotateSlider(this.target as HTMLDivElement, this.rotation as number, 0.1, 'power2.out');
    },
    onDragEnd: function () {
      const rotationDiff = this.rotation - startRotation;
      const distance = Math.round(rotationDiff / AnglePerImage);

      gsap.to(tl, {
        progress: snap(total)(tl.progress() + distance / total),
        modifiers: {
          progress: wrapProgress,
        },
        onComplete: () => {
          setActiveIndex(tracker.index);
        },
      });

      const finalRotation = startRotation + distance * AnglePerImage;
      rotateSlider(this.target as HTMLDivElement, finalRotation, 1, 'power4.out');
    },
  });
};

interface AnimatedHTMLDivElement extends HTMLDivElement {
  animation?: gsap.core.Timeline;
}

export const handleClick = (
  items: HTMLDivElement[],
  tl: gsap.core.Timeline,
  tracker: { index: number },
  setActiveIndex: (index: number) => void,
) => {
  const total = items.length;
  const step = 1 / total;

  items.forEach((el, i) => {
    el.addEventListener('click', function () {
      const currentActive = tracker.index;

      if (i === currentActive) {
        handleItemClick(el as AnimatedHTMLDivElement);
      }

      const diff = currentActive - i;
      if (Math.abs(diff) < total / 2) {
        moveWheel(items, diff * step, tl, tracker, setActiveIndex);
      } else {
        const amt = total - Math.abs(diff);
        if (currentActive > i) {
          moveWheel(items, amt * -step, tl, tracker, setActiveIndex);
        } else {
          moveWheel(items, amt * step, tl, tracker, setActiveIndex);
        }
      }
    });
  });
};

export const handleWheel = (
  deltaY: number,
  items: HTMLDivElement[],
  tl: gsap.core.Timeline,
  tracker: { index: number },
  setActiveIndex: (index: number) => void,
) => {
  const direction = deltaY > 0 ? -1 : 1;
  const total = items.length;

  gsap.to(tl, {
    progress: snap(total)(tl.progress() + direction / total),
    modifiers: {
      progress: wrapProgress,
    },
    onComplete: () => {
      setActiveIndex(tracker.index);
    },
  });
};
