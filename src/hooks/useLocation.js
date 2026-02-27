import { useState, useEffect } from "react";

export default function useLocation() {
  const [location, setLocation] = useState(
    localStorage.getItem("userLocation") || "Select Location"
  );
  const [loading, setLoading] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=en`
            );

            const data = await res.json();

            // Extract city from display_name (always English)
            const locationParts = data.display_name.split(",");

            const detectedCity = locationParts[0]; // First part is usually city

            localStorage.setItem("userLocation", detectedCity);
            setCity(detectedCity);
        } catch (err) {
          console.error(err);
        }

        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  };

  return { location, detectLocation, loading };
}