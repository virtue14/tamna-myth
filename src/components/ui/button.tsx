import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-seolmundae-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95',
          {
            'bg-gradient-to-r from-seolmundae-orange to-seolmundae-orange-dark text-white hover:from-seolmundae-orange-dark hover:to-seolmundae-gold-dark shadow-xl hover:shadow-2xl border-2 border-seolmundae-gold': variant === 'default',
            'bg-gradient-to-r from-myth-purple to-myth-purple-dark text-white hover:from-myth-purple-dark hover:to-myth-purple shadow-xl hover:shadow-2xl border-2 border-myth-purple-light': variant === 'destructive',
            'border-2 border-seolmundae-orange bg-white hover:bg-seolmundae-orange hover:text-white text-seolmundae-orange-dark shadow-lg hover:shadow-xl': variant === 'outline',
            'bg-gradient-to-r from-myth-cream to-myth-beige text-myth-gray-dark hover:from-myth-beige hover:to-myth-beige-dark shadow-lg hover:shadow-xl border-2 border-myth-beige-dark': variant === 'secondary',
            'hover:bg-seolmundae-orange hover:text-white text-myth-gray-dark border-2 border-transparent hover:border-seolmundae-orange': variant === 'ghost',
            'text-seolmundae-orange underline-offset-4 hover:underline font-bold': variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
