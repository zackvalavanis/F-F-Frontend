// src/components/Context/LocationContext.tsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';

interface LocationContextType {
  currentLocation: GeolocationCoordinates | null;
  getLocation: () => void;
  startTracking: () => void;
  stopTracking: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported in your browser");
      return;
    }

    navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
      if (permissionStatus.state === 'denied') {
        alert('Please allow location access.');
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation(position.coords);
            // console.log('User location:', position.coords);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported in your browser');
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation(position.coords);
        // console.log('Updated location:', position.coords);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
    );

    setWatchId(id);
  };

  useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, []);

  return (
    <LocationContext.Provider value={{ currentLocation, getLocation, startTracking, stopTracking }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook for easy access
export const useCurrentLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
