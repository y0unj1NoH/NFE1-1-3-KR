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

const createTimeline = (total: number, tracker: { item: number }) => {
  const tl = gsap.timeline({ paused: true, reversed: true });
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
      item: total,
      duration: 1,
      ease: 'none',
      modifiers: {
        item(value: number) {
          return wrapTracker(total - Math.round(value));
        },
      },
    },
    0,
  );

  return tl;
};

const moveWheel = (step: number, tl: gsap.core.Timeline, amount: number) => {
  const wrapProgress = gsap.utils.wrap(0, 1);
  const snap = gsap.utils.snap(step);

  const progress = tl.progress();
  tl.progress(wrapProgress(snap(tl.progress() + amount)));
  tl.progress(progress);

  gsap.to(tl, {
    progress: snap(tl.progress() + amount),
    modifiers: {
      progress: wrapProgress,
    },
  });
};

export const handleInactiveClick = (images: HTMLElement[]) => {
  const total = images.length;
  const step = 1 / total;
  const tracker = { item: 0 };

  const tl = createTimeline(total, tracker);

  images.forEach((el, i) => {
    el.addEventListener('click', function () {
      const currentActive = tracker.item;

      if (i === currentActive) {
        return;
      }

      document.querySelector('.wheel__card.active')?.classList.remove('active');
      images[i].classList.add('active');

      const diff = currentActive - i;

      if (Math.abs(diff) < total / 2) {
        moveWheel(step, tl, diff * step);
      } else {
        const amt = total - Math.abs(diff);
        if (currentActive > i) {
          moveWheel(step, tl, amt * -step);
        } else {
          moveWheel(step, tl, amt * step);
        }
      }
    });
  });
};
