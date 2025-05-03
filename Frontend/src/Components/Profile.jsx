import React, { useState } from 'react';
import Tweet from './Tweet';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('tweets');
    const navigate = useNavigate();
    return (
        <div className="max-w-2xl mx-auto border border-gray-200 bg-white">
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <button 
                    onClick={()=>navigate('/')}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
                <div>
                    <h1 className="text-xl font-bold">JhonDoe</h1>
                    <p className="text-sm text-gray-500">10 posts</p>
                </div>
            </div>
            {/* Cover Photo */}

            <div className="w-full h-48 overflow-hidden">
                <img
                    src="https://picsum.photos/800/300"
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Profile Info Section */}
            <div className="relative px-5">
                <div className="absolute -top-12 left-5 w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                    <img
                        src="https://picsum.photos/200"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex justify-end py-5">
                    <button className="px-4 py-2 border border-blue-400 rounded-full bg-white text-blue-400 font-bold hover:bg-blue-50 transition-colors">
                        Edit Profile
                    </button>
                </div>

                <div className="mt-16">
                    <h1 className="text-xl font-bold">John Doe</h1>
                    <p className="text-gray-500">@johndoe</p>
                    <p className="mt-2 leading-relaxed">
                        Software Developer | Tech Enthusiast | Coffee Lover
                    </p>

                    <div className="flex gap-5 mt-3">
                        <div className="flex gap-1">
                            <span className="font-bold">1,234</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="font-bold">5,678</span>
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mt-5">
                <button
                    className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'tweets'
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-500 hover:text-blue-400 hover:bg-blue-50'
                        }`}
                    onClick={() => setActiveTab('tweets')}
                >
                    Tweets
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'replies'
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-500 hover:text-blue-400 hover:bg-blue-50'
                        }`}
                    onClick={() => setActiveTab('replies')}
                >
                    Replies
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'media'
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-500 hover:text-blue-400 hover:bg-blue-50'
                        }`}
                    onClick={() => setActiveTab('media')}
                >
                    Media
                </button>
                <button
                    className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'likes'
                            ? 'text-blue-400 border-b-2 border-blue-400'
                            : 'text-gray-500 hover:text-blue-400 hover:bg-blue-50'
                        }`}
                    onClick={() => setActiveTab('likes')}
                >
                    Likes
                </button>
            </div>

            {/* Content Area */}
            <div className="p-5">
                {activeTab === 'tweets' && <Tweet />}
                {activeTab === 'replies' && <div>Replies content</div>}
                {activeTab === 'media' && <div>Media content</div>}
                {activeTab === 'likes' && <div>Likes content</div>}
            </div>
        </div>
    );
}
