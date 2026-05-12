import NiceModal from '@ebay/nice-modal-react'
import { NiceButton } from '@components'
import useGame from '@/hooks/useGame'
import useGameSettings from '@/hooks/useGameSettings'
import CustomWordModal from '@/modules/home/CustomWordModal'

const Welcome = () => {
  const { initGame } = useGame()
  const { gameSettings } = useGameSettings()

  const handleStart = async () => {
    if (gameSettings.wordMode === 'custom') {
      const word = await NiceModal.show(CustomWordModal)
      if (word) initGame(word as string)
    } else {
      initGame()
    }
  }

  return (
    <div className="w-full flex flex-col items-center px-8">
      <h1 className="mt-12 text-4xl uppercase font-bold text-transparent bg-clip-text bg-gradient-to-tr from-violet-800 to-purple-400">
        Impostor
      </h1>
      <img
        alt="detective"
        src="/imp.png"
        className="my-8 text-red-400 w-32"
      />
      <NiceButton onClick={handleStart}>
        ¡Comenzar Juego!
      </NiceButton>
    </div>
  )
}

export default Welcome
