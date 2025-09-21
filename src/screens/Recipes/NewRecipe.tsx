import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import './NewRecipe.css';

interface Recipe {
  id?: number;
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
  images?: File[];
  directions: string;
}

export function NewRecipe() {
  const [category, setCategory] = useState<string>('')
  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"]

  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategory(value);
    setFormData(prev => ({
      ...prev,
      category: value
    }));
    console.log("Selected category", value);
  };


  const [formData, setFormData] = useState<Recipe>({
    category: "",
    description: "",
    difficulty: 1,
    ingredients: "",
    prep_time: 0,
    cook_time: 0,
    rating: 1,
    servings: 1,
    tags: "",
    title: "",
    images: [],
    directions: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: Array.from(e.target.files)
      }));
    }
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "images" && formData.images) {
        formData.images.forEach((file) => data.append("images[]", file));
      } else {
        data.append(key, (formData as any)[key]);
      }
    }

    try {
      const res = await fetch(import.meta.env.VITE_BACKEND_HOST + "/recipes", {
        method: "POST",
        body: data
      });
      const json = await res.json();
      console.log("Recipe created:", json);
      // Optionally reset form
      setFormData({
        category: "",
        description: "",
        difficulty: 1,
        ingredients: "",
        prep_time: 0,
        cook_time: 0,
        rating: 1,
        servings: 1,
        tags: "",
        title: "",
        images: [],
        directions: ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="new-recipe-container">
      <h1 style={{ display: 'flex', justifyContent: 'center', color: '#f37136' }}>Create a New Recipe</h1>
      <form onSubmit={handleCreate} className="new-recipe-form">
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleChangeCategory}>
          <option value="">-- Select a category --</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>


        <label>
          Ingredients:
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            placeholder="Enter each ingredient on a new line"
          />
        </label>

        <label>
          Directions:
          <textarea
            name="directions"
            value={formData.directions}
            onChange={handleChange}
            placeholder="Enter each step on a new line"
          />
        </label>

        <label>
          Prep Time (min):
          <input type="number" name="prep_time" value={formData.prep_time} onChange={handleChange} />
        </label>

        <label>
          Cook Time (min):
          <input type="number" name="cook_time" value={formData.cook_time} onChange={handleChange} />
        </label>

        <label>
          Servings:
          <input type="number" name="servings" value={formData.servings} onChange={handleChange} />
        </label>

        <label>
          Difficulty (1-5):
          <input type="number" name="difficulty" min={1} max={5} value={formData.difficulty} onChange={handleChange} />
        </label>

        <label>
          Rating (1-10):
          <input type="number" name="rating" min={1} max={10} value={formData.rating} onChange={handleChange} />
        </label>

        <label>
          Tags (comma separated):
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
        </label>

        <label>
          Images:
          <input type="file" multiple onChange={handleFileChange} accept="image/*" />
        </label>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}
