import React, { createContext, useReducer, useState } from "react";
import HomeStyle from "./Home.style";
import { Label, Pivot, PivotItem, Stack } from "@fluentui/react";
import {
  ActionTypeEnum,
  IAddAction,
  IReducerAction,
  ITask,
  ITodoContext,
  ITodoState,
  PivotKeysEnum,
} from "./Type";
import TaskList from "./List/TaskList";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import TaskForm from "./TaskForm/TaskForm";
import TodoProvider from "./TodoProvider";
import CompletedTaskList from "./List/CompletedTaskList";

initializeIcons();

// const reducer = (state: ITodoState, action: IReducerAction): ITodoState => {
//   switch (action.type) {
//     case ActionTypeEnum.Add:
//       const { data } = action;

//       return { ...state, activeTasks: [data, ...state.activeTasks] };
//     case ActionTypeEnum.Delete:
//       const activeTasks: ITask[] = JSON.parse(
//         JSON.stringify(state.activeTasks)
//       );

//       const filteredData = activeTasks.filter(
//         (task) => task.id !== action.data.id
//       );
//       return { ...state, activeTasks: filteredData };
//     case ActionTypeEnum.Update:
//       const activeTask: ITask[] = JSON.parse(JSON.stringify(state.activeTasks));

//       const filteredUpdate = activeTask.filter(
//         (task) => task.id !== action.data.id
//       );

//       return { ...state, activeTasks: filteredUpdate };
//   }
//   return { ...state };
// };

const Home = () => {
  const [selectedKey, setSelectedKey] = useState<string>(PivotKeysEnum.Tasks);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const editTask = (id: string) => {
    setEditTaskId(id);
    setSelectedKey(PivotKeysEnum.TaskForm);
  };

 
  

  return (
    <Stack className={HomeStyle.todoContainer}>
      <TodoProvider>
        <header className={HomeStyle.headerStyle}>TodoList</header>
        <Stack className={HomeStyle.pivotContainer}>
          <Pivot
            selectedKey={String(selectedKey)}
            styles={{ root: HomeStyle.pivotRoot }}
            onLinkClick={(item?: PivotItem) => {
              if (item?.props.itemKey !== PivotKeysEnum.TaskForm) {
                setEditTaskId(null);
              }
              setSelectedKey(item?.props.itemKey || PivotKeysEnum.Tasks);
            }}
          >
            <PivotItem headerText="Tasks" itemKey={PivotKeysEnum.Tasks}>
              <TaskList setEditTask={editTask} />
            </PivotItem>
            <PivotItem headerText="Task Form" itemKey={PivotKeysEnum.TaskForm}>
              <TaskForm editTaskId={editTaskId} />
            </PivotItem>
            <PivotItem headerText="Completed" itemKey={PivotKeysEnum.Completed}>
             <CompletedTaskList/>
            </PivotItem>
          </Pivot>
        </Stack>
      </TodoProvider>
    </Stack>
  );
};

export default Home;
