
import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div id='tasklist' className='h-72 overflow-x-auto flex flex-wrap items-center justify-start gap-5 w-full py-1 mt-16'>
            {data?.tasks?.map((task, idx) => {
                if (task.active) {
                    return <AcceptTask key={idx} userId={data._id} task={task} />
                }
                if (task.newTask) {
                    return <NewTask key={idx} userId={data._id} task={task} />
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
