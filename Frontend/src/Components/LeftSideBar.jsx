import React from 'react'
import { HiBookmark, HiHashtag, HiHome, HiLogout, HiUser } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../Utils/constant';
import toast from 'react-hot-toast';
import { getOtherUsers, getProfile, getUser } from '../Redux/userSlice';
import { getIsBookmark } from '../Redux/tweetSlice';
function LeftSideBar() {
  const { user } = useSelector(store => store.user)
  const { isBookmark } = useSelector(store => store.tweet)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isActive = (path) => {
    return location.pathname === path;
  };
  const handleBookmark = () => {
    dispatch(getIsBookmark(true));
  }
  const handlebook = () => {
    dispatch(getIsBookmark(false));
  }
  const handleLogout = async () => {
    // Add logout logic here
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true
      })
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(getUser(null))
        dispatch(getOtherUsers(null))
        dispatch(getProfile(null))
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout error if needed
    }
  };

  return (
    <div className='w-1/4 border border-gray-200 sticky top-0 h-screen overflow-y-auto bg-white hidden md:block'>
      <div >
        <div>
          <img width={50} className='m-2' src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?ga=GA1.1.124665594.1745737047&semt=ais_hybrid&w=740" alt="X logo" />
        </div>
        <div className='my-4'>
          <Link onClick={handlebook} to="/" className={`flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${isActive('/home') ? 'font-bold' : ''}`}>
            <HiHome size={'24px'} />
            <h1 className='text-lg'>Home</h1>
          </Link>
          <Link onClick={handlebook} to="/explore" className={`flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${isActive('/explore') ? 'font-bold' : ''}`}>
            <HiHashtag size={'24px'} />
            <h1 className='text-lg'>Explore</h1>
          </Link>

          <Link onClick={handlebook} to="/notifications" className={`flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${isActive('/notifications') ? 'font-bold' : ''}`}>
            <IoNotifications size={'24px'} />
            <h1 className='text-lg'>Notifications</h1>
          </Link>

          <Link onClick={handlebook} to={`/profile/${user?._id}`} className={`flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${isActive('/profile') ? 'font-bold' : ''}`}>
            <HiUser size={'24px'} />
            <h1 className='text-lg'>Profile</h1>
          </Link>

          <Link onClick={handleBookmark} to="/bookmarks" className={`flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full hover:cursor-pointer ${isActive('/bookmarks') ? 'font-bold' : ''}`}>
            <HiBookmark size={'24px'} />
            <h1 className='text-lg'>Bookmarks</h1>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 my-2 hover:bg-gray-200 rounded-full hover:cursor-pointer w-full"
          >
            <HiLogout size={'24px'} />
            <h1 className='text-lg'>Logout</h1>
          </button>

          <button className='px-4 py-2 border-none text-lg bg-[#1D9BF0] my-2 hover:bg-[#45b0f7] hover:cursor-pointer rounded-full w-full text-white font-bold'>POST</button>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar