import { Component, OnInit ,inject} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackService } from '../services/snack.service';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,
    FormsModule,
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
router = inject(Router);  
mouseoverLogin:boolean=false
snack  = inject(SnackService)
auth = inject(AuthService);
 
formGroup:FormGroup={} as FormGroup

constructor(private formBuilder:FormBuilder){} 

ngOnInit(){
    this.formGroup = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
  }
 login() {
     const { userName, password } = this.formGroup.value;
     this.auth.login$({userName, password}).pipe(
      tap((user) =>{ 
        if(user){
          const  { password, ...rest} = user;
          localStorage.setItem('user', JSON.stringify(rest));
          this.router.navigate(['/main']);
        } else{
           this.snack.openSnackBar('לוגין נכשל', 'בדוק תקינות שלשם משתמש או סיסמא')
        }
      })).subscribe();
   
    
  }
 

}
