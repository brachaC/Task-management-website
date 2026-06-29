import { Component, OnInit ,inject} from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup,FormBuilder,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,
    FormsModule,
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
router = inject(Router);  
mouseoverLogin:boolean=false
formGroup:FormGroup={} as FormGroup
constructor(private formBuilder:FormBuilder){} 
ngOnInit(){
    this.formGroup = this.formBuilder.group({
        userName: ['', Validators.required],
        password: ['', Validators.required]
      });
  }
 login(){
  //const connect = this.formGroup.value
  const{userName,password}=this.formGroup.value
  //if(!localStorage.getItem(this.formGroup.value.userName))
    //localStorage.setItem(this.formGroup.value.userName,
      //JSON.stringify(this.formGroup.value.password))
    localStorage.setItem('user', JSON.stringify
    ({userName,password }));
  
   
  this.router.navigate(['/main']);
 } 
 

}
