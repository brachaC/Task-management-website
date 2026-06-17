import {StatusMode } from "./statusMode";

export interface Itask{
    id:string,
    name:string,
    description:string,
    price:number,
    scheduling:string,
    status:StatusMode
}
