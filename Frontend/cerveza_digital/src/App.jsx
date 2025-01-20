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
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Flowbite>
  )
}

export default App
