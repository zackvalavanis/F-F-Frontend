import { useEffect } from "react";

export function RestaurantShow() {
  const api = import.meta.env.VITE_BACKEND_HOST

  const handleSeeRestaurant = async (id: number) => {

    try {
      const res = await fetch(`${api}/restaurants/${id}.json`);
      console.log(res)
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleSeeRestaurant(1); // Pass a valid restaurant ID here
  }, [])

  return (
    <>



    </>
  )
}