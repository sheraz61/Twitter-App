import React from 'react'
import { FaSearch, FaCog, FaRegBell } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
function RightSideBar({otherUsers}) {
  return (
    <div className='w-1/4 p-4 space-y-4 border border-gray-200 rounded-2xl sticky top-0 h-screen overflow-y-auto bg-white hidden md:block'>
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search Twitter"
          className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Who to follow Section */}
      <div className="bg-gray-200 rounded-2xl p-4 ">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        <div className="space-y-4">
          {otherUsers?.map((user) => (
            <div key={user?._id} className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <img
                  src="https://picsum.photos/200"
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="  font-bold">{user?.name}</p>
                  <p className="text-gray-500">{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
              <button className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800">
                Profile
              </button>
                </Link>
              </div>
            </div>
          ))}
          <button className="text-blue-500 hover:text-blue-600 text-sm">
            Show more
          </button>
        </div>
      </div>

     
    </div>
  )
}

export default RightSideBar