import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

interface AnimatedHTMLDivElement extends HTMLDivElement {
  animation?: gsap.core.Timeline;
}

export const handleItemClick = (item: AnimatedHTMLDivElement) => {
  const modal = document.querySelector('.modal') as HTMLDivElement;
  const faces = item.querySelector('.faces');
  const animation = gsap.timeline({ paused: true });
  animation.to(faces, { rotationY: 180 });
  animation.set(item, { opacity: 0 });
  animation.add(function () {
    item.dataset.flipId = 'item';
    const state = Flip.getState([item, modal], {
      props: 'borderRadius, aspectRatio, boxShadow',
    });

    const itemColor = item.getAttribute('data-color');
    if (itemColor) {
      modal.style.backgroundColor = itemColor;
    }

    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';

    Flip.from(state, {
      duration: 0.4,
      ease: 'sine.inOut',
      absolute: true,
    });
  });

  item.animation = animation;
  item.animation.play();
};

export const handleModalClick = (
  images: HTMLDivElement[],
  activeIndex: number,
  modal: HTMLDivElement,
) => {
  const activeItem = images[activeIndex] as AnimatedHTMLDivElement;
  const faces = activeItem.querySelector('.faces');

  const animation = gsap.timeline({ paused: true });
  animation.set(activeItem, { opacity: 1 });
  animation.add(function () {
    const itemRect = activeItem.getBoundingClientRect();
    const modalRect = modal.getBoundingClientRect();

    const originalX = modalRect.left;
    const originalY = modalRect.top;

    const itemCenterX = itemRect.left;
    const itemCenterY = itemRect.top;

    const content = modal.querySelector('.modal-content') as HTMLDivElement;
    content.style.opacity = '0';

    gsap.to(modal, {
      duration: 0.4,
      x: itemCenterX - originalX,
      y: itemCenterY - originalY,
      width: itemRect.width,
      height: itemRect.height,
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

  activeItem.animation = animation;
  activeItem.animation.play();
};
