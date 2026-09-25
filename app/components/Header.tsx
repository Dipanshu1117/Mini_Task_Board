import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#FEFEFE] w-full mt-2 h-20'>
        <div className='flex justify-between'>
            <div className='flex gap-2 p-4'> 
                <div className='text-3xl h-8 w-8 bg-blue-600 text-center rounded-xs'>✓</div>
                <h1 className='text-4xl text-black font-bold'>TaskBoard</h1>
                <div className='h-12 w-1 bg-gray-400 '></div>
                <p className='text-gray-300 mt-5'>Manage Your Task</p>
            </div>


            <div>
                <button className='bg-blue-600 m-4 mr-15 h-10 w-25 rounded-xl'>+ Add Task</button>
            </div>
        </div>
    </div>
  )
}

export default Header