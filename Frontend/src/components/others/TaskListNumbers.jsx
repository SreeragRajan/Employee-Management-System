import React from 'react'

const TaskListNumbers = ({data}) => {
  return (
    <div className='mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4'>
        
        <div className='rounded-xl w-full p-5 md:py-6 md:px-9 bg-blue-400'>
            <h2 className='text-3xl font-bold'>{data?.taskCounts?.newTask}</h2>
            <h3 className='text-xl mt-0.5 font-medium'>New Task</h3>
        </div>
        <div className='rounded-xl w-full p-5 md:py-6 md:px-9 bg-green-400'>
            <h2 className='text-3xl font-bold'>{data?.taskCounts?.completed}</h2>
            <h3 className='text-xl mt-0.5 font-medium'>Completed Task</h3>
        </div>
        <div className='rounded-xl w-full p-5 md:py-6 md:px-9 bg-yellow-400 '>
            <h2 className='text-3xl text-black font-bold'>{data?.taskCounts?.active}</h2>
            <h3 className='text-xl mt-0.5 text-black font-medium'>Accepted Task</h3>
        </div>
        <div className='rounded-xl w-full p-5 md:py-6 md:px-9 bg-red-400'>
            <h2 className='text-3xl font-bold'>{data?.taskCounts?.failed}</h2>
            <h3 className='text-xl mt-0.5 font-medium'>Failed Task</h3>
        </div>
    </div>
  )
}

export default TaskListNumbers