import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Header } from './screens/Header/Header'
import { Footer } from './screens/Footer/Footer'
import { LandingPage } from './screens/LandingPage/LandingPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      element: (
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      ),
      children: [

      ]
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
