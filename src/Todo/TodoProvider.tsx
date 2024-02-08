import React, { createContext, useReducer } from "react";
import {
  ActionTypeEnum,
  ICompletedAction,
  IReducerAction,
  ITask,
  ITodoContext,
  ITodoState,
  IUpdateAction,
} from "./Type";
import { clone } from "./utility";
import { stat } from "fs";

export const TodoContext = createContext<ITodoContext>({
  activeTasks: [],
  completedTasks: [],
  dispatch: () => {},
});
type Props = {
  children: React.ReactNode;
};
const updateTaskAction = (state: ITodoState, action: IUpdateAction) => {
  const cloneActiveTasks: ITask[] = clone(state.activeTasks);

  const index = cloneActiveTasks.findIndex((x) => x.id === action.data.id);
  if (index >= 0) {
    cloneActiveTasks[index] = action.data;
  }
  return cloneActiveTasks;
};
const completedTaskAction = (state: ITodoState, action: ICompletedAction) => {
  const activetasks: ITask[] = clone(state.activeTasks);
  const completedtaskData = activetasks.find(
    (task) => task.id === action.data.id
  );
  const filtered = activetasks.filter((task) => task.id !== action.data.id);
  const completedTasks = completedtaskData
    ? [completedtaskData, ...state.completedTasks]
    : [...state.completedTasks];
  return {
    activetasks: filtered,
    completedTasks,
  };
};
const reducer = (state: ITodoState, action: IReducerAction): ITodoState => {
  switch (action.type) {
    case ActionTypeEnum.Add:
      const { data } = action;
      return { ...state, activeTasks: [data, ...state.activeTasks] };
    case ActionTypeEnum.Delete:
      const activeTasks: ITask[] = JSON.parse(
        JSON.stringify(state.activeTasks)
      );

      const filteredData = activeTasks.filter(
        (task) => task.id !== action.data.id
      );
      return { ...state, activeTasks: filteredData };
    case ActionTypeEnum.DeleteCompletedTask:
      const completedTasks: ITask[] = clone(state.completedTasks);

      const filteredTaskData = completedTasks.filter(
        (task) => task.id !== action.data.id
      );
      return { ...state, completedTasks: filteredTaskData };
    case ActionTypeEnum.Update:
      return { ...state, activeTasks: updateTaskAction(state, action) };
    case ActionTypeEnum.Completed:
      const datavalue = completedTaskAction(state, action);
      return {
        ...state,
        activeTasks: datavalue.activetasks,
        completedTasks: datavalue.completedTasks,
      };
  }

  return { ...state };
};
const TodoProvider = (props: Props) => {
  const tasks: ITask[] = [
    {
      id: "1",
      title: "Task1",
      description: "Description for Task 1",
      selectDate: new Date("2024-02-21"),
      status: "In Progress",
    },
    {
      id: "2",
      title: "Task2",
      selectDate: new Date("2024-02-22"),
      status: "In Progress",
    },
    {
      id: "3",
      title: "Task3",
      description: "Description for Task 3",
      selectDate: new Date("2024-02-12"),
      status: "In Progress",
    },
  ];
  const data: ITodoState = { activeTasks: tasks, completedTasks: [] };

  console.log("Data", data);
  const [state, dispatch] = useReducer(reducer, data);
  return (
    <TodoContext.Provider
      value={{
        activeTasks: state.activeTasks,
        completedTasks: state.completedTasks,
        dispatch,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
