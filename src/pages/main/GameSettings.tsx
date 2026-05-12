import type { IconType } from 'react-icons'
import { PiGridFour, PiUsers } from 'react-icons/pi'
import { TbDice, TbPencil, TbSettings } from 'react-icons/tb'
import NiceModal from '@ebay/nice-modal-react'
import CategoriesModal from '@/modules/home/CategoriesModal'
import ImpostorsModal from '@/modules/home/ImpostorsModal'
import PlayersModal from '@/modules/home/PlayersModal'
import WordModeModal from '@/modules/home/WordModeModal'
import useGameSettings from '@/hooks/useGameSettings'
import clsx from 'clsx'
import { Text } from '@components'
import { FaAngleRight } from 'react-icons/fa'
import ToggleDarkModeButton from '@/layouts/main/components/ToggleDarkModeButton'

interface SettingItemProps {
  value: string
  icon: IconType
  label: string
  color: string
  onClick: () => void
}

interface ItemColor {
  icon: string
}

const SettingItem = ({ value, icon: Icon, label, color, onClick }: SettingItemProps) => {
  const colorClasses: Record<string, ItemColor> = {
    purple: {
      icon: 'text-purple-400 bg-purple-500/20',
    },
    blue: {
      icon: 'text-blue-400 bg-blue-500/20',
    },
    emerald: {
      icon: 'text-emerald-400 bg-emerald-500/20',
    },
    pink: {
      icon: 'text-pink-400 bg-pink-500/20',
    },
    amber: {
      icon: 'text-amber-400 bg-amber-500/20',
    },
  }

  const colors: ItemColor = colorClasses[color] || colorClasses.purple

  return (
      <button
          onClick={onClick}
          className={clsx([
            'group overflow-hidden',
            'bg-white shadow-lg dark:bg-slate-800',
            'rounded-xl px-2 py-2 border border-white dark:border-slate-700',
            'flex items-center justify-between gap-3',
            'transition-all duration-300 ease-out',
            'hover:scale-[1.02] hover:shadow-lg ${colors.shadow}',
            'active:scale-[0.98]',
            'cursor-pointer',
          ])}
      >
        <div className="flex items-center gap-3">
          <div className={`
          ${colors.icon}
          p-2 rounded-lg
          group-hover:scale-110 transition-transform duration-300
        `}>
            <Icon className="text-xl"/>
          </div>
          <div className="flex flex-col items-start">
            <Text as="span" className="uppercase tracking-wide" color="gray" size="xs" weight="semibold">
              {label}
            </Text>
            <Text as="span" className="uppercase tracking-wide" size="sm" weight="extrabold">
              {value}
            </Text>
          </div>
        </div>

        <Text as="span" color="gray" className="pr-2" weight="extrabold">
          <FaAngleRight/>
        </Text>
      </button>
  )
}

const GameSettings = () => {
  const { gameSettings } = useGameSettings()
  const playersLength = gameSettings.players.length
  const impostorsLength = gameSettings.impostors
  const categoriesLength = gameSettings.categories.length
  const wordMode = gameSettings.wordMode ?? 'random'

  return (
      <div className="px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div
              className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-lg shadow-violet-500/30">
            <TbSettings className="text-white text-xl"/>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-transparent bg-clip-text">
              Configuración del Juego
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SettingItem
              icon={PiUsers}
              label="Jugadores"
              value={`${playersLength} Jugadores`}
              color="purple"
              onClick={() => NiceModal.show(PlayersModal)}
          />
          <SettingItem
              icon={PiUsers}
              label="Impostores"
              value={`${impostorsLength} Impostor${impostorsLength > 1 ? 'es' : ''}`}
              color="pink"
              onClick={() => NiceModal.show(ImpostorsModal)}
          />
          <SettingItem
              icon={wordMode === 'custom' ? TbPencil : TbDice}
              label="Modo Palabra"
              value={wordMode === 'custom' ? 'Personalizada' : 'Aleatoria'}
              color="amber"
              onClick={() => NiceModal.show(WordModeModal)}
          />
          <SettingItem
              icon={PiGridFour}
              label="Categorías"
              value={`${categoriesLength} Categoría${categoriesLength > 1 ? 's' : ''}`}
              color="blue"
              onClick={() => NiceModal.show(CategoriesModal)}
          />
        </div>
        <div className="mt-2 p-2 flex items-center justify-between">
          <Text weight="bold">
            Tema:
          </Text>
          <ToggleDarkModeButton/>
        </div>
      </div>
  )
}

export default GameSettings
