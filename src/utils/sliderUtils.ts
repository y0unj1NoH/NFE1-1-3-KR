import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';

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

const moveWheel = (images: HTMLDivElement[], amount: number, tl: gsap.core.Timeline) => {
  const total = images.length;

  gsap.to(tl, {
    progress: snap(total)(tl.progress() + amount),
    modifiers: {
      progress: wrapProgress,
    },
  });
};

export const setupWheel = (wheel: HTMLDivElement, images: HTMLDivElement[]) => {
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

export const setupTimeline = (total: number, tl: gsap.core.Timeline, tracker: { item: number }) => {
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

  gsap.to(tl, {
    duration: 1.5,
    progress: snap(total)(tl.progress() - 1),
    modifiers: {
      progress: wrapProgress,
    },
  });
};

export const handleDrag = (images: HTMLDivElement[], tl: gsap.core.Timeline) => {
  const total = images.length;
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
      });

      const finalRotation = startRotation + distance * AnglePerImage;
      rotateSlider(this.target as HTMLDivElement, finalRotation, 1, 'power4.out');
    },
  });
};

export const handleClick = (
  images: HTMLDivElement[],
  tl: gsap.core.Timeline,
  tracker: { item: number },
  modal: HTMLDivElement,
) => {
  const total = images.length;
  const step = 1 / total;

  images.forEach((el, i) => {
    el.addEventListener('click', function () {
      const currentActive = tracker.item;

      if (i === currentActive) {
        handleActiveClick(el as AnimatedHTMLDivElement, modal);
      }

      const diff = currentActive - i;
      if (Math.abs(diff) < total / 2) {
        moveWheel(images, diff * step, tl);
      } else {
        const amt = total - Math.abs(diff);
        if (currentActive > i) {
          moveWheel(images, amt * -step, tl);
        } else {
          moveWheel(images, amt * step, tl);
        }
      }
    });
  });
};

interface AnimatedHTMLDivElement extends HTMLDivElement {
  animation?: gsap.core.Timeline;
}

const handleActiveClick = (card: AnimatedHTMLDivElement, modal: HTMLDivElement) => {
  const faces = card.querySelector('.faces');
  const animation = gsap.timeline({ paused: true });
  animation.to(faces, { rotationY: 180 });
  animation.set(card, { opacity: 0 });
  animation.add(function () {
    card.dataset.flipId = 'wheel__card';
    const state = Flip.getState([card, modal], {
      props: 'borderRadius, aspectRatio, boxShadow',
    });

    const cardColor = card.getAttribute('data-color');
    if (cardColor) {
      modal.style.backgroundColor = cardColor;
    }

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';

    Flip.from(state, {
      duration: 0.4,
      ease: 'sine.inOut',
      absolute: true,
    });
  });

  card.animation = animation;
  card.animation.play();
};

export const handleModalClick = (
  images: HTMLDivElement[],
  trackerItem: number,
  modal: HTMLDivElement,
) => {
  const activeCard = images[trackerItem] as AnimatedHTMLDivElement;
  const faces = activeCard.querySelector('.faces');

  const animation = gsap.timeline({ paused: true });
  animation.set(activeCard, { opacity: 1 });
  animation.add(function () {
    const cardRect = activeCard.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();

    const originalX = modalRect.left;
    const originalY = modalRect.top;

    const cardCenterX = cardRect.left;
    const cardCenterY = cardRect.top;

    const content = modal.querySelector('.modal-content') as HTMLDivElement;
    content.style.opacity = '0';

    gsap.to(modal, {
      duration: 0.4,
      x: cardCenterX - originalX,
      y: cardCenterY - originalY,
      width: cardRect.width,
      height: cardRect.height,
      ease: 'sine.inOut',
      onComplete: () => {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
        modal.style.width = '100%';
        modal.style.height = '100vh';

        gsap.set(modal, {
          x: originalX - modalRect.left,
          y: originalY - modalRect.top,
        });

        animation.to(faces, { rotationY: 0 });
        content.style.opacity = '1';
      },
    });
  });

  activeCard.animation = animation;
  activeCard.animation.play();
};

export const handleWheel = (deltaY: number, images: HTMLDivElement[], tl: gsap.core.Timeline) => {
  const direction = deltaY > 0 ? -1 : 1;
  const total = images.length;

  gsap.to(tl, {
    progress: snap(total)(tl.progress() + direction / total),
    modifiers: {
      progress: wrapProgress,
    },
  });
};
