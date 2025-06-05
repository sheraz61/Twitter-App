import React, { useState } from 'react';
import Tweet from './Tweet';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import useProfile from '../hooks/useProfile.js'
import { useSelector, useDispatch } from 'react-redux'
import { USER_API_ENDPOINT } from '../Utils/constant.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import { followingUpdate } from '../Redux/userSlice.js';
export default function Profile() {
    const { user, profile } = useSelector(store => store.user)
    const { tweets } = useSelector((state) => state.tweet)
    const mytweets=tweets.filter((tweet)=> tweet?.userId === profile?._id)
    const { id } = useParams()
    useProfile(id)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('tweets');
    const navigate = useNavigate();
    const followHandler = async () => {
        try {
            const res = await axios.patch(`${USER_API_ENDPOINT}/follow/${id}`, { id: user?._id }, {
                withCredentials: true
            })
            dispatch(followingUpdate(id))
            if (res?.data?.success) {
                toast.success(res?.data?.message)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div className="w-2/4 mx-auto border border-gray-200 bg-white">
            <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <button
                    onClick={() => navigate('/')}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
                <div>
                    <h1 className="text-xl font-bold">{profile?.name}</h1>
                    <p className="text-sm text-gray-500">{mytweets.length} Post</p>
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
                    {
                        profile?._id === user?._id ? (
                            <button className="px-4 py-2 border border-blue-400 rounded-full bg-white text-blue-400 font-bold hover:bg-blue-50 transition-colors">
                                Edit Profile
                            </button>
                        ) : (
                            <button onClick={followHandler} className="px-4 py-2 border border-blue-400 rounded-full bg-black text-white font-bold  transition-colors">
                                {user?.following?.includes(id) ? "Unfollow" : "Follow"}
                            </button>
                        )
                    }
                </div>

                <div className="">
                    <h1 className="text-xl font-bold">{profile?.name}</h1>
                    <p className="text-gray-500">{`@${profile?.username}`}</p>
                    <p className="mt-2 leading-relaxed">
                        Software Developer | Tech Enthusiast | Coffee Lover
                    </p>

                    <div className="flex gap-5 mt-3">
                        <div className="flex gap-1">
                            <span className="font-bold">{profile?.following.length}</span>
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="font-bold">{profile?.followers.length}</span>
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
                {activeTab === 'tweets' &&
                    mytweets?.map((tweet) => (
                        <Tweet key={tweet?._id} tweet={tweet} />
                    ))
                }
                {activeTab === 'replies' && <div>Replies content</div>}
                {activeTab === 'media' && <div>Media content</div>}
                {activeTab === 'likes' && <div>Likes content</div>}
            </div>
        </div>
    );
}
