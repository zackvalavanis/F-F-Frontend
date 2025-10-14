import type { Key } from 'react';
import './RestaurantShow.css'
import { useLocation } from 'react-router-dom'


export function RestaurantShow() {
  const location = useLocation()
  const restaurant = location.state;

  if (!restaurant) {
    return <p>Restaurant data not found. Please go back.</p>;
  }


  return (
    <div className='restaurant-show-page'>
      <h1>{restaurant.name}</h1>
      <h1>{restaurant.category}</h1>
      {restaurant.images && restaurant.images.length > 0 ? (
        restaurant.images.map((imageUrl: string | undefined, index: Key | null | undefined) => (
          <div key={index}>
            <img src={imageUrl} alt={`${restaurant.name} image ${Number(index) + 1}`} />
          </div>
        ))
      ) : (
        <p>No images available</p>
      )}
    </div>
  )
}