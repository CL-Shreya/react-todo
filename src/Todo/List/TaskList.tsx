import React, { useContext } from 'react'
import TaskListStyle from './TaskList.style';
import { Checkbox, FontIcon, Stack } from '@fluentui/react';
import { TodoContext } from '../Home';
import { ActionTypeEnum, ITask } from '../Type';
import TaskDescription from './TaskDescription';
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
const onRenderCell =(task:ITask)=>{
    return<Stack horizontal key={task.id} className={TaskListStyle.taskItem}>
        <Stack horizontal style={{width:"85%"}}>
        <Checkbox/>
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
