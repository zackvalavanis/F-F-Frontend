import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Header } from './screens/Header/Header'
import { Footer } from './screens/Footer/Footer'
import { LandingPage } from './screens/LandingPage/LandingPage'
import { Login } from './screens/Auth/Login'
import { Recipes } from './screens/Recipes/Recipes'
import { Favorites } from './screens/Favorites/Favorites'
import { Story } from './screens/Story/Story'
import { RecipesShow } from './screens/Recipes/RecipesShow'
import { NewRecipe } from './screens/Recipes/NewRecipe'

function App() {
  const router = createBrowserRouter([
    {
      element: (
        <div>
          <Header />
          <Outlet />
          <Footer />
        </div>
      ),
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/login', element: <Login /> },
        { path: '/recipes', element: <Recipes /> },
        { path: '/recipes/:id', element: <RecipesShow /> },
        { path: '/favorites', element: <Favorites /> },
        { path: '/story', element: <Story /> },
        { path: '/new-recipe', element: <NewRecipe /> }
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
