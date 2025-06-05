import React from 'react';
import Tweet from './Tweet'
import { useSelector } from 'react-redux'
function Bookmarks() {
  const { tweets } = useSelector((state) => state.tweet)

  return (
    tweets?.length > 0 ? (
      <div className=" w-[50%] p-4">
        <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
        <div className="space-y-4">
          {tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </div>
        </div>
        ):(
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Bookmarks</h1>
          <div className="space-y-4">
            {/* Bookmarked posts will go here */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-gray-500">No bookmarks yet</p>
            </div>
          </div>
        </div>
        )
        );
}

        export default Bookmarks;