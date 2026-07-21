import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ChatComponent, MatIconModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  menuOpen = false;

  buttons: Array<{ name: string; link: string }> = [
    { name: 'אודות', link: 'about' },
    { name: 'משימות', link: 'tasks' },
    { name: 'משתמשים', link: 'users' }
  ];

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
