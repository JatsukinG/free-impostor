import type { Game, Player, Word } from '@/types'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import words from '@/constants/words.json'
import { gameState } from '@/atoms/gameState'
import useGameSettings from '@/hooks/useGameSettings'

interface UseGameResult {
  game: Game | null
  initGame: () => void
  initVote: () => void
  resetVote: () => void
  voteForPlayer: (player: Player) => void
  changePreviewCurrentPlayer: (oldCurrentPlayer: Player) => void
}

const getRandomWordByCategories = (selectedCategories: string[]): Word => {
  // Filtrar palabras solo de las categorías seleccionadas
  const availableWords: Word[] = []
  
  selectedCategories.forEach(category => {
    if (words[category as keyof typeof words]) {
      const categoryWords = words[category as keyof typeof words] as Word[]
      availableWords.push(...categoryWords)
    }
  })
  
  // Si no hay palabras disponibles (no debería pasar), usar todas
  if (availableWords.length === 0) {
    Object.values(words).forEach(categoryWords => {
      const wordsList = categoryWords as Word[]
      availableWords.push(...wordsList)
    })
  }
  
  return availableWords[Math.floor(Math.random() * availableWords.length)]
}

const useGame = (): UseGameResult => {
  const navigate = useNavigate()
  const [game, setGame] = useAtom(gameState)
  const { gameSettings } = useGameSettings()

  const initGame = () => {
    const impostorIndexes: number[] = []

    while (impostorIndexes.length < gameSettings.impostors) {
      const impostorIndex = Math.floor(Math.random() * gameSettings.players.length)
      if (!impostorIndexes.includes(impostorIndex)) {
        impostorIndexes.push(impostorIndex)
      }
    }

    const players: Player[] = gameSettings.players.map((playerName, i) => ({
      name: playerName,
      isImpostor: impostorIndexes.includes(i),
      index: i,
    }))
    setGame({
      players: players,
      word: getRandomWordByCategories(gameSettings.categories),
      preview: {
        enabled: true,
        currentPlayer: players[0],
        hasNextPlayer: true,
      },
      initialPlayer: players[Math.floor(Math.random() * players.length)],
      vote: {
        enabled: false,
        votedPlayer: null,
      },
    })
    navigate('/game')
  }

  const changePreviewCurrentPlayer = (oldCurrentPlayer: Player) => {
    if (oldCurrentPlayer.index + 1 > game?.players.length - 1) {
      setGame(prev => ({ ...prev as Game, preview: { enabled: false, currentPlayer: null, hasNextPlayer: false } }))
    } else {
      setGame(prev => ({
        ...prev,
        preview: {
          enabled: true,
          currentPlayer: game.players[oldCurrentPlayer.index + 1],
          hasNextPlayer: oldCurrentPlayer.index + 1 < game.players.length - 1,
        },
      }))
    }
  }

  const initVote = () => {
    setGame(prev => ({ ...prev, vote: { enabled: true, votedPlayer: null } }))
  }

  const voteForPlayer = (player: Player) => {
    setGame(prev => ({
      ...prev,
      players: prev.players.filter(py => py.index !== player.index) as Player[],
      vote: { enabled: true, votedPlayer: player },
    }))
  }

  const resetVote = () => {
    setGame(prev => ({ ...prev, vote: { enabled: false, votedPlayer: null } }))
  }

  return {
    game,
    initGame,
    initVote,
    resetVote,
    voteForPlayer,
    changePreviewCurrentPlayer,
  }
}

export default useGame