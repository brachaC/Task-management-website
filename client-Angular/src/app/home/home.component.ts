import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DownloadService } from '../services/download.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  download = inject(DownloadService);
  router = inject(Router);
  name = "ברכה חסיד";
  phone = '';

  click() {
    this.phone = '📞0527134021📞|🖥️b34021@gmail.com🖥️';
  }

  goTOlogin() {
    this.router.navigate(['/login']);
  }

  goToResume() {
    this.download.downloadCv().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'myResume.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
