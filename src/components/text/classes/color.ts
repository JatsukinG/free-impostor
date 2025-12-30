import type { TextColor } from '../types'

const map: Record<TextColor, string> = {
  base: 'text-gray-800 dark:text-white',
  primary: 'text-indigo-800 dark:text-indigo-500',
  gray: 'text-gray-500 dark:text-gray-400',
  red: 'text-red-600 dark:text-red-500',
  blue: 'text-blue-700 dark:text-blue-600',
  success: 'text-green-700 dark:text-green-400',
}

export default (color: TextColor) => map[color]