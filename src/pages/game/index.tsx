import type { Player } from '@/types'
import useGame from '@/hooks/useGame'
import Loader from '@/components/Loader'
import { NiceButton, Text } from '@components'
import FlipCard from '@/modules/home/FlipCard'

const GamePage = () => {
  const { game, changePreviewCurrentPlayer } = useGame()
  const hasNextPlayer = game.preview.hasNextPlayer
  const previewEnabled = game.preview.enabled
  const currentPlayer = game.preview.currentPlayer
  const initialPlayer = game.initialPlayer

  return (
      <div className="px-4 py-12 flex flex-col min-h-screen">
        {
            previewEnabled &&
            <div className="flex flex-col items-center gap-8">
                <Text size="2xl" weight="bold">
                  {currentPlayer?.name}
                </Text>
                <FlipCard/>
                <NiceButton onClick={() => changePreviewCurrentPlayer(currentPlayer as Player)}>
                  {hasNextPlayer ? 'Siguiente jugador' : 'Empezar juego'}
                </NiceButton>
            </div>
        }
        {
            !previewEnabled &&
            <div className="my-auto text-center flex flex-col items-center">
                <p className="text-white text-2xl font-medium">
                    Empieza <span className="text-purple-600">{initialPlayer.name}</span>
                </p>
                <Loader className="w-full"/>
                <NiceButton>
                    Votar
                </NiceButton>
            </div>
        }
      </div>
  )
}

export default GamePage