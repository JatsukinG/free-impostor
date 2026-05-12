import NiceModal, { useModal } from '@ebay/nice-modal-react'
import type { Category } from '@/types'
import useGameSettings from '@/hooks/useGameSettings'
import { Modal, NiceButton } from '@components'
import { Button } from '@/components/forms'
import { FaCheck } from 'react-icons/fa'
import clsx from 'clsx'

interface CategoryOption {
  id: Category
  name: string
  description: string
}

const categories: CategoryOption[] = [
  {
    id: 'animals',
    name: 'Animales',
    description: 'Criaturas vivas del reino animal',
  },
  {
    id: 'objects',
    name: 'Objetos',
    description: 'Cosas físicas que usamos diariamente',
  },
  {
    id: 'places',
    name: 'Lugares',
    description: 'Ubicaciones geográficas y edificios',
  },
  {
    id: 'develop',
    name: 'Desarrollo',
    description: 'Términos de programación y tecnología',
  },
]

const CategoriesModal = NiceModal.create(() => {
  const modal = useModal()
  const { gameSettings, updateCategories } = useGameSettings()
  const selectedCategories = gameSettings.categories

  const handleCategoryToggle = (categoryId: Category) => {
    const isSelected = selectedCategories.includes(categoryId)
    let newCategories: Category[]

    if (isSelected) {
      // No permitir deseleccionar si es la última categoría
      // if (selectedCategories.length <= 1) {
      //   return
      // }
      newCategories = selectedCategories.filter(id => id !== categoryId)
    } else {
      newCategories = [...selectedCategories, categoryId]
    }

    updateCategories(newCategories)
  }

  const handleSave = () => {
    modal.remove()
  }

  return (
      <Modal show={modal.visible} onClose={() => modal.remove()}>
        <Modal.Header>
          <b>Seleccionar Categorías</b>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Elige las categorías de palabras para el juego
            </p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id)

                return (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryToggle(category.id)}
                        className={clsx([
                          'w-full p-4 rounded-xl border-2 transition-all duration-200 text-left',
                          'hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]',
                          isSelected ? 'border-purple-600' : 'border-slate-200',
                        ])}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className={`font-semibold`}>
                              {category.name}
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                            <FaCheck className={`text-lg text-purple-600`}/>
                        )}
                      </div>
                    </button>
                )
              })}
            </div>
          </div>
          <div className="mt-4">
              {selectedCategories.length === 0 && (
                  <span className="text-sm text-amber-600 dark:text-amber-400 font-semibold">
                    Debes seleccionar al menos una categoría
                  </span>
              )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="max-w-full flex w-full justify-end gap-2">
            <Button variant="outline" color="neutral" size="lg" onClick={() => modal.remove()}>
              Cancelar
            </Button>
            <div>
              <NiceButton disabled={selectedCategories.length === 0} onClick={handleSave}>
                Confirmar
              </NiceButton>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
  )
})

export default CategoriesModal