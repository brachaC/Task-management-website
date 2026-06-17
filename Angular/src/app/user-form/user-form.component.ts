import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SnackService } from '../services/snack.service';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { UsersService } from '../services/http/users.service';
import { RoleEnum } from '../model/role';

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule, 
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{
  private fb = inject(FormBuilder);   
  private usersService = inject(UsersService); 
  private snack = inject(SnackService);
  userForm: FormGroup = {} as FormGroup;   
  theRoleEnum = RoleEnum;
  
  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
  ) {}

  ngOnInit(): void {
   
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.min(8)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9-]+$/)  ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required,Validators.max(10)],
      roleId: new FormControl(RoleEnum.standard) 
    });
     
  }

  save() {
   
      const user = this.userForm.value;
      this.usersService.addUser$(user).pipe(
        tap((result) =>  this.dialogRef.close({ success: true }))
      ).subscribe(
        (_=>  this.snack.openSnackBar('עבר בהצלחה','משתמש חדש התווסף')),
        (err => this.snack.openSnackBar('שגיאה בהוספת משתמש',err))
      );   
      
  
  }

  cancel(){
      this.dialogRef.close({ success: true });
  }

  
}

