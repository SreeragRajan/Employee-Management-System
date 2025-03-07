import React, { useContext } from 'react'
import Header from '../others/Header'
import TaskListNumbers from '../others/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import { AuthContext } from '../../context/AuthProvider'

const EmployeeDashboard = ({data, changeUser}) => {

  
  return (
    <div className='p-10 bg-[#1C1C1C]'>
        
        <Header changeUser={changeUser} data={data}/>
        <TaskListNumbers data={data} />
        <TaskList data={data} />
    </div>
  )
}

export default EmployeeDashboard