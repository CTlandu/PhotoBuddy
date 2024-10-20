import React, { useEffect, useRef, useState } from "react";
import { loadGoogleMapsApi } from "../../utils/googleMapsLoader";

const CitySearch = ({ onCityChange }) => {
  const autocompleteRef = useRef(null);
  const dropdownRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [popularCities, setPopularCities] = useState([]);
  const [showPopularCities, setShowPopularCities] = useState(false);

  useEffect(() => {
    loadGoogleMapsApi().then(() => {
      setIsLoaded(true);
    });
    fetchPopularCities();

    // 添加点击事件监听器
    document.addEventListener("mousedown", handleClickOutside);

    // 清理函数
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !autocompleteRef.current.contains(event.target)
    ) {
      setShowPopularCities(false);
    }
  };

  const fetchPopularCities = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/popularCities`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPopularCities(
        data.slice(0, 5).map((city) => ({
          displayName: city.split(",")[0].trim(),
          fullName: city,
        }))
      );
    } catch (error) {
      console.error("Error fetching popular cities:", error);
    }
  };

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
          setInputValue(formattedCity);
          onCityChange(formattedCity);
          setShowPopularCities(false);
        }
      });
    }
  }, [isLoaded, onCityChange]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      onCityChange("");
      setShowPopularCities(true);
    } else {
      setShowPopularCities(false);
    }
  };

  const handleClearCity = () => {
    setInputValue("");
    onCityChange("");
    setShowPopularCities(true);
  };

  const handlePopularCityClick = (city) => {
    setInputValue(city.fullName);
    onCityChange(city.fullName);
    setShowPopularCities(false);
  };

  return (
    <div className="flex items-center w-full sm:w-auto relative">
      <label htmlFor="city-search" className="font-bold mr-2 whitespace-nowrap">
        Search City:
      </label>
      <div className="relative flex-grow">
        <input
          ref={autocompleteRef}
          id="city-search"
          type="text"
          placeholder="Enter a city"
          className="input input-bordered input-sm w-full"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowPopularCities(true)}
        />
        {inputValue && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={handleClearCity}
          >
            ✕
          </button>
        )}
        {showPopularCities && popularCities.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg"
          >
            <div className="px-4 py-2 bg-gray-100 font-semibold text-sm">
              🔥Popular Searches
            </div>
            <ul>
              {popularCities.map((city, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => handlePopularCityClick(city)}
                >
                  <span className="mr-2 text-gray-500 font-semibold">
                    {index + 1}
                  </span>
                  {city.displayName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CitySearch;
