import React, { useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const libraries = ["places"];

const AddressAutocomplete = ({ addresses, setAddresses }) => {
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAb93DCAS5kRcLsqtkJ3gjqYsz7gQcorXY", // 替换为你的 API Key
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place) {
      const formattedAddress = place.formatted_address;
      const placeId = place.place_id;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      if (!addresses.some((addr) => addr.placeId === placeId)) {
        setAddresses([...addresses, { formattedAddress, placeId, lat, lng }]);
      }
      setAddress("");
    }
  };

  return (
    <Autocomplete
      onLoad={(autocomplete) => {
        autocompleteRef.current = autocomplete;
      }}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        type="text"
        placeholder="Enter an address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white mb-2"
      />
    </Autocomplete>
  );
};

export default AddressAutocomplete;
