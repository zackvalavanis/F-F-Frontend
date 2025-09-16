import { useState, useEffect } from "react"
import loadingGif from '../../assets/Loading_icon.gif'

interface Recipe {
  id: number
  category: string
  description: string
  difficulty: number
  ingredients: string
  prep_time: number
  rating: number
  servings: number
  tags: string
  title: string
}

export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const api = import.meta.env.VITE_BACKEND
  const [loading, setLoading] = useState(false)
  console.log(api)

  const handleIndex = async () => {
    setLoading(true)
    try {
      const res = await fetch(api)

      const data = await res.json()
      setLoading(false)
      setRecipes(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleIndex()
  }, [])

  if (loading) return <div><img src={loadingGif} alt="Loading..." /></div>


  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h1>{recipe.title}</h1>
        </div>
      ))}
    </div>
  )
}