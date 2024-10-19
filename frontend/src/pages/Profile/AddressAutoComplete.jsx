import React, { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const AddressAutocomplete = ({ addresses, setAddresses }) => {
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);

  // 使用 useJsApiLoader 加载 Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`,
    libraries,
  });

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        const formattedAddress = place.formatted_address;
        const placeId = place.place_id;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // 提取城市、州和国家信息
        let city = "",
          state = "",
          country = "";
        for (const component of place.address_components) {
          if (component.types.includes("locality")) {
            city = component.long_name;
          } else if (component.types.includes("administrative_area_level_1")) {
            state = component.short_name;
          } else if (component.types.includes("country")) {
            country = component.long_name;
          }
        }

        const newAddress = {
          formattedAddress,
          placeId,
          lat,
          lng,
          city,
          state,
          country,
        };

        if (
          addresses.length < 3 &&
          !addresses.some((addr) => addr.placeId === placeId)
        ) {
          setAddresses([...addresses, newAddress]);
        }

        setAddress("");
      }
    }
  };

  const handleRemoveAddress = (e, placeId) => {
    e.preventDefault(); // 止事件冒泡和默认行为
    e.stopPropagation();
    setAddresses(addresses.filter((addr) => addr.placeId !== placeId));
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder={
            addresses.length >= 3
              ? "You can only put 3 addresses max"
              : "Around where are you gonna take photos?"
          }
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white mb-2"
          disabled={addresses.length >= 3}
        />
      </Autocomplete>
      <ul className="list-none p-0 flex flex-wrap gap-2">
        {addresses.map((addr, index) => (
          <li
            key={index}
            className="flex items-center bg-blue-500 text-white p-2 rounded-full text-sm"
          >
            <span className="mr-2">{addr.formattedAddress}</span>
            <button
              onClick={(e) => handleRemoveAddress(e, addr.placeId)}
              className="bg-white text-red-500 rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-100"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressAutocomplete;
