import { Navigations } from './router'
import { Flowbite } from "flowbite-react"
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context'

function App() {
  return (
    <Flowbite>
      <AuthProvider>
        <Navigations />

        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover={true}
        />
      </AuthProvider>
    </Flowbite>
  )
}

export default App
