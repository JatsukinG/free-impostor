import type { IconType } from 'react-icons'
import { HiSparkles } from 'react-icons/hi2'
import { PiClock, PiGridFour, PiUsers } from 'react-icons/pi'
import NiceModal from '@ebay/nice-modal-react'
import ImpostorsModal from '@/modules/home/ImpostorsModal'
import PlayersModal from '@/modules/home/PlayersModal'
import useGameSettings from '@/hooks/useGameSettings'

interface SettingItemProps {
  value: string
  icon: IconType
  label: string
  color: string
  onClick: () => void
}

const SettingItem = ({ value, icon: Icon, label, color, onClick }: SettingItemProps) => {
  const colorClasses = {
    purple: {
      icon: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      hover: 'hover:bg-purple-500/20 hover:border-purple-400/50',
      shadow: 'hover:shadow-purple-500/50',
    },
    blue: {
      icon: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      hover: 'hover:bg-blue-500/20 hover:border-blue-400/50',
      shadow: 'hover:shadow-blue-500/50',
    },
    emerald: {
      icon: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      hover: 'hover:bg-emerald-500/20 hover:border-emerald-400/50',
      shadow: 'hover:shadow-emerald-500/50',
    },
    pink: {
      icon: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      hover: 'hover:bg-pink-500/20 hover:border-pink-400/50',
      shadow: 'hover:shadow-pink-500/50',
    },
  }

  const colors = colorClasses[color] || colorClasses.purple

  return (
      <button
          onClick={onClick}
          className={`
        group relative overflow-hidden
        ${colors.bg} ${colors.border} ${colors.hover}
        border-2 rounded-xl px-2 py-2
        flex items-center justify-between gap-3
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:shadow-lg ${colors.shadow}
        active:scale-[0.98]
        cursor-pointer
      `}
      >
        <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"/>

        <div className="flex items-center gap-3 z-10">
          <div className={`
          ${colors.icon} 
          p-2 rounded-lg bg-white/5
          group-hover:scale-110 transition-transform duration-300
        `}>
            <Icon className="text-xl"/>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-white/60 text-xs font-medium uppercase tracking-wide">
              {label}
            </span>
            <span className="text-white font-bold text-lg">
              {value}
            </span>
          </div>
        </div>

        {/* Indicador de clickeable */}
        <div className="text-white/40 group-hover:text-white/80 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </button>
  )
}

const GameSettings = () => {
  const { gameSettings } = useGameSettings()
  const playersLength = gameSettings.players.length
  const impostorsLength = gameSettings.impostors

  const handleSettingClick = (settingName) => {
    console.log(`Configurando: ${settingName}`)
  }

  return (
      <div className="px-4 py-6">
        {/* Título mejorado */}
        <div className="flex items-center gap-3 mb-6">
          <div
              className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg shadow-lg shadow-violet-500/30">
            <HiSparkles className="text-white text-xl"/>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-transparent bg-clip-text">
              Configuración del Juego
            </h2>
            <p className="text-white/50 text-sm">
              Personaliza las reglas de Impostor
            </p>
          </div>
        </div>

        {/* Lista de configuraciones */}
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
              icon={PiGridFour}
              label="Categorías"
              value="3 Categorías"
              color="blue"
              onClick={() => handleSettingClick('categorias')}
          />
          <SettingItem
              icon={PiClock}
              label="Tiempo"
              value="60 segundos"
              color="emerald"
              onClick={() => handleSettingClick('tiempo')}
          />
        </div>
      </div>
  )
}

export default GameSettings