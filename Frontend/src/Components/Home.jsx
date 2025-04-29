import React from 'react'
import LeftSideBar from './LeftSideBar'
import Feed from './Feed'
import RightSideBar from './RightSideBar'
function Home() {
  return (
    <div className='flex justify-between mx-auto w-[80%]'>
         <LeftSideBar/>
      <Feed/>
      <RightSideBar/>
    </div>
  )
}

export default Home