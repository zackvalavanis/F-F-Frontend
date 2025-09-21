import { Button } from '@mui/material'
import './RecipesShow.css'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

interface Recipe {
  id: number
  category: string
  description: string
  difficulty: number
  ingredients: string
  prep_time: number
  cook_time: number
  rating: number
  servings: number
  tags: string
  title: string
  images?: string[]
}

export function RecipesShow() {
  const location = useLocation()
  const recipe = location.state as Recipe
  const navigate = useNavigate()
  const backend = import.meta.env.VITE_BACKEND_HOST

  const handleDeleteRecipe = async () => {
    try {
      const res = await fetch(`${backend}/recipes/${recipe.id}.json`, {
        method: 'DELETE', // <- important!
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('deleting recipe')
      console.log('recipe has been deleted', res)
      navigate('/')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='recipe-show-container'>
      <h1>{recipe.title}</h1>
      <img src={recipe.images ? recipe?.images[0] : ''} />
      <Button
        onClick={handleDeleteRecipe}
      > Delete Recipe


      </Button>

    </div>
  )
}