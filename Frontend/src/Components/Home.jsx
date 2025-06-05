import React, { useEffect } from 'react'
import LeftSideBar from './LeftSideBar'
import Feed from './Feed'
import RightSideBar from './RightSideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUser from '../hooks/useOtherUser'
import { useSelector } from 'react-redux'
import useGetMyTweet from '../hooks/useGetMyTweet'

function Home() {
  const {user,otherUsers}=useSelector((state)=>state.user)
  useOtherUser(user?._id)
  useGetMyTweet(user?._id)
  const navigate= useNavigate()
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])
  return (
    <div className='flex justify-between mx-auto w-[80%]'>
      <LeftSideBar />
      <Outlet />
      <RightSideBar otherUsers={otherUsers} />
    </div>
  )
}

export default Home