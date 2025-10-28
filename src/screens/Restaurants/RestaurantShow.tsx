import type { Key } from 'react';
import { useLocation } from 'react-router-dom';
import './RestaurantShow.css';

interface Restaurant {
  name: string;
  category?: string;
  images?: string[];
  address?: string;
  city?: string;
  state?: string;
  description?: string;
  food_type?: string;
  kid_friendly?: boolean;
  rating?: number;
  price?: string;
  vegan_friendly?: boolean;
  opening_hours?: string;
  website?: string;
  phone_number?: string;
  parking?: string;
}

export function RestaurantShow() {
  const location = useLocation();
  const restaurant = location.state as Restaurant | undefined;

  if (!restaurant) {
    return <p className="error-message">Restaurant data not found. Please go back.</p>;
  }

  return (
    <div className="restaurant-show-page">
      <header className="restaurant-header">
        <h1 className="restaurant-name">{restaurant.name}</h1>
        {restaurant.category && <h2 className="restaurant-category">{restaurant.category}</h2>}
      </header>

      <section className="restaurant-images">
        {restaurant.images && restaurant.images.length > 0 ? (
          restaurant.images.map((url: string, index: Key) => (
            <div key={index} className="restaurant-image-wrapper">
              <img
                src={url}
                alt={`${restaurant.name} image ${Number(index) + 1}`}
                className="restaurant-image"
              />
            </div>
          ))
        ) : (
          <p className="no-images">No images available</p>
        )}
      </section>

      <section className="restaurant-info">
        <p><strong>Address:</strong> {restaurant.address}</p>
        <p>
          {restaurant.city && restaurant.state && (
            <>
              <strong>Location:</strong> {restaurant.city}, {restaurant.state}
            </>
          )}
        </p>
        {restaurant.description && <p><strong>Description:</strong> {restaurant.description}</p>}
        {restaurant.food_type && <p><strong>Food Type:</strong> {restaurant.food_type}</p>}
        <p><strong>Kid Friendly:</strong> {restaurant.kid_friendly ? 'Yes' : 'No'}</p>
        {restaurant.rating && <p><strong>Rating:</strong> {restaurant.rating} / 5</p>}
        {restaurant.price && <p><strong>Price:</strong> {restaurant.price}</p>}
        <p><strong>Vegan Friendly:</strong> {restaurant.vegan_friendly ? 'Yes' : 'No'}</p>
        {restaurant.opening_hours && <p><strong>Hours:</strong> {restaurant.opening_hours}</p>}
        {restaurant.phone_number && <p><strong>Phone:</strong> {restaurant.phone_number}</p>}
        {restaurant.parking && <p><strong>Parking:</strong> {restaurant.parking}</p>}
      </section>

      {restaurant.website && (
        <section className="restaurant-website">
          <a
            href={
              restaurant.website.startsWith('http')
                ? restaurant.website
                : `https://${restaurant.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="restaurant-link"
          >
            Visit Website
          </a>
        </section>
      )}
    </div>
  );
}
