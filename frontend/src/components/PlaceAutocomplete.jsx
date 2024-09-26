import React, { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const PlaceAutocomplete = () => {
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place) {
      const lat = place.geometry.location.lat(); // 获取纬度
      const lng = place.geometry.location.lng(); // 获取经度
      console.log("Latitude:", lat, "Longitude:", lng);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA2ck6upso-KwbZjTrtDW54vSlZDWjDA6I" // 替换为你的 API Key
      libraries={libraries}
    >
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="输入地点"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "300px", padding: "10px" }}
        />
      </Autocomplete>
    </LoadScript>
  );
};

export default PlaceAutocomplete;
