import './Recipes.css'
import RecipeReviewCard from "../../components/RecipeCard"
import { useState } from 'react'

export function Recipes() {
  const [category, setCategory] = useState<string>('')

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"]

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
    console.log("Selected category", event.target.value)
  }

  const handleSearch = () => {
    console.log('searching...')
  }


  return (
    <div className='recipes-page-container'>
      <div className='recipe-top-container'>
        <h1>Recipes</h1>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleChange}>
          <option value="">-- Select a category --</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className='recipe-container'>
        <RecipeReviewCard />
      </div>

    </div>
  )

}









