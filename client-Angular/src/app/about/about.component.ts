import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  developerName = 'ברכה חסיד';
  title = 'הנדסאית תוכנה';

  frontendTechs = [
    { name: 'Angular 19', icon: 'code' },
    { name: 'RxJS', icon: 'sync' },
    { name: 'NGRX', icon: 'layers' },
  ];
  backendTechs = [
    { name: 'Node.js', icon: 'dns' },
  ];
  dataTechs = [
    { name: 'SQL Server', icon: 'storage' },
  ];

  currentTime = '';
  private timeSub?: Subscription;

  ngOnInit(): void {
    const clock$ = interval(1000).pipe(
      map(() => new Date().toLocaleTimeString('he-IL'))
    );
    this.timeSub = clock$.subscribe(time => {
      this.currentTime = time;
    });
  }

  ngOnDestroy(): void {
    this.timeSub?.unsubscribe();
  }
}
