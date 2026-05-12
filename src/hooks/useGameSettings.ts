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

  const updateWordMode = (mode: 'random' | 'custom') => {
    setGameSettings(prev => ({ ...prev, wordMode: mode }))
  }

  return {
    gameSettings,
    updatePlayers,
    updateImpostors,
    updateCategories,
    updateWordMode,
  }
}

export default useGameSettings
