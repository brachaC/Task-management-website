import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import {Itask}from '../model/task'
import { TaskViewMode } from '../model/taskViewMode'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusPipe } from '../pipe/status.pipe';
import { FilterStatusPipe } from '../pipe/filter-status.pipe';
import { TaskComponent } from '../task/task.component';
import { StatusMode } from '../model/statusMode';
import { TasksTableComponent } from '../tasks-table/tasks-table.component';
import {TasksDashboardComponent  } from '../tasks-dashboard/tasks-dashboard.component';
import { StatusComponent } from '../status/status.component';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { TaskFromComponent } from '../task-from/task-from.component';
import { map, NEVER, Observable } from 'rxjs';
import { TasksService } from '../services/http/tasks.service.service';
import { ConfigurationService } from '../services/configuration.service';
@Component({
  selector: 'app-tasks',
  imports: [CommonModule,
    FormsModule,
    StatusPipe,
    FilterStatusPipe,
    TaskComponent,
    StatusComponent,
    TasksTableComponent,
    TaskFromComponent,
    TasksDashboardComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit, AfterViewInit{
private configurationService = inject(ConfigurationService);  
private dialog= inject(MatDialog);
private dialogRef:MatDialogRef<TaskFromComponent> | null=null;
tasksService = inject(TasksService);
 viewState:TaskViewMode=TaskViewMode.Dashboard;
 theStateEnum=TaskViewMode;
 theStatusEnum=StatusMode.all;
 tasksList$ :Observable<Itask[]> = NEVER;
 status=StatusMode
 taskslist :Itask[]=[
 {name:"home work",
  id:"555",
  description:"Node.js",
 price:500,
  scheduling:"super",
  status:StatusMode.process
 },
 {name:"home work",
  id:"555",
  description:"Node.js",
 price:500,
  scheduling:"super",
  status:StatusMode.all
 },{name:"home work",
  id:"555",
  description:"Node.js",
 price:500,
  scheduling:"super",
  status:StatusMode.cancel
 },{name:"home work",
  id:"555",
  description:"Node.js",
 price:500,
  scheduling:"super",
  status:StatusMode.completed
 },{name:"home work",
  id:"555",
  description:"Node.js",
 price:500,
  scheduling:"super",
  status:StatusMode.pending
 }
]
ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
    //  this.loadTasks();
    // this.configurationService.messageEvent.subscribe(
    //   (data: string) => this.showMessage(JSON.parse(data)));
    // this.configurationService.importantEvent.subscribe(
    //     (data: string) => this.showImportantMessage(JSON.parse(data)));
  }
  // showMessage(userMessage: {userName:string, message: string}){
  //   const {userName, message} = userMessage
  //   this.myChatRef.addMessage(userName ,  `💬 ${ message}`);
  // }
 
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
    
  // }
  ngOnInit(): void {
  this.loadTasks();
}
  loadTasks(){
     this.tasksList$ = this.tasksService.getTasks$().pipe(
      map(tasks => tasks || []), 
    );
  }
selectStatus=StatusMode.all;
changeState=()=>{
  this.viewState=this.viewState===TaskViewMode.Table
  ?TaskViewMode.Dashboard:TaskViewMode.Table
}
addTask(){
  this.dialogRef = this.dialog.open(TaskFromComponent, {
      width: '520px',
      disableClose: false,
        data: { task: null }
    });
}

}

  