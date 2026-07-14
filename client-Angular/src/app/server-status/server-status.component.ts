import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckHttpService } from '../services/http/check-http.service';
import { catchError, Subscription, tap, timer } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="server-indicator" [ngClass]="statusClass" [title]="tooltip">
      <span class="dot"></span>
      <span class="label">{{ label }}</span>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      top: 16px;
      left: 16px;
      z-index: 9999;
    }

    .server-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px 6px 10px;
      border-radius: 24px;
      backdrop-filter: blur(10px);
      font-size: 0.78rem;
      font-weight: 600;
      font-family: 'Rubik', 'Segoe UI', sans-serif;
      direction: ltr;
      transition: all 0.35s ease;
      cursor: default;
      user-select: none;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border: 1px solid transparent;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      flex-shrink: 0;
      transition: background 0.35s ease, box-shadow 0.35s ease;
    }

    /* ── Online ── */
    .server-indicator.online {
      background: rgba(16, 185, 129, 0.12);
      border-color: rgba(16, 185, 129, 0.25);
    }
    .online .dot {
      background: #10b981;
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
      animation: pulse-online 2.2s infinite;
    }
    .online .label { color: #065f46; }

    /* ── Offline ── */
    .server-indicator.offline {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.22);
    }
    .offline .dot {
      background: #ef4444;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
    }
    .offline .label { color: #991b1b; }

    /* ── Checking ── */
    .server-indicator.checking {
      background: rgba(148, 163, 184, 0.1);
      border-color: rgba(148, 163, 184, 0.18);
    }
    .checking .dot {
      background: #94a3b8;
      animation: pulse-checking 1s infinite;
    }
    .checking .label { color: #475569; }

    @keyframes pulse-online {
      0%, 100% { box-shadow: 0 0 6px rgba(16,185,129,0.4); }
      50%      { box-shadow: 0 0 16px rgba(16,185,129,0.7); }
    }
    @keyframes pulse-checking {
      0%, 100% { opacity: 0.4; }
      50%      { opacity: 1; }
    }

    @media (max-width: 500px) {
      .label { display: none; }
      .server-indicator { padding: 6px 8px; border-radius: 50%; }
    }
  `]
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  private conn = inject(CheckHttpService);
  private sub?: Subscription;

  statusClass: 'online' | 'offline' | 'checking' = 'checking';
  label = 'בודק...';
  tooltip = '';

  ngOnInit() {
    this.sub = timer(0, 2000).subscribe(() => {
      this.conn.check$().pipe(
        tap((ok: boolean) => {
          this.statusClass = ok ? 'online' : 'offline';
          this.label = ok ? 'שרת פעיל' : 'שרת לא פעיל';
          this.tooltip = ok ? 'השרת מחובר' : 'השרת מנותק';
        }),
        catchError(() => {
          this.statusClass = 'offline';
          this.label = 'שרת לא פעיל';
          this.tooltip = 'לא ניתן להתחבר לשרת';
          return [];
        })
      ).subscribe();
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
