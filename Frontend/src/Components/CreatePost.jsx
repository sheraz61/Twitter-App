import React from 'react'

function CreatePost() {
    return (
        <div className='w-[50%]'>
            <div className='m-3'>
                <div className='upper-div flex justify-between items-center border border-gray-500'>
                    <div className='hover:cursor-pointer'>
                        <h1 className='font-bold text-gray-600 text-lg '>For You</h1>
                    </div>
                    <div className='hover:cursor-pointer'>
                        <h1 className='font-bold text-gray-600 text-lg '>Following</h1>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="text" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreatePost