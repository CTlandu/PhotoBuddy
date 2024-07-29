import React from "react";

const PersonalForm = () => {


  return (
    <div className="bg-white p-6 w-1/2 rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-8 text-center">Personal Info</h2>
    <form>
      <div className="mb-4"> 
        {/* 头像 */}
        <div className="avatar flex justify-center">  
          <div className="w-24 rounded-full scale-125">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div className="mb-6">
        {/* 把三个信息并排显示 */}
        <div className="flex flex-row justify-between items-center">
          <div>
            <label htmlFor="perferedName" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Preferred Name
            </label>
            <input type="text" id="perferedName" className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Last Name
            </label>
            <input type="text" id="lastName" className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>
          <div>
            <label htmlFor="pronouns" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
              Pronouns
            </label>
            <input type="text" id="pronouns" className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
            Email
          </label>
          <input type="text" id="email" className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
        </div>

        <div>
          <label htmlFor="birthday" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
            Birthday
          </label>
          <input type="date" id="birthday" className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
        </div>

        <div>
          <label htmlFor="zipcode" className="block text-gray-700 text-sm font-bold mb-2 mt-2">
            Zipcode
          </label>
          <input type="number" id="zipcode" className="border rounded w-full py-2 px-3 leading-tight bg-dark-gray" />
        </div>

      </div>
  
      {/* Other input fields */}
    </form>
  </div>
  );
}

export default PersonalForm;