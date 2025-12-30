import type { IconType } from 'react-icons'
import type { ButtonHTMLAttributes, MouseEvent } from 'react'
import { useRef } from 'react'
import clsx from 'clsx'
import { Button as HButton } from '@headlessui/react'

type Sizes = 'xs' | 'sm' | 'base' | 'lg'
type Colors = 'neutral' | 'green' | 'blue' | 'red' | 'orange'
type Variants = 'solid' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType
  size?: Sizes
  color?: Colors
  variant?: Variants
  loading?: boolean
}

const buttonSizes: Record<Sizes, string> = {
  xs: 'h-8 px-3 text-xs',
  sm: 'h-9 px-4 text-sm',
  base: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

const solidColors: Record<Colors, string> = {
  neutral: 'bg-neutral-800 text-white hover:bg-neutral-700',
  green: 'bg-green-600 text-white hover:bg-green-500',
  blue: 'bg-blue-600 text-white hover:bg-blue-500',
  red: 'bg-red-600 text-white hover:bg-red-500',
  orange: 'bg-orange-600 text-white hover:bg-orange-500',
}

const outlineColors: Record<Colors, string> = {
  neutral: 'border border-neutral-400 text-neutral-800 hover:bg-neutral-100',
  green: 'border border-green-600 text-green-600 hover:bg-green-50',
  blue: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
  red: 'border border-red-600 text-red-600 hover:bg-red-50',
  orange: 'border border-orange-600 text-orange-600 hover:bg-orange-50',
}

const Button = ({
                  icon: Icon,
                  size = 'base',
                  color = 'blue',
                  variant = 'solid',
                  loading = false,
                  className,
                  children,
                  disabled,
                  onClick,
                  ...rest
                }: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return

    // Crear el efecto ripple
    const button = buttonRef.current
    if (!button) return

    const ripple = document.createElement('span')
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const duration = Math.max(400, Math.min(1200, (rect.width / 160) * 800))

    ripple.style.width = ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.animationDuration = `${duration}ms`
    ripple.classList.add('ripple')

    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, duration)

    // Llamar al onClick original si existe
    if (onClick) {
      onClick(e)
    }
  }

  const colorStyles =
      variant === 'solid' ? solidColors[color] : outlineColors[color]

  return (
      <>
        <style>{`
        @keyframes ripple-effect {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: scale(0);
          animation: ripple-effect 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }
      `}</style>

        <HButton
            ref={buttonRef}
            disabled={disabled || loading}
            onClick={handleClick}
            className={clsx(
                'relative overflow-hidden inline-flex w-fit items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                buttonSizes[size],
                colorStyles,
                className,
            )}
            {...rest}
        >
          {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent"/>
          )}

          {!loading && Icon && <Icon className="h-4 w-4"/>}

          <span>{children}</span>
        </HButton>
      </>
  )
}

export default Button