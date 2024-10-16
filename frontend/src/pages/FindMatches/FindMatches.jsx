import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../../components/Navbar";
import ProfileCard from "./ProfileCard";
import SlowLoadBanner from "./SlowLoadBanner";

function FindMatches({ token }) {
  const [profiles, setProfiles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("model");
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const profilesPerPage = 6;

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    fetchProfiles(role);
    setCurrentPage(0);
  };

  const fetchProfiles = async (role) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_DOMAIN}/api/fetchAll?role=${role}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProfiles(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(selectedRole);
  }, [selectedRole]);

  const displayProfiles = profiles.slice(
    currentPage * profilesPerPage,
    (currentPage + 1) * profilesPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-base-200">
        <div className="top-0 left-0 w-full z-50">
          <Navbar token={token} />
        </div>
        <SlowLoadBanner />
        <div className="flex mt-16 justify-center bg-base">
          <div className="font-bold flex items-center mr-5">Find:</div>
          <button
            className={`btn mr-5 ${
              selectedRole === "model" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleRoleSelection("model")}
          >
            Model
          </button>
          <button
            className={`btn ml-5 ${
              selectedRole === "photographer" ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handleRoleSelection("photographer")}
          >
            Photographer
          </button>
        </div>

        <div className="grid gap-6 mt-16 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!isLoading &&
            displayProfiles.map((profile, index) => (
              <div key={index} className="p-2">
                <ProfileCard
                  profile={profile}
                  isLoading={isLoading}
                  modal_index={`modal-${index}`}
                  role={selectedRole}
                />
              </div>
            ))}
        </div>

        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(profiles.length / profilesPerPage)}
            onPageChange={handlePageClick}
            containerClassName={
              "pagination flex justify-center items-center space-x-2"
            }
            activeClassName={
              "active bg-blue-500 text-white rounded-lg px-3 py-1"
            }
            pageClassName={"page-item rounded-md"}
            pageLinkClassName={
              "page-link text-white hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg"
            }
            previousClassName={"page-item"}
            previousLinkClassName={
              "btn btn-outline text-blue-500 border-blue-500 hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg"
            }
            nextClassName={"page-item"}
            nextLinkClassName={
              "btn btn-outline text-green border-green hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg"
            }
            breakLabel={"..."}
            breakClassName={"break-me text-blue-500"}
          />
        </div>
      </div>
    </>
  );
}

export default FindMatches;
