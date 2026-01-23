import './flip-card.css'
import { Text } from '@components'
import useGame from '@/hooks/useGame'
import { MdOutlineFingerprint } from 'react-icons/md'

const FlipCard = () => {
  const { game } = useGame()
  const currentPlayer = game?.preview.currentPlayer

  return (
      <div
          className="flex-grow group w-full no-selectable flex flex-col">
        <div
            className="flex-grow relative w-full h-full group-active:rotate-y-180 duration-300 flip-card-inner flex flex-col">
          <div
              className="p-8 w-full absolute inset-0 back-visibility bg-white dark:bg-slate-800 rounded-4xl flex flex-col justify-center items-center gap-4">
            <span
                className="block size-24 bg-purple-600/20 rounded-full grid place-content-center text-4xl text-purple-600">
              <MdOutlineFingerprint/>
            </span>
            <Text size="lg" weight="medium">
              Toca para revelar
            </Text>
          </div>
          <div
              className="flex-grow p-8 w-full h-full absolute inset-0 rotate-y-180 back-visibility flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-4xl">
            {
              currentPlayer?.isImpostor
                  ?
                  <div>
                    <Text className="text-center">Eres un:</Text>
                    <Text className="text-center" color="red" size="4xl" weight="bold">Impostor</Text>
                    <Text className="mt-8 text-center">No tienes palabra</Text>
                  </div>
                  :
                  <div>
                    <Text className="text-center">Eres un:</Text>
                    <Text className="text-center" color="blue" size="2xl" weight="bold">Civíl</Text>
                    <Text className="mt-8 text-center">La palabra es:</Text>
                    <Text className="text-center" color="violet" size="4xl" weight="bold">{game?.word.label}</Text>
                  </div>
            }
          </div>
        </div>
      </div>
  )
}

export default FlipCard