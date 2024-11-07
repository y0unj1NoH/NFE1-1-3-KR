import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from 'utils';

export const ButtonVariants = cva(
  `
  absolute w-[4rem] h-[4rem] shadow rounded-full flex items-center justify-center 
  transition-all duration-200 ease-in-out p-2 gap-2
  `,
  {
    variants: {
      variant: {
        default: 'shadow-none active:scale-100',
        coral: 'bg-menu-coral',
        gold: 'bg-gold-default',
        white: 'bg-white border-solid border-2 border-gold-default',
        blue: 'bg-primary',
      },
      position: {
        default: 'top-4 right-4',
        menu: ' top-4 right-4 z-10',
        search: ' top-3 right-24 ',
        community: 'top-[4.95rem] right-[5rem]',
        profile: ' top-24 right-3 ',
      },
      stretch: {
        default: 'w-[4rem]',
        search: 'xxs:w-[12rem] sm:w-[20rem] top-3 right-24',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'default',
      stretch: 'default',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  label?: string;
  children?: React.ReactElement;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  variant,
  position,
  stretch,
  children,
  label,
  onClick,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(ButtonVariants({ variant, position, stretch }), className)}
      {...props}
      onClick={onClick}
    >
      {children && children}
      {label && label}
    </button>
  );
};

interface IconProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

export const Icon: FC<IconProps> = ({ src, alt, onClick }) => (
  <img alt={alt} className='object-contain w-10 h-10' onClick={onClick} src={src} />
);
