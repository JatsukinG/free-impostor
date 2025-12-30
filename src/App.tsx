import NiceModal from '@ebay/nice-modal-react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'

function App() {
  return (
      <NiceModal.Provider>
        <RouterProvider router={router}/>
      </NiceModal.Provider>
  )
}

export default App
