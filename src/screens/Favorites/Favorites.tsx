import { useEffect, useState } from "react";
import './Favorites.css';
import RecipeReviewCard from "../../components/RecipeCard";

interface Recipe {
  id: number;
  category: string;
  description: string;
  difficulty: number;
  ingredients: string;
  prep_time: number;
  cook_time: number;
  rating: number;
  servings: number;
  tags: string;
  title: string;
  images?: string[]; // URLs from backend
  directions: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND);
        const data: Recipe[] = await res.json();
        setFavorites(data.filter(r => r.rating >= 8));
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className='favorites-page'>
      <h1 style={{ color: '#ff7043', marginBottom: '40px' }}>Our Favorite Recipes</h1>
      <div className='recipe-container-favorites'>
        {favorites.map(favorite => (
          <RecipeReviewCard key={favorite.id} recipe={favorite} />
        ))}
      </div>
    </div>
  );
}
