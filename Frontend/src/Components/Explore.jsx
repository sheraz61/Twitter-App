import React from 'react';

function Explore() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <div className="space-y-4">
        {/* Trending topics will go here */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h2 className="font-bold">Trending in pakistan</h2>
          <p className="text-gray-500">#TrendingTopic</p>
          <p className="text-sm text-gray-500">10.2K posts</p>
        </div>
      </div>
    </div>
  );
}

export default Explore; 