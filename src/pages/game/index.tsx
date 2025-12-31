import type { Player } from '@/types'
import { useState } from 'react'
import clsx from 'clsx'
import { FaCheckCircle } from 'react-icons/fa'
import { IoMdCloseCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import useGame from '@/hooks/useGame'
import Loader from '@/components/Loader'
import { NiceButton, Text } from '@components'
import FlipCard from '@/modules/home/FlipCard'

const GamePage = () => {
  const navigate = useNavigate()
  const { game, changePreviewCurrentPlayer, initVote, voteForPlayer, resetVote } = useGame()
  const [votedPlayer, setVotedPlayer] = useState<Player | null>(null)
  const hasNextPlayer = game?.preview.hasNextPlayer
  const previewEnabled = game?.preview.enabled
  const currentPlayer = game?.preview.currentPlayer
  const initialPlayer = game?.initialPlayer

  return (
      <div className="px-4 py-12 flex flex-col min-h-screen">
        {
            (previewEnabled && !game?.vote.enabled) &&
            <div key={currentPlayer?.index ?? 1} className="flex flex-col items-center gap-8 animate-in">
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
            (!previewEnabled && !game?.vote.enabled) &&
            <div className="my-auto text-center flex flex-col items-center animate-in">
                <p className="text-white text-2xl font-medium">
                    Empieza <span className="text-purple-600">{initialPlayer?.name}</span>
                </p>
                <Loader/>
                <NiceButton onClick={() => initVote()}>
                    Votar
                </NiceButton>
            </div>
        }
        {
            game?.vote.enabled &&
            <div>
              {
                !!game.vote.votedPlayer ?
                    <div className="animate-in">
                      {
                        game.vote.votedPlayer.isImpostor ?
                            <div className="mb-8 flex flex-col gap-8">
                              <span className="text-5xl text-green-600 text-center mx-auto">
                                <FaCheckCircle/>
                              </span>
                              <p className="text-white text-3xl text-center">
                                <span className="text-purple-600 font-bold">
                                  {game.vote.votedPlayer.name}
                                </span>
                                <br/>
                                Era un impostor
                              </p>
                            </div>
                            :
                            <div className="mb-8 flex flex-col gap-8">
                              <span className="text-5xl text-red-600 text-center mx-auto">
                                <IoMdCloseCircle/>
                              </span>
                              <p className="text-white text-3xl text-center">
                                <span className="text-purple-600 font-bold">
                                  {game.vote.votedPlayer.name}
                                </span>
                                <br/>
                                No era un impostor
                              </p>
                            </div>
                      }
                      <NiceButton
                          onClick={() => {
                            if (game?.vote.votedPlayer?.isImpostor) {
                              navigate('/')
                            } else {
                              resetVote()
                            }
                          }}
                      >
                        {game.vote.votedPlayer.isImpostor ? 'Finalizar juego' : 'Continuar el juego'}
                      </NiceButton>
                    </div>
                    :
                    <div className="animate-in">
                      <p className="text-purple-600 text-center text-xl font-medium">
                        ¿Quién crees que es el impostor?
                      </p>
                      <div className="my-8 grid grid-cols-2 gap-4">
                        {
                          game.players.map((player) => (
                              <div
                                  key={player.index}
                                  onClick={() => setVotedPlayer(player)}
                                  className={clsx([
                                    'border p-2 rounded-md',
                                    votedPlayer?.index === player.index ? 'border-purple-600' : 'border-neutral-700',
                                  ])}
                              >
                                <p className="text-white font-medium">{player.name}</p>
                              </div>
                          ))
                        }
                      </div>
                      <NiceButton disabled={!votedPlayer} onClick={() => votedPlayer && voteForPlayer(votedPlayer)}>
                        {!votedPlayer ? 'Selecciona un jugador' : `Votar por ${votedPlayer?.name}`}
                      </NiceButton>
                    </div>
              }
            </div>
        }
      </div>
  )
}

export default GamePage