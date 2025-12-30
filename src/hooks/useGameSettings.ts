import { useAtom } from 'jotai'
import { gameSettingsState } from '@/atoms/gameSettingsState'

const useGameSettings = () => {
  const [gameSettings, setGameSettings] = useAtom(gameSettingsState)

  const updatePlayers = (players: string[]) => {
    setGameSettings(prev => ({ ...prev, players: players }))
  }

  const updateImpostors = (impostors: number) => {
    setGameSettings(prev => ({ ...prev, impostors: impostors }))
  }

  return {
    gameSettings,
    updatePlayers,
    updateImpostors,
  }
}

export default useGameSettings