import { FaMinus, FaPlus } from 'react-icons/fa'

interface Props {
  value: number
  min?: number
  max?: number
  onChange: (qty: number) => void
}

const QuantitySelectorInput = ({ value, min = 1, max = Infinity, onChange }: Props) => {
  return (
      <div className="flex items-center gap-1">
        <button
            color="light"
            type="button"
            className="size-10 p-0 m-0 grid place-content-center text-purple-600 bg-purple-600/10 border border-purple-600 rounded-md"
            disabled={value === min}
            onClick={() => onChange(value > min ? value - 1 : min)}
        >
          <FaMinus/>
        </button>
        <input
            type="text"
            className="h-10 min-h-10 max-h-10 w-12 text-center pointer-events-none text-slate-800 dark:text-white font-bold"
            value={value}
            onChange={(e) => {
              const qty = parseInt(e.target.value)
              if (isNaN(qty) || qty < min || qty > max) return
              onChange(qty)
            }}
        />
        <button
            color="light"
            type="button"
            className="size-10 p-0 m-0 grid place-content-center text-purple-600 bg-purple-600/10 border border-purple-600 rounded-md"
            disabled={value === max}
            onClick={() => onChange(value < max ? value + 1 : max)}
        >
          <FaPlus/>
        </button>
      </div>
  )
}

export default QuantitySelectorInput