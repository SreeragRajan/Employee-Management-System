
import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, refreshTasks }) => {
    return (
        <div id='tasklist' className='min-h-1/2 overflow-x-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 w-full mt-16'>
            {data?.tasks?.map((task, idx) => {
                if (task.active) {
                    return <AcceptTask key={idx} userId={data._id} task={task} refreshTasks={refreshTasks} />
                }
                if (task.newTask) {
                    return <NewTask key={idx} userId={data._id} task={task} refreshTasks={refreshTasks} />
                }
                if (task.completed) {
                    return <CompleteTask key={idx} task={task} />
                }
                if (task.failed) {
                    return <FailedTask key={idx} task={task} />
                }

            })}
        </div>
    )
}

export default TaskList
