import type { IconType } from 'react-icons'
import clsx from 'clsx'
import { useField } from 'formik'
import { Input } from '@/components/forms'

type Sizes = 'xs' | 'sm' | 'base' | 'lg'
type Colors = 'gray' | 'green'

interface FormikInputProps {
  name: string
  label?: string
  placeholder?: string
  icon?: IconType
  size?: Sizes
  color?: Colors
  type?: string
  className?: string
}

const FormikInput = ({
                       label,
                       className,
                       color = 'gray',
                       ...props
                     }: FormikInputProps) => {
  const [field, meta] = useField(props.name)

  const hasError = meta.touched && meta.error

  return (
      <div className={clsx('flex flex-col gap-1', className)}>
        {
            label &&
            <label
                htmlFor={props.name}
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {label}
            </label>
        }
        <Input
            {...field}
            {...props}
            color={hasError ? 'gray' : color}
        />

        {
            hasError &&
            <span className="text-xs text-red-500">
              {meta.error}
            </span>
        }
      </div>
  )
}

export default FormikInput