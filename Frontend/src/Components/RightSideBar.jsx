import React from 'react'
import { FaSearch, FaCog, FaRegBell } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'

function RightSideBar() {
  return (
    <div className='w-[28%] p-4 space-y-4 border border-gray-200 rounded-2xl'>
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
          {[1, 2, 3,4].map((item) => (
            <div key={item} className="flex items-center justify-between hover:bg-gray-100 p-3 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-3">
                <img
                  src="https://yt3.ggpht.com/GSnaFZ86L70rVwVe1PpfI6srCKQgvmS74Evw8ld4MTK9uXGn3jxb_eTIB5JJPXtSNxv78RuFuw=s88-c-k-c0x00ffffff-no-rj"
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="  font-bold">User Name</p>
                  <p className="text-gray-500">@username</p>
                </div>
              </div>
              <div>
              <button className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800">
                Profile
              </button>
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