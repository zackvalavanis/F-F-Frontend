import { useState, useEffect } from "react"

interface Recipe {
  id: number
  name: string
}

export function Recipes() {
  const [recipe, setRecipe] = useState<Recipe[]>([])
  const api = import.meta.env.VITE_BACKEND
  console.log(api)

  const handleIndex = async () => {
    try {
      const res = await fetch(api)

      const data = await res.json()
      setRecipe(data)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleIndex()
  }, [])




  return (
    <div>
      <h1>Recipes</h1>
    </div>
  )
}