import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { AppContext } from 'src/context/app.context'
import useRouteElements from 'src/useRouteElement'
import { localStorageEventTarget } from 'src/utils/auth'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      <div>{routeElements}</div>
      <ToastContainer />
    </>
  )
}

export default App
