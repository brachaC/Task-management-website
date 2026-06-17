import { Component,Input } from '@angular/core';
import { Itask } from '../model/task';
import { CommonModule } from '@angular/common';
import { StatusPipe } from '../pipe/status.pipe';
import { TaskComponent } from '../task/task.component';
import { FilterStatusPipe } from '../pipe/filter-status.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-dashboard',
  imports: [CommonModule,FormsModule,StatusPipe,TaskComponent,FilterStatusPipe],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent {
@Input() taskslist:Itask[]=[];
}
