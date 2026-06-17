import { Component, Input } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { Itask } from './model/task';
import { MainComponent } from './main/main.component';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { FilterStatusPipe } from './pipe/filter-status.pipe';
import { TaskFromComponent } from './task-from/task-from.component';
import { StatusComponent } from './status/status.component';
import { RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports:[CommonModule,
     HomeComponent,
     TaskComponent,
     MainComponent,
     TasksComponent,
    LoginComponent,
    FilterStatusPipe,
    TaskFromComponent,
     StatusComponent,
     RouterModule,
     ChatComponent
  ]
})
export class AppComponent {
  title = 'Brachy';
  @Input ()taskslist:Itask[]=[]
}

