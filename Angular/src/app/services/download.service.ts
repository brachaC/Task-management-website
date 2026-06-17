import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  http = inject(HttpClient); 

  constructor() { }

  
  downloadCv() {
  return this.http.get('/assets/resume.pdf', { responseType: 'blob' });
}
   
}
