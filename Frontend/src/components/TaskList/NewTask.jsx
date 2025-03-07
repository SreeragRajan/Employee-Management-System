
import React from 'react'
import { axiosInstance } from '../../utils/axios';
import toast from 'react-hot-toast';

const NewTask = ({userId, task, refreshTasks}) => {

    const handleAcceptTask = async () => {
        try {
            const res = await axiosInstance.put("/task/accept", { userId, taskId: task._id });
            toast.success("Task Accepted");
            refreshTasks();
        } catch (error) {
            console.log("Error in accept task:", error.response?.data || error.message);
        }
    
    };

     // Format the date
     const formattedDate = new Date(task.date).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        <div className='relative flex-shrink-0 h-72 w-full p-3 md:p-5 bg-blue-400 rounded-xl'>
            <div className='flex justify-between items-center'>
                <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.category}</h3>
                <h4 className='text-sm'>{formattedDate}</h4>
            </div>
            <h2 className='mt-5 text-2xl font-semibold capitalize'>{task.title}</h2>
            <p className='text-sm mt-2 break-words whitespace-normal max-h-20 overflow-y-auto'>
                {task.description}
            </p>
            <div className='absolute bottom-3 left-3'>
                <button onClick={handleAcceptTask} className='bg-blue-500 rounded font-medium p-1.5 text-sm '>Accept Task</button>
            </div>
        </div>
    )
}

export default NewTask
