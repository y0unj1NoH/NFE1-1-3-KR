import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

export const handleDrag = (
  selector: string,
  images: HTMLElement[],
  tracker: { item: number },
  tl: gsap.core.Timeline,
) => {
  let startRotation = 0;

  const rotateSlider = (
    target: HTMLElement,
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

  Draggable.create(selector, {
    type: 'rotation',
    // snap: {
    //   rotation: gsap.utils.snap(360 / images.length),
    // },
    onPress: function () {
      startRotation = this.rotation as number;
    },
    onDrag: function () {
      rotateSlider(this.target as HTMLElement, this.rotation as number, 0.1, 'power2.out');
    },
    onDragEnd: function () {
      const endRotation = this.rotation as number;
      const rotationDiff = endRotation - startRotation;
      const direction = rotationDiff >= 0 ? 1 : -1;
      const AnglePerImage = 360 / images.length;
      const moveSteps = Math.round(Math.abs(rotationDiff) / AnglePerImage);
      const finalRotation = startRotation + moveSteps * direction * AnglePerImage;

      console.log('Drag 1: ', tracker.item, tl.progress());

      const snap = gsap.utils.snap(1 / images.length);

      gsap.to(tl, {
        progress: snap(tl.progress() + (moveSteps * direction) / images.length),
        modifiers: {
          progress: gsap.utils.wrap(0, 1),
        },
        onComplete: () => {
          console.log('Drag Complete: ', tracker.item, tl.progress());
        },
      });

      // tracker.item를 할당해서 수정하면 타임라인은 안바뀐다. 이렇게 하면 안된다.
      const next = (tracker.item - moveSteps * direction + images.length) % images.length;
      document.querySelector('.wheel__card.active')?.classList.remove('active');
      images[next].classList.add('active');

      gsap.to(this.target, {
        rotation: finalRotation,
        duration: 1,
        ease: 'power4.out',
        onComplete: () => {
          console.log('Drag 2: ', tracker.item, tl.progress());
        },
      });

      // rotateSlider(this.target as HTMLElement, finalRotation, 1, 'power4.out');
    },
  });
};

const setupTimeline = (total: number, tl: gsap.core.Timeline, tracker: { item: number }) => {
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

  const snap = gsap.utils.snap(1 / total);
  gsap.to(tl, {
    progress: snap(tl.progress() + 1),
    modifiers: {
      progress: gsap.utils.wrap(0, 1),
    },
    onComplete: () => {
      console.log('Click Complete: ', tracker.item, tl.progress());
    },
  });
};

const moveWheel = (
  i: number,
  step: number,
  tl: gsap.core.Timeline,
  amount: number,
  tracker: { item: number },
  images: HTMLElement[],
) => {
  console.log('Click 1: ', tracker.item, tl.progress());

  const snap = gsap.utils.snap(step);
  const progress = tl.progress();
  tl.progress(gsap.utils.wrap(0, 1)(snap(tl.progress() + amount)));
  const next = tracker.item;
  tl.progress(progress);

  document.querySelector('.wheel__card.active')?.classList.remove('active');
  images[next]?.classList.add('active');

  gsap.to(tl, {
    progress: snap(tl.progress() + amount),
    modifiers: {
      progress: gsap.utils.wrap(0, 1),
    },
    onComplete: () => {
      console.log('Click Complete: ', tracker.item, tl.progress());
    },
  });
};

export const handleInactiveClick = (
  images: HTMLElement[],
  tl: gsap.core.Timeline,
  tracker: { item: number },
) => {
  const total = images.length;
  const step = 1 / total;

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
        moveWheel(i, step, tl, diff * step, tracker, images);
      } else {
        const amt = total - Math.abs(diff);
        if (currentActive > i) {
          moveWheel(i, step, tl, amt * -step, tracker, images);
        } else {
          moveWheel(i, step, tl, amt * step, tracker, images);
        }
      }
    });
  });
};

export const initGsap = (wheel: HTMLElement, images: HTMLElement[]) => {
  gsap.registerPlugin(ScrollTrigger, Draggable, Flip);

  const tl = gsap.timeline({ paused: true, reversed: true });
  const tracker = { item: 0 };

  setupWheel(wheel, images);

  handleDrag('.wheel', images, tracker, tl);

  setupTimeline(images.length, tl, tracker);
  handleInactiveClick(images, tl, tracker);
};
