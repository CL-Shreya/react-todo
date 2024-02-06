import { FontIcon, ITag, TeachingBubble, mergeStyles } from '@fluentui/react'
import TaskListStyle from './TaskList.style'
import { ITask } from '../Type'
import {useBoolean, useId } from '@fluentui/react-hooks';

type Props={
    task :ITask
}
const TaskDescription = ({task}:Props) => {
    const buttonId = useId('targetButton');
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
  return (
    
    <div>
        <FontIcon 
        id={buttonId}
        iconName="Info" 
        className={
            task.description
            ?TaskListStyle.iconStyle
            :mergeStyles(TaskListStyle.iconStyle,TaskListStyle.disabled)}
        onClick={task.description?toggleTeachingBubbleVisible:()=>{}}
        />
        {teachingBubbleVisible&&
        <TeachingBubble
          target={`#${buttonId}`}
         headline={task.title}
        >
         {task.description}
        </TeachingBubble>
}
    </div>
  )
}

export default TaskDescription
