import './RecipesShow.css'
import { useLocation } from 'react-router-dom'

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

  console.log(recipe)

  return (
    <div className='recipe-show-container'>
      <h1>{recipe.title}</h1>
      <img src={recipe.images ? recipe?.images[0] : ''} />


    </div>
  )
}