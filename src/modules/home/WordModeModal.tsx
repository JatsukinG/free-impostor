import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { Button } from '@/components/forms'
import { Modal } from '@components'
import useGameSettings from '@/hooks/useGameSettings'
import { TbDice, TbPencil } from 'react-icons/tb'
import clsx from 'clsx'

const WordModeModal = NiceModal.create(() => {
  const modal = useModal()
  const { gameSettings, updateWordMode } = useGameSettings()
  const currentMode = gameSettings.wordMode ?? 'random'

  const onSelect = (mode: 'random' | 'custom') => {
    updateWordMode(mode)
    modal.remove()
  }

  const modes = [
    {
      id: 'random' as const,
      icon: TbDice,
      title: 'Aleatoria',
      description: 'Se elige una palabra al azar de la lista de categorías.',
      color: 'violet',
    },
    {
      id: 'custom' as const,
      icon: TbPencil,
      title: 'Personalizada',
      description: 'El organizador escribe la palabra secreta al iniciar el juego.',
      color: 'amber',
    },
  ]

  return (
    <Modal show={modal.visible} onClose={() => modal.remove()}>
      <Modal.Header>
        <b>Modo de palabra</b>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-3">
          {modes.map(({ id, icon: Icon, title, description, color }) => {
            const isActive = currentMode === id
            const activeClasses: Record<string, string> = {
              violet: 'border-violet-500 bg-violet-500/10',
              amber: 'border-amber-500 bg-amber-500/10',
            }
            const iconClasses: Record<string, string> = {
              violet: 'text-violet-500 bg-violet-500/20',
              amber: 'text-amber-500 bg-amber-500/20',
            }

            return (
              <button
                key={id}
                onClick={() => onSelect(id)}
                className={clsx([
                  'w-full text-left flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200',
                  isActive
                    ? activeClasses[color]
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600',
                ])}
              >
                <div className={clsx(['p-2 rounded-lg shrink-0', iconClasses[color]])}>
                  <Icon className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white text-sm">{title}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{description}</p>
                </div>
                {isActive && (
                  <span className={clsx([
                    'ml-auto shrink-0 size-5 rounded-full border-2 flex items-center justify-center',
                    color === 'violet' ? 'border-violet-500' : 'border-amber-500',
                  ])}>
                    <span className={clsx([
                      'size-2.5 rounded-full',
                      color === 'violet' ? 'bg-violet-500' : 'bg-amber-500',
                    ])} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex w-full justify-end">
          <Button variant="outline" color="neutral" size="lg" onClick={() => modal.remove()}>
            Cerrar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
})

export default WordModeModal
