import React, { useState, useRef, useEffect } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const libraries = ["places"];

const AddressAutocomplete = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState("");
  const autocompleteRef = useRef(null);

  // 使用 useJsApiLoader 加载 Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAb93DCAS5kRcLsqtkJ3gjqYsz7gQcorXY", // 替换为你的 API Key
    libraries,
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_DOMAIN}/api/profile/address`,
          { params: { id: userId } }
        );
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        const formattedAddress = place.formatted_address;
        const placeId = place.place_id;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log("Place details:", { formattedAddress, placeId, lat, lng });

        const newAddress = { formattedAddress, placeId, lat, lng };

        if (
          addresses.length < 3 &&
          !addresses.some((addr) => addr.placeId === placeId)
        ) {
          handleAddAddress(newAddress);
        }

        setAddress(""); // 清空输入框
      }
    }
  };

  const handleAddAddress = async (newAddress) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_DOMAIN}/api/profile/address`,
        {
          id: userId, // 从 props 中获取用户 ID
          address: newAddress,
        }
      );
      console.log("Address added:", response.data);
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleRemoveAddress = async (placeId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_DOMAIN}/api/profile/address`,
        {
          data: {
            id: userId, // 从 props 中获取用户 ID
            placeId,
          },
        }
      );
      console.log("Address removed:", response.data);
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error removing address:", error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocompleteRef.current = autocomplete;
          console.log("Autocomplete loaded:", autocomplete);
        }}
        onPlaceChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder={
            addresses.length >= 3
              ? "You can only put 3 addresses max"
              : "Enter an address"
          }
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray text-white mb-2"
          disabled={addresses.length >= 3}
        />
      </Autocomplete>
      <ul className="list-none p-0">
        {addresses.map((addr, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-blue-500 text-white p-2 mb-1 rounded"
          >
            <span>{addr.formattedAddress}</span>
            <button
              onClick={() => handleRemoveAddress(addr.placeId)}
              className="text-red-500 hover:text-red-700 ml-2"
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
