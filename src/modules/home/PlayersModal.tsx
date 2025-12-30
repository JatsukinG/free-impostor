import { JSX, useState } from 'react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Button } from '@/components/forms'
import { Modal, NiceButton } from '@components'
import useGameSettings from '@/hooks/useGameSettings'
import { IoMdAddCircle, IoMdClose } from 'react-icons/io'

const ImpostorsModal = NiceModal.create(() => {
  const modal = useModal()
  const { updatePlayers, gameSettings } = useGameSettings()
  const [currentPlayers, setCurrentPlayers] = useState<string[]>(gameSettings.players)
  const [newPlayerValue, setNewPlayerValue] = useState<string>('')

  const onAddPlayer = () => {
    setCurrentPlayers(prev => [...prev, newPlayerValue])
    setNewPlayerValue('')
  }

  const onRemovePlayer = (index: number) => {
    setCurrentPlayers(prev => {
      let pl = [...prev]
      pl.splice(index, 1)
      return pl
    })
  }

  const onSave = () => {
    if (currentPlayers.some(player => !player)) return
    updatePlayers(currentPlayers)
    modal.remove()
  }

  return (
      <Modal show={modal.visible} onClose={() => modal.remove()}>
        <Modal.Header>
          <b>Jugadores</b>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            {
              currentPlayers.map((player, i) => (
                  <div className="w-full flex gap-2" key={i}>
                    <input
                        type="text"
                        className="!h-12 flex-grow border border-neutral-800 focus:ring-0 rounded-md p-2 outline-purple-800 text-white font-medium"
                        value={player}
                        onChange={(e) => {
                          const value = e.target.value
                          setCurrentPlayers(prev => {
                            let pl = [...prev]
                            pl[i] = value
                            return pl
                          })
                        }}
                    />
                    <button
                        onClick={() => onRemovePlayer(i)}
                        className="size-12 bg-red-400/10 border border-red-900 rounded-md grid place-content-center text-red-900 text-xl">
                      <IoMdClose/>
                    </button>
                  </div>
              ))
            }
            <div className="w-full flex gap-2">
              <input
                  type="text"
                  className="!h-12 flex-grow border border-neutral-800 focus:ring-0 rounded-md p-2 outline-purple-800 text-white font-medium"
                  placeholder="Nuevo jugador"
                  value={newPlayerValue}
                  onChange={(e) => {
                    const value = e.target.value
                    setNewPlayerValue(value)
                  }}
              />
              <button
                  onClick={() => onAddPlayer()}
                  className="size-12 bg-green-400/10 border border-green-600 rounded-md grid place-content-center text-green-600 text-xl">
                <IoMdAddCircle/>
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-end gap-2">
            <Button color="neutral" size="lg" onClick={() => modal.remove()}>
              Cancelar
            </Button>
            <div>
              <NiceButton onClick={() => onSave()}>
                Guardar
              </NiceButton>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
  )
})

export default ImpostorsModal