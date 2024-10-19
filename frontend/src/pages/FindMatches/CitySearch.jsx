import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMapsApi } from "../../utils/googleMapsLoader";

const CitySearch = ({ onCityChange }) => {
  const autocompleteRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsApi().then(() => {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (
      isLoaded &&
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["(cities)"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.address_components) {
          let city = "",
            state = "",
            country = "";
          for (const component of place.address_components) {
            if (component.types.includes("locality")) {
              city = component.long_name;
            } else if (
              component.types.includes("administrative_area_level_1")
            ) {
              state = component.short_name;
            } else if (component.types.includes("country")) {
              country = component.long_name;
            }
          }

          const formattedCity = [city, state, country]
            .filter(Boolean)
            .join(", ");
          console.log("Selected city:", formattedCity);
          setInputValue(formattedCity);
          onCityChange(formattedCity);
        }
      });
    }
  }, [isLoaded, onCityChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      onCityChange("");
    }
  };

  const handleClearCity = () => {
    setInputValue("");
    onCityChange("");
  };

  return (
    <div className="flex items-center mt-4">
      <label htmlFor="city-search" className="mr-2 font-bold">
        Search Cities:
      </label>
      <div className="relative">
        <input
          ref={autocompleteRef}
          id="city-search"
          type="text"
          placeholder="Enter a city"
          className="input input-bordered w-full max-w-xs pr-10"
          value={inputValue}
          onChange={handleInputChange}
        />
        {inputValue && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={handleClearCity}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default CitySearch;
