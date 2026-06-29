import {StatusMode } from "./statusMode";

export interface Itask{
    taskId:number,
    name:string,
    description:string,
    price:number,
    scheduling: string,
    status:StatusMode
}
