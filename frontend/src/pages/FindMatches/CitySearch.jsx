import React, { useEffect, useRef } from "react";

const CitySearch = ({ onCityChange }) => {
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    if (autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["(cities)"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          onCityChange(place.formatted_address);
        }
      });
    }
  };

  return (
    <div className="flex items-center mt-4">
      <label htmlFor="city-search" className="mr-2 font-bold">
        Search City:
      </label>
      <input
        ref={autocompleteRef}
        id="city-search"
        type="text"
        placeholder="Enter a city"
        className="input input-bordered w-full max-w-xs"
      />
    </div>
  );
};

export default CitySearch;
