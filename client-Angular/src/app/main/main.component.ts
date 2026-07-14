import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  buttons: Array<{ name: string; link: string }> = [
    { name: 'אודות', link: 'about' },
    { name: 'משימות', link: 'tasks' },
    { name: 'משתמשים', link: 'users' }
  ];
}
