import { useState } from 'react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Button } from '@/components/forms'
import { Modal, NiceButton } from '@components'
import useGameSettings from '@/hooks/useGameSettings'
import QuantitySelectorInput from '@/components/QuantitySelectorInput'

const ImpostorsModal = NiceModal.create(() => {
  const modal = useModal()
  const { gameSettings, updateImpostors } = useGameSettings()
  const [qty, setQty] = useState<number>(gameSettings.impostors)

  const onSave = () => {
    updateImpostors(qty)
    modal.remove()
  }

  return (
      <Modal show={modal.visible} onClose={() => modal.hide()}>
        <Modal.Header>
          <b>Impostores</b>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center">
            <QuantitySelectorInput
                max={gameSettings.players.length - 1}
                value={qty}
                onChange={(v) => setQty(v)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-end gap-2">
            <Button variant="outline" color="neutral" size="lg" onClick={() => modal.remove()}>
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