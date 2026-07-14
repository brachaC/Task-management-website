import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoggedInGuardsService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.hasToken()) return true;
    this.router.navigate(['/login']);
    return false;
  }

  hasToken(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
