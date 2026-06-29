import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({  providedIn: 'root'})
export class CheckHttpService {
  private http = inject(HttpClient);
  
  check$(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:3030/checkConnection/checkconnection');
  }
}
