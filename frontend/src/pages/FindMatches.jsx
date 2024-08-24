import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ModelCard from '../components/ModelCard';
import ReactPaginate from 'react-paginate';
import PhotographerCard from '../components/PhotographerCard';

function FindMatches({ token}) {
  const [modelProfiles, setModelProfiles] = useState([]);
  const [photographerProfiles, setPhotographerProfiles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('model'); // 默认选中 model
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const profilesPerPage = 6; // 每页展示的 Profile Card 数量

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    fetchProfiles(role);
    setCurrentPage(0); // 切换角色时重置当前页
  };

  const fetchProfiles = async (role) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/fetchAll?role=${role}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (role === 'model') {
        setModelProfiles(data);
        setIsLoading(false);
      } else if (role === 'photographer') {
        setPhotographerProfiles(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };


  useEffect(() => {
    fetchProfiles(selectedRole); // 页面加载时根据默认角色获取数据
  }, [selectedRole]);

  // 计算当前页显示的 profiles
  const displayProfiles = (selectedRole === 'model' ? modelProfiles : photographerProfiles).slice(
    currentPage * profilesPerPage,
    (currentPage + 1) * profilesPerPage
  );

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-base-200">
        <Navbar token={token}/>
        <div className="flex mt-16 justify-center bg-base">
          <div className='font-bold flex items-center mr-5'>Find:</div>
          <button
            className={`btn mr-5 ${selectedRole === 'model' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleRoleSelection('model')}
          >
            Model
          </button>
          <button
            className={`btn ml-5 ${selectedRole === 'photographer' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleRoleSelection('photographer')}
          >
            Photographer
          </button>
        </div>

        {/* 自适应排列 */}
        <div className="grid gap-6 mt-16 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayProfiles.map((profile, index) => (
            <div key={index} className="p-2">
              {
                selectedRole === 'model' ?
                <ModelCard fetched_profile={profile} isLoading={isLoading} modal_index={`modal-${index}`} /> :
                <PhotographerCard fetched_profile={profile} isLoading={isLoading} modal_index={`modal-${index}`} />
              }
            </div>
          ))}
        </div>

        {/* 分页控件 */}
        <div className="flex justify-center mt-8">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={Math.ceil((selectedRole === 'model' ? modelProfiles.length : photographerProfiles.length) / profilesPerPage)}
            onPageChange={handlePageClick}
            containerClassName={'pagination flex justify-center items-center space-x-2'}
            activeClassName={'active bg-blue-500 text-white rounded-lg px-3 py-1'}
            pageClassName={'page-item rounded-lg'}
            pageLinkClassName={'page-link text-blue-500 hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg'}
            previousClassName={'page-item'}
            previousLinkClassName={'btn btn-outline text-blue-500 border-blue-500 hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg'}
            nextClassName={'page-item'}
            nextLinkClassName={'btn btn-outline text-green border-green hover:bg-blue-100 transition-colors duration-200 px-3 py-1 rounded-lg'}
            breakLabel={'...'}
            breakClassName={'break-me text-blue-500'}
          />
        </div>


      </div>
    </>
  );
}

export default FindMatches;
