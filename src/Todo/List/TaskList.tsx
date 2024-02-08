import React, { useContext } from 'react'
import TaskListStyle from './TaskList.style';
import { Checkbox, FontIcon, Stack } from '@fluentui/react';

import { ActionTypeEnum, ITask } from '../Type';
import TaskDescription from './TaskDescription';
import { TodoContext } from '../TodoProvider';

type Props={
  setEditTask:(taskId:string)=>void
}
const TaskList = ({setEditTask}:Props) => {

const {activeTasks,dispatch}=useContext(TodoContext)


const onTaskDelete=(id:string)=>{
  if(window.confirm("Are you sure, you want to delete?")){
  dispatch({type:ActionTypeEnum.Delete,data:{id}})
  }
}
const checkboxClickHnd=(id:string)=>{
  dispatch({type:ActionTypeEnum.Completed,data:{id}})
}
const onRenderCell =(task:ITask)=>{
    return<Stack horizontal key={task.id} className={TaskListStyle.taskItem}>
        <Stack horizontal style={{width:"85%"}}>
        <Checkbox onChange={()=>{
            checkboxClickHnd(task.id)
        }}/>
        {task.title}
        </Stack>
       
        <Stack horizontal style={{width:"15%"}}>
        <TaskDescription task={task}/>
       <FontIcon iconName='EditNote' 
                 className={TaskListStyle.iconStyle}
                 onClick={()=>{
                  setEditTask(task.id)
                 }}/>
        <FontIcon iconName='Delete' className={TaskListStyle.iconStyle} onClick={()=>onTaskDelete(task.id)}/>
       </Stack>
        </Stack>
};

  return (
    <div>
     {activeTasks.map(onRenderCell)}
    </div>
  )
}

export default TaskList;
