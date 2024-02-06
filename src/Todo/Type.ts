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
    activeTasks:ITask[]
    dispatch:Dispatch< any>
}
export interface ITodoState{
    activeTasks:ITask[];
    completedTasks:ITask[];
}
export enum ActionTypeEnum{
    Add,
    Delete,
    Update
}
export type IReducerAction= IAddAction|IDeleteAction|IUpdateAction
export interface IAddAction{
    type:ActionTypeEnum.Add;
    data:ITask;
}
export interface IDeleteAction{
    id: string
    data: any
    type:ActionTypeEnum.Delete,
    Data:{id:string}
}
export interface IUpdateAction{
    type:ActionTypeEnum.Update,
    data:ITask;
}