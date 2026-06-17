import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckHttpService } from '../services/http/check-http.service';
import { catchError, tap } from 'rxjs';
import { of } from 'rxjs';
import { DownloadService } from '../services/download.service';
@Component({
  selector: 'app-home',
  imports: [
   RouterModule ,
   CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
download = inject( DownloadService);   
name="ברכה חסיד"
s1="UNGULAR"
s2="REACT"
s3="SQL"
s4="C++"
s5="JAVA"
s6="PYTHON"
phone=''
information1=''
information2=''
information3=''
img='assets/img/tichnut.jpg'
isServerAlive: boolean | null = null;
router = inject(Router);
connection = inject(CheckHttpService);
click(){
  this.phone='📞0527134021📞|🖥️b0527134021@gmail.com🖥️'
}
aboutMe(){
  this.information1='...פרטים בהמשך'
}
showMe(){
  this.information2='...פרטים בהמשך'
}
orderProject(){
  this.information3='...פרטים בהמשך'
}
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

  goTOlogin(){
  this.router.navigate(['/main']);
}
goToResume(){
      this.download.downloadCv().subscribe(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.pdf'; // ✅ Set desired file name
            a.click();
            window.URL.revokeObjectURL(url); // clean up
      });
    }

}
