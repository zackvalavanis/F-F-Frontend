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
  directions: string;
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
        method: 'DELETE',
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

  const total_time = recipe.prep_time + recipe.cook_time

  return (
    <div className='recipe-show-container'>
      <h1>{recipe.title}</h1>
      <p>Prep-Time: {recipe.prep_time} Minutes</p>
      <p>Cook Time: {recipe.cook_time} Minutes</p>
      <p>Time to Eat: {total_time} minutes</p>
      <img
        style={{ height: '500px', width: '500px' }}
        src={recipe.images ? recipe?.images[0] : ''}
      />
      <div style={{ display: 'flex', width: '1000px', alignItems: 'center', flexDirection: 'column' }}>
        <p style={{ fontSize: '20px' }}>{recipe.description}</p>
      </div>

      <div>
        <h1 style={{ textAlign: 'center' }}>Ingredients</h1>
        <ul>
          {recipe.ingredients
            ?.split(/,/)              // split at commas
            .map(i => i.trim())
            .filter(Boolean)
            .map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
        </ul>
      </div>

      <div>
        <h1 style={{ textAlign: 'center' }}>Directions</h1>
        <ol>
          {recipe.directions
            .split('.')
            .map(step => step.trim())
            .filter(step => step.length > 0)
            .map((step, index) => (
              <li key={index}>{step}</li>
            ))}
        </ol>
      </div>







      <Button
        onClick={handleDeleteRecipe}
      > Delete Recipe


      </Button>

    </div>
  )
}