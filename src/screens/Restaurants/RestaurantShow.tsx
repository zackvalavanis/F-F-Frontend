import { useEffect, useState, type Key } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RestaurantShow.css';
import { Button } from '@mui/material';
import { useCurrentLocation } from '../../components/Context/get_user_location.tsx';
import getDistance from 'geolib/es/getDistance';

interface Restaurant {
  id: number,
  name: string;
  category?: string;
  images?: string[]; // Rails ActiveStorage redirect URLs
  address?: string;
  city?: string;
  state?: string;
  description?: string;
  food_type?: string;
  kid_friendly?: boolean;
  rating?: number;
  price?: string | number;
  vegan_friendly?: boolean;
  opening_hours?: string;
  website?: string;
  phone_number?: string;
  parking?: string;
  latitude: number;
  longitude: number
}

export function RestaurantShow() {
  const api = import.meta.env.VITE_BACKEND_HOST
  const location = useLocation();
  const restaurant = location.state as Restaurant | undefined;
  console.log(restaurant);
  const navigate = useNavigate()
  const { currentLocation } = useCurrentLocation();
  console.log('my current location', currentLocation)
  const [milesAway, setMilesAway] = useState<string>('')

  useEffect(() => {

    if (currentLocation && restaurant?.latitude && restaurant?.longitude) {
      const distanceMeters = getDistance(
        { latitude: restaurant.latitude, longitude: restaurant.longitude },
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude }
      );
      const distMiles = distanceMeters * 0.00062137
      const fixed = distMiles.toFixed(2)
      setMilesAway(fixed)

      // const distanceKm = distanceMeters / 1000; // convert to km
      console.log('Distance to restaurant:', distMiles.toFixed(2), 'miles');
    }
  }, [currentLocation, restaurant]);

  if (!restaurant) {
    return <p className="error-message">Restaurant data not found. Please go back.</p>;
  }

  // Helper to make sure Rails image URLs are absolute
  const getImageUrl = (url: string) => {
    if (url.startsWith('http')) return url;
    // Replace with your Rails API host & port
    return `${api}${url}`;
  };

  const handleDeleteRestaurant = async (id: number) => {
    console.log(id)
    try {
      const res = await fetch(`${api}/restaurants/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        console.log('Restaurant being removed')
        navigate('/restaurants')
      }
      console.log(res)
    } catch (error) {
      console.error('there was an error', error)
    }
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
                src={getImageUrl(url)}
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
        {restaurant.address && <p><strong>Address:</strong> {restaurant.address}</p>}
        {restaurant.city && restaurant.state && (
          <p><strong>Location:</strong> {restaurant.city}, {restaurant.state}</p>
        )}
        {milesAway && <p><strong>Distance from you:</strong> {milesAway} Miles Away</p>}
        {restaurant.description && <p><strong>Description:</strong> {restaurant.description}</p>}
        {restaurant.food_type && <p><strong>Food Type:</strong> {restaurant.food_type}</p>}
        <p><strong>Kid Friendly:</strong> {restaurant.kid_friendly ? 'Yes' : 'No'}</p>
        {restaurant.rating !== undefined && <p><strong>Rating:</strong> {restaurant.rating} / 5</p>}
        {restaurant.price !== undefined && <p><strong>Price:</strong> {restaurant.price}</p>}
        <p><strong>Vegan Friendly:</strong> {restaurant.vegan_friendly ? 'Yes' : 'No'}</p>
        {restaurant.opening_hours && <p><strong>Hours:</strong> {restaurant.opening_hours}</p>}
        {restaurant.phone_number && <p><strong>Phone:</strong> {restaurant.phone_number}</p>}
        {restaurant.parking && <p><strong>Parking:</strong> {restaurant.parking}</p>}
      </section>

      <Button
        onClick={() => handleDeleteRestaurant(restaurant.id)}
      >
        Delete
      </Button>

      {restaurant.website && (
        <section className="restaurant-website">
          <a
            href={restaurant.website.startsWith('http') ? restaurant.website : `https://${restaurant.website}`}
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
