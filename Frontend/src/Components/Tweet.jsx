import React from 'react'
import { FaRegComment, FaRetweet, FaRegHeart, FaRegBookmark, FaRegShareSquare } from 'react-icons/fa'

function Tweet({ tweet }) {
  return (
    <div className="tweet p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <div className="flex space-x-3">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={tweet?.user?.profileImage || "https://yt3.ggpht.com/GSnaFZ86L70rVwVe1PpfI6srCKQgvmS74Evw8ld4MTK9uXGn3jxb_eTIB5JJPXtSNxv78RuFuw=s88-c-k-c0x00ffffff-no-rj"}
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>

        {/* Tweet Content */}
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center space-x-1">
            <span className="font-bold">{tweet?.user?.name || 'User Name'}</span>
            <span className="text-gray-500">@{tweet?.user?.username || 'username'}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{tweet?.timestamp || '2h'}</span>
          </div>

          {/* Tweet Text */}
          <p className="mt-1 text-gray-900">{tweet?.content || 'Tweet content goes here'}</p>

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
            <button className="flex items-center space-x-2 hover:text-red-500">
              <FaRegHeart />
              <span>{tweet?.likes || 0}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <FaRegBookmark />
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <FaRegShareSquare />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet
