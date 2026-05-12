import { useState } from 'react'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Button } from '@/components/forms'
import { Modal, NiceButton } from '@components'
import { TbEye, TbEyeOff, TbLock } from 'react-icons/tb'
import clsx from 'clsx'

const CustomWordModal = NiceModal.create(() => {
  const modal = useModal()
  const [word, setWord] = useState('')
  const [visible, setVisible] = useState(false)

  const onStart = () => {
    if (!word.trim()) return
    modal.resolve(word.trim())
    modal.remove()
  }

  const onCancel = () => {
    modal.resolve(null)
    modal.remove()
  }

  return (
    <Modal show={modal.visible} onClose={onCancel}>
      <Modal.Header>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg shadow-md">
            <TbLock className="text-white text-base" />
          </div>
          <b>Palabra secreta</b>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Que los demás jugadores miren para otro lado mientras escribes la palabra.
          </p>
          <div className="relative">
            <input
              autoFocus
              type={visible ? 'text' : 'password'}
              value={word}
              onChange={e => setWord(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onStart()}
              placeholder="Escribe la palabra..."
              className={clsx([
                'w-full h-12 pr-12 pl-4 rounded-xl border-2 outline-none transition-all duration-200',
                'text-slate-800 dark:text-white font-semibold text-lg tracking-wider',
                'bg-white dark:bg-slate-800',
                word.trim()
                  ? 'border-amber-400 focus:border-amber-500'
                  : 'border-slate-200 dark:border-slate-700 focus:border-amber-400',
              ])}
            />
            <button
              type="button"
              onClick={() => setVisible(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xl"
            >
              {visible ? <TbEyeOff /> : <TbEye />}
            </button>
          </div>
          {word.trim() && (
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium animate-in">
              Listo para iniciar con esta palabra.
            </p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end gap-2">
          <Button variant="outline" color="neutral" size="lg" onClick={onCancel}>
            Cancelar
          </Button>
          <div>
            <NiceButton disabled={!word.trim()} onClick={onStart}>
              ¡Iniciar juego!
            </NiceButton>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
})

export default CustomWordModal
