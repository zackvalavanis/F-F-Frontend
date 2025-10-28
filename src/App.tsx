import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { Header } from './screens/Header/Header'
import { Footer } from './screens/Footer/Footer'
import { LandingPage } from './screens/LandingPage/LandingPage'
import { Login } from './screens/Auth/Login'
import { Recipes } from './screens/Recipes/Recipes'
import { Favorites } from './screens/Favorites/Favorites'
import { Restaurants } from './screens/Restaurants/Restaurants'
import { RecipesShow } from './screens/Recipes/RecipesShow'
import { NewRecipe } from './screens/Recipes/NewRecipe'
import { Profile } from './screens/Profile/Profile'
import { UserProvider } from './components/Context/UserProvider'
import { LoadingScreen } from './screens/Loading/LoadingScreen'
import { RestaurantShow } from './screens/Restaurants/RestaurantShow'
import { SignUp } from './screens/Auth/SignUp'
import { CreateNewRestaurant } from './screens/Restaurants/CreateNewRestaurant'
import { FavoriteRestaurants } from './screens/Restaurants/FavoriteRestaurants'

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
        {
          path: '/recipes', element: (
            <Recipes
              onSearch={(query: string) => {
                console.log("Search query:", query);
              }}
            />
          )
        },
        { path: '/recipes/:id', element: <RecipesShow /> },
        { path: '/favorites', element: <Favorites /> },
        { path: '/restaurants', element: <Restaurants /> },
        { path: '/new-recipe', element: <NewRecipe /> },
        { path: '/profile/:id', element: <Profile /> },
        { path: '/restaurants/:id', element: <RestaurantShow /> },
        { path: '/create-restaurant', element: <CreateNewRestaurant /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/favorite-restaurants', element: <FavoriteRestaurants /> }
      ]
    },
    { path: '/loading', element: <LoadingScreen /> },
  ])


  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  )
}

export default App
