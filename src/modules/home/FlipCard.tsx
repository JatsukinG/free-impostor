import './flip-card.css'
import { Text } from '@components'
import useGame from '@/hooks/useGame'

const FlipCard = () => {
  const { game } = useGame()
  const currentPlayer = game.preview.currentPlayer

  return (
      <div
          className="group w-full aspect-[4/3] bg-gradient-to-br from-violet-700/10 to-purple-900/10 rounded-md no-selectable">
        <div className="relative w-full aspect-[4/3] group-active:rotate-y-180 duration-300 flip-card-inner">
          <div className="p-8 w-full aspect-[4/3] absolute inset-0 grid place-content-center back-visibility">
            <Text color="gray" size="lg">
              Haz click para revelar
            </Text>
          </div>
          <div
              className="p-8 w-full aspect-[4/3] absolute inset-0 rotate-y-180 back-visibility flex flex-col items-center justify-center">
            {
              currentPlayer?.isImpostor
                  ?
                  <div>
                    <p className="text-center text-white">Eres un:</p>
                    <p className="text-center text-red-400 text-4xl font-bold">Impostor</p>
                    <p className="mt-8 text-center text-white">No tienes palabra</p>
                  </div>
                  :
                  <div>
                    <p className="text-center text-white">Eres un:</p>
                    <p className="text-center text-blue-400 text-2xl font-bold">Civíl</p>
                    <p className="mt-8 text-center text-white">La palabra es:</p>
                    <p className="text-center text-purple-600 text-4xl font-bold">{game.word.label}</p>
                  </div>
            }
          </div>
        </div>
      </div>
  )
}

export default FlipCard