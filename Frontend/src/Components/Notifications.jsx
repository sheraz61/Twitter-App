import React from 'react';

function Notifications() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-4">
        {/* Notifications will go here */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-500">No new notifications</p>
        </div>
      </div>
    </div>
  );
}

export default Notifications; 