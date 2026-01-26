import { useAtom } from 'jotai'
import { gameSettingsState } from '@/atoms/gameSettingsState'
import type { Category } from '@/types'

const useGameSettings = () => {
  const [gameSettings, setGameSettings] = useAtom(gameSettingsState)

  const updatePlayers = (players: string[]) => {
    setGameSettings(prev => ({ ...prev, players: players }))
  }

  const updateImpostors = (impostors: number) => {
    setGameSettings(prev => ({ ...prev, impostors: impostors }))
  }

  const updateCategories = (categories: Category[]) => {
    setGameSettings(prev => ({ ...prev, categories: categories }))
  }

  return {
    gameSettings,
    updatePlayers,
    updateImpostors,
    updateCategories,
  }
}

export default useGameSettings