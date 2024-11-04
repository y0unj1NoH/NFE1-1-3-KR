import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from 'utils';

const dropdownMenuVariants = cva(
  `absolute flex flex-col p-2 bg-white shadow-md rounded-lg border border-gray-200 z-10 transition-all duration-300`,
  {
    variants: {
      env: {
        pc: 'w-[200px] right-0 top-[60px] rounded-lg border',
        mobile: 'top-[70px] right-0 rounded-b-lg',
      },
    },
    defaultVariants: {
      env: 'pc',
    },
  },
);

interface DropdownMenuProps
  extends VariantProps<typeof dropdownMenuVariants>,
    React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  triggerAnimation: boolean;
}

export const DropdownMenu = ({ env, children, triggerAnimation, className }: DropdownMenuProps) => {
  const animationClasses = triggerAnimation
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 -translate-y-4';
  return (
    <div className={cn(dropdownMenuVariants({ env }), animationClasses, className)}>{children}</div>
  );
};
