import './Recipes.css'
import RecipeReviewCard from "../../components/RecipeCard"

export function Recipes() {



  const handleShow = () => {
    console.log('you clicked it yo')
  }

  return (
    <div className='recipes-page-container'>

      <div className='recipe-container' onClick={handleShow}>
        <RecipeReviewCard />
      </div>

    </div>
  )

}









