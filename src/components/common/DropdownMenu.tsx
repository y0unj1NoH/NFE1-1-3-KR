import { cn } from 'utils';

interface DropdownMenuProps {
  children: React.ReactNode;
  onTransitionEnd: () => void;
  triggerAnimation: boolean;
  className?: string;
}

export const DropdownMenu = ({
  children,
  onTransitionEnd,
  triggerAnimation,
  className,
}: DropdownMenuProps) => {
  const animationClass = triggerAnimation
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 -translate-y-4';

  return (
    <div
      className={cn(
        'absolute flex flex-col bg-white shadow-md border border-gray-200 z-10',
        'transition-all duration-300 w-[200px] p-4 rounded-lg right-[20px] top-[50px]',
        animationClass,
        className,
      )}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
};
