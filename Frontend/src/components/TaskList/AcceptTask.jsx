import React from 'react';
import { axiosInstance } from '../../utils/axios';

const AcceptTask = ({ userId, task }) => {
    const handleTaskCompleted = async () => {
        try {
            await axiosInstance.put("/task/completed", { userId, taskId: task._id });
        } catch (error) {
            console.log("Error in task completed function:", error.response?.data?.message || error.message);
        }
    };

    const handleTaskFailed = async () => {
        try {
            await axiosInstance.put("/task/failed", { userId, taskId: task._id });
        } catch (error) {
            console.log("Error in task failed function:", error.response?.data?.message || error.message);
        }
    };

    // Format the date
    const formattedDate = new Date(task.date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        <div className='relative flex-shrink-0 h-full w-[300px] p-5 bg-yellow-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.category}</h3>
                <h4 className='text-sm'>{formattedDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold capitalize'>{task.title}</h2>
            <p className='desc-scrollbar text-sm mt-2 break-words whitespace-normal max-h-20 overflow-y-auto'>
                {task.description}
            </p>
            <div className='absolute bottom-3 left-3'>
                <button 
                    onClick={handleTaskCompleted} 
                    className='bg-green-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Mark as Completed
                </button>
            </div>
            <div className='absolute bottom-3 right-3'>
                <button 
                    onClick={handleTaskFailed} 
                    className='bg-red-500 rounded font-medium py-1 px-2 text-xs'
                >
                    Mark as Failed
                </button>
            </div>
        </div>
    );
};

export default AcceptTask;
