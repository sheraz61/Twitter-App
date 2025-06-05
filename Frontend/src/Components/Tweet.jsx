import React from 'react'
import axios from 'axios'
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import { TWEET_API_ENDPOINT, USER_API_ENDPOINT } from '../Utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getRefresh } from '../Redux/tweetSlice'
function Tweet({ tweet }) {
  const dispatch = useDispatch()
  const { user } = useSelector(store => store.user)

  const likeordislike = async (id) => {
    try {
      const res = await axios.patch(`${TWEET_API_ENDPOINT}/like/${id}`, { id: user?._id }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(getRefresh())
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handlebookmark=async(id)=>{
    try {
      const res = await axios.patch(`${USER_API_ENDPOINT}/bookmark/${id}`, { id: user?._id }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        dispatch(getRefresh())
        toast.success(res?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${id}`, {
        withCredentials: true
      })
      if (res.data.success) {
        toast.success(res.data.message)
        dispatch(getRefresh())
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className=" p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex space-x-3">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={tweet?.user?.profileImage || "https://picsum.photos/200"}
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>

        {/* Tweet Content */}
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center space-x-1">
            <span className="font-bold">{tweet?.userDetails[0]?.name || 'Name'}</span>
            <span className="text-gray-500">@{tweet?.userDetails[0]?.username || 'username'}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{tweet?.timestamp || '2h'}</span>
          </div>

          {/* Tweet Text */}
          <p className="mt-1 text-gray-900">{tweet?.description || 'Tweet content goes here'}</p>

          {/* Tweet Media (if any) */}
          {tweet?.media && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img src={tweet.media} alt="Tweet media" className="max-h-96 w-full object-cover" />
            </div>
          )}

          {/* Interaction Buttons */}
          <div className="flex justify-between mt-3 text-gray-500 max-w-md">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <FaRegComment />
              <span>{tweet?.comments || 0}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500">
              <FaRetweet />
              <span>{tweet?.retweets || 0}</span>
            </button>
            <button onClick={() => likeordislike(tweet?._id)} className="flex items-center space-x-2 hover:text-red-500">
              <FaRegHeart />
              <span>{tweet?.like?.length || 0}</span>
            </button>
            <button onClick={() => handlebookmark(tweet?._id)} className="flex items-center space-x-2 hover:text-blue-500">
              <FaRegBookmark />
              <span>{tweet?.bookmark?.length || 0}</span>
            </button>
            {
              user?._id === tweet?.userDetails[0]?._id && (
                <button onClick={() => handleDelete(tweet?._id)} className="flex items-center space-x-2 hover:text-red-500">
                  <MdDelete />
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
