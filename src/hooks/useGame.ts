import type { Game, Player, Word } from '@/types'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import words from '@/constants/words.json'
import { gameState } from '@/atoms/gameState'
import useGameSettings from '@/hooks/useGameSettings'

interface UseGameResult {
  game: Game | null
  initGame: () => void
  changePreviewCurrentPlayer: (oldCurrentPlayer: Player) => void
}

const getRandomWordByCategories = (): Word => {
  const categoriesLength = Object.keys(words).length
  const category = Object.keys(words)[Math.floor(Math.random() * categoriesLength)]
  const relatedWords: Word[] = words[category] as Word[]
  return relatedWords[Math.floor(Math.random() * relatedWords.length)]
}

const useGame = (): UseGameResult => {
  const navigate = useNavigate()
  const [game, setGame] = useAtom(gameState)
  const { gameSettings } = useGameSettings()

  const initGame = () => {
    let impostorIndexes: number[] = []

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
      word: getRandomWordByCategories(),
      preview: {
        enabled: true,
        currentPlayer: players[0],
        hasNextPlayer: true,
      },
      initialPlayer: players[Math.floor(Math.random() * players.length)],
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

  return {
    game,
    initGame,
    changePreviewCurrentPlayer,
  }
}

export default useGame