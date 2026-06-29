import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { CheckHttpService } from '../services/http/check-http.service';
import { tap, catchError, throwError } from 'rxjs';
import { of } from 'rxjs';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    TasksComponent,
    ChatComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  logo_src = 'assets/img/show.jpg';
  router = inject(Router);
  connection = inject(CheckHttpService);
  isServerAlive: boolean | null = null; 
  buttons: Array<{ name: string; link: string }> = [
    {
      name: 'אודות',
      link: 'about'
    },
    {
      name: 'משימות',
      link: 'tasks'
    },
    {
      name: 'משתמשים',
      link: 'users'
    }
  ];
  ngOnInit(): void {
  setInterval(() => {
      this.connection.check$().pipe(
        tap((result: boolean) => this.isServerAlive = result),
        catchError((err: any) => {
          this.isServerAlive = false;
          return of(false);
        })
        ).subscribe();
    }, 2000);
  }
}
