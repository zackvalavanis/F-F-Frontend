import './Recipes.css'
import RecipeReviewCard from "../../components/RecipeCard"
import { useState, useEffect } from 'react'

interface Recipe {
  id: number;
  category: string;
  description: string;
  difficulty: number;
  ingredients: string;
  prep_time: number;
  rating: number;
  servings: number;
  tags: string;
  title: string;
  images?: string[];
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [category, setCategory] = useState('');

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"]

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND);
        const data = await res.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
    console.log("Selected category", event.target.value)
  }

  const handleSearch = () => {
    if (!category) {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter(r => r.category === category));
    }
  };

  return (
    <div className='recipes-page-container'>
      <div className='recipe-top-container'>
        <h1>Recipes</h1>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleChange}>
          <option value="">-- All --</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className='recipe-container'>
        {filteredRecipes.map((recipe) => (
          <RecipeReviewCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
