import type { IconType } from 'react-icons'
import type { HTMLAttributes } from 'react'
import clsx from 'clsx'
import { Input as HInput } from '@headlessui/react'

type Sizes = 'xs' | 'sm' | 'base' | 'lg'
type Colors = 'gray' | 'green'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  icon?: IconType
  size?: Sizes
  color?: Colors
}

const inputSizes: Record<Sizes, string> = {
  xs: 'h-10 min-h-10 max-h-10 px-2 text-sm',
  sm: 'h-10 min-h-10 max-h-10 px-2 text-sm',
  base: 'h-10 min-h-10 max-h-10 px-2 text-sm',
  lg: 'h-10 min-h-10 max-h-10 px-2 text-sm',
}

const inputColors: Record<Colors, string> = {
  gray: 'border border-gray-200 dark:border-gray-700 text-gray-800 focus:outline-orange-200',
  green: 'border border-gray-200 dark:border-gray-700 text-gray-800',
}

const Input = ({
                 icon: Icon,
                 size = 'base',
                 color = 'gray',
                 className,
                 ...rest
               }: InputProps) => {
  return (
      <div className="relative w-full">
        {
            Icon &&
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Icon className="h-5 w-5 text-gray-400"/>
            </span>
        }
        <HInput
            className={clsx(
                'block w-full rounded-lg',
                inputSizes[size],
                inputColors[color],
                Icon && 'pl-10',
                className,
            )}
            {...rest}
        />
      </div>
  )
}

export default Input