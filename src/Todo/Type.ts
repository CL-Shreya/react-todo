import { Dispatch } from "react"

export enum PivotKeysEnum{
    Tasks ="Tasks",
    TaskForm="TaskForm",
    Completed="CompletedTasks",

}
export interface ITask{
    id:string
    title:string 
    description?:string
    selectDate:Date | null|undefined
    status:string


 }
 export interface ITodoContext{
    activeTasks:ITask[];
    completedTasks:ITask[];
    dispatch:Dispatch< any>;
}
export interface ITodoState{
    activeTasks:ITask[];
    completedTasks:ITask[];
}
export enum ActionTypeEnum{
    Add,
    Delete,
    Update,
    Completed,
    DeleteCompletedTask
}
export type IReducerAction= IAddAction|IDeleteAction|IUpdateAction|ICompletedAction
export interface IAddAction{
    type:ActionTypeEnum.Add;
    data:ITask;
}
export interface IDeleteAction{
    id: string
    
    type:ActionTypeEnum.Delete|ActionTypeEnum.DeleteCompletedTask,
    data:{id:string}
}
export interface IUpdateAction{
    type:ActionTypeEnum.Update,
    data:ITask;
}
export interface ICompletedAction{
    type:ActionTypeEnum.Completed,
    data:{id:string}
}