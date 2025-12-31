import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Button } from '@/components/forms'
import { Modal, NiceButton } from '@components'

const ImpostorsModal = NiceModal.create(() => {
  const modal = useModal()

  return (
      <Modal show={modal.visible} onClose={() => modal.remove()}>
        <Modal.Header>
          Finalizar juego
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <p className="text-white text-lg">
              Quieres finalizar el juego?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex w-full justify-end gap-2">
            <Button color="neutral" size="lg" onClick={() => modal.remove()}>
              Cancelar
            </Button>
            <div>
              <NiceButton onClick={() => {
                modal.resolve(true)
                modal.remove()
              }}>
                Finalizar
              </NiceButton>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
  )
})

export default ImpostorsModal