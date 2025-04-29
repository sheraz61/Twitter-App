import React from 'react'
import { HiBookmark, HiHashtag, HiHome, HiLogout, HiUser } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";

function LeftSideBar() {
  return (
    <div className='w-[20%] border border-gray-500'>
      <div >
        <div>
          <img width={50} className='m-2' src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?ga=GA1.1.124665594.1745737047&semt=ais_hybrid&w=740" alt="X logo" />
        </div>
        <div className='my-4'>
          <div className='flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full  hover:cursor-pointer '>
            <HiHome size={'24px'} />
            <h1 className='font-bold text-lg'>Home</h1>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full  hover:cursor-pointer '>
            <HiHashtag size={'24px'} />
            <h1 className='font-bold text-lg'>Explore</h1>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full  hover:cursor-pointer '>
            <IoNotifications size={'24px'} />
            <h1 className='font-bold text-lg'>Notifications</h1>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full  hover:cursor-pointer '>
            <HiUser size={'24px'} />
            <h1 className='font-bold text-lg'>Profile</h1>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full  hover:cursor-pointer '>
            <HiBookmark size={'24px'} />
            <h1 className='font-bold text-lg'>Bookmarks</h1>
          </div>
          <div className='flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full  hover:cursor-pointer '>
            <HiLogout size={'24px'} />
            <h1 className='font-bold text-lg'>Logout</h1>
          </div>
          <button className='px-4 py-2 border-none text-lg bg-[#1D9BF0] my-2 hover:bg-[#45b0f7] hover:cursor-pointer rounded-full w-full text-white font-bold'>POST</button>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar