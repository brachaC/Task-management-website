import { Component, inject, OnInit } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { TaskFromComponent } from '../task-from/task-from.component';
import { map, NEVER, Observable } from 'rxjs';
import { TasksService } from '../services/http/tasks.service.service';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    FormsModule,
    StatusPipe,
    FilterStatusPipe,
    TaskComponent,
    StatusComponent,
    TasksTableComponent,
    TaskFromComponent,
    TasksDashboardComponent,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit{

	private dialog= inject(MatDialog);
	private dialogRef:MatDialogRef<TaskFromComponent> | null=null;
	tasksService = inject(TasksService);
	 viewState:TaskViewMode=TaskViewMode.Dashboard;
	 theStateEnum=TaskViewMode;
	 theStatusEnum=StatusMode;
	 tasksList$ :Observable<Itask[]> = NEVER;
	 status=StatusMode
	selectStatus: StatusMode = StatusMode.all;

	 ngOnInit(): void {
	    this.loadTasks();
	  }

	  loadTasks(){
	     this.tasksList$ = this.tasksService.getTasks$().pipe(
	      map(tasks => tasks || []),
	    );
	  }

	  onStatusChange(value: StatusMode): void {
	    this.selectStatus = value;
	  }

	changeState=()=>{
	  this.viewState=this.viewState===TaskViewMode.Table
	  ?TaskViewMode.Dashboard:TaskViewMode.Table
	}
	addTask(){
	  this.dialogRef = this.dialog.open(TaskFromComponent, {
	      width: '580px',
	      disableClose: false,
	        data: { task: null }
	    });
	    this.dialogRef.afterClosed().subscribe(result => {
	      console.log('Dialog closed', result);
	      if (result?.success) {
	        this.tasksService.addTask$(result.task).subscribe(() => this.loadTasks());
	      }
	      this.dialogRef = null;
	    });
	}

	onUpdateTask(task: Itask): void {
	  this.dialogRef = this.dialog.open(TaskFromComponent, {
	    width: '580px',
	    disableClose: false,
	    data: { task }
	  });
	  this.dialogRef.afterClosed().subscribe(result => {
	    console.log('Dialog closed', result);
	    if (result?.success) {
	      this.tasksService.updateTask$(result.task).subscribe(() => this.loadTasks());
	    }
	    this.dialogRef = null;
	  });
	}

	onDeleteTask(task: Itask): void {
	  this.tasksService.deleteTask$(task.taskId).subscribe(() => this.loadTasks());
	}

}
