import { Checkbox, FontIcon, MessageBar, Stack } from '@fluentui/react';
import React, { useContext } from 'react'
import { ActionTypeEnum, ITask } from '../Type';
import TaskDescription from './TaskDescription';
import TaskListStyle from './TaskList.style';
import { TodoContext } from '../TodoProvider';


const CompletedTaskList = () => {
    
const {completedTasks,dispatch}=useContext(TodoContext)

const onTaskDeleteCompleted=(id:string)=>{
    if(window.confirm("Are you sure, you want to delete?")){
    dispatch({type:ActionTypeEnum.DeleteCompletedTask,data:{id}})
    }
};
    const onRenderCell =(task:ITask)=>{
        return<Stack horizontal key={task.id} className={TaskListStyle.taskItem}>
            <Stack horizontal style={{width:"85%"}}  className={TaskListStyle.disabled}>
            <Checkbox disabled/>
          <span>  {task.title}</span>
            </Stack>
           
            <Stack horizontal style={{width:"15%"}}>
            <TaskDescription task={task}/>
           
            <FontIcon iconName='Delete' className={TaskListStyle.iconStyle} 
            onClick={()=>onTaskDeleteCompleted(task.id)}
            />
           </Stack>
            </Stack>
    };
    return (
        <div>{completedTasks.length ? 
            completedTasks.map(onRenderCell): 
            <MessageBar>No records to show</MessageBar>}
          
       
        </div>
      )
}

export default CompletedTaskList
