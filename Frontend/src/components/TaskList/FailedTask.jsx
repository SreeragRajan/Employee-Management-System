
import React from 'react'

const FailedTask = ({task}) => {
    const formattedDate = new Date(task.date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });
  return (
    <div className='relative flex-shrink-0 h-72 w-full p-3 md:p-5 bg-red-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.category}</h3>
                <h4 className='text-sm'>{formattedDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold'>{task.title}</h2>
            <p className='text-sm mt-2'>
                {task.description}
            </p>
            <div className='absolute bottom-3 left-1/2 transform -translate-x-1/2'>
                <button className='w-64 bg-red-500 rounded font-medium p-1.5 text-sm' disabled={task.failed}>Failed</button>
            </div>
        </div>
  )
}

export default FailedTask
