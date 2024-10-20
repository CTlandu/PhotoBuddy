import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import SlowLoadBanner from "./SlowLoadBanner";
import RoleSelector from "./RoleSelector";
import CitySearch from "./CitySearch";
import ProfileGrid from "./ProfileGrid";
import Pagination from "./Pagination";
import NoProfilesPrompt from "./NoProfilesPrompt";

function FindMatches({ token }) {
  const [profiles, setProfiles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("model");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const profilesPerPage = 6;

  const fetchProfiles = async (role, city = "") => {
    setIsLoading(true);
    try {
      const cityQuery = city ? `&city=${encodeURIComponent(city)}` : "";
      const response = await fetch(
        `${
          import.meta.env.VITE_API_DOMAIN
        }/api/fetchAll?role=${role}${cityQuery}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setProfiles(data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(selectedRole, selectedCity);
  }, [selectedRole, selectedCity]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setCurrentPage(0);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setCurrentPage(0);
  };

  const displayProfiles = profiles.slice(
    currentPage * profilesPerPage,
    (currentPage + 1) * profilesPerPage
  );

  return (
    <>
      <div className="top-0 left-0 w-full z-50">
        <Navbar token={token} />
      </div>
      <div className="min-h-screen flex flex-col items-center bg-base-200">
        <SlowLoadBanner />
        <div className="flex flex-col items-center mt-16 bg-base w-full max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 w-full">
            <RoleSelector
              selectedRole={selectedRole}
              onRoleChange={handleRoleChange}
            />
            <CitySearch onCityChange={handleCityChange} />
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center mt-16">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : profiles.length > 0 ? (
          <>
            <ProfileGrid
              profiles={displayProfiles}
              selectedRole={selectedRole}
            />
            <Pagination
              pageCount={Math.ceil(profiles.length / profilesPerPage)}
              currentPage={currentPage}
              onPageChange={(selected) => setCurrentPage(selected)}
            />
          </>
        ) : (
          <NoProfilesPrompt city={selectedCity} selectedRole={selectedRole} />
        )}
      </div>
    </>
  );
}

export default FindMatches;
