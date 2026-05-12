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

  const updateWordMode = (mode: 'random' | 'custom') => {
    setGameSettings(prev => ({ ...prev, wordMode: mode }))
  }

  return {
    gameSettings,
    updatePlayers,
    updateImpostors,
    updateWordMode,
  }
}

export default useGameSettings