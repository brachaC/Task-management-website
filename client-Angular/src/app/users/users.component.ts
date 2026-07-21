import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ToColumnNamePipe } from '../pipe/to-column-name.pipe';
import { UsersService } from '../services/http/users.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { SnackService } from '../services/snack.service';
import { IUser } from '../model/user';
import { map, NEVER, Observable, tap } from 'rxjs';
import { RoleEnum } from '../model/role';
import { MatButton } from '@angular/material/button';
import { RoleTextPipe } from '../pipe/role-text.pipe';

@Component({
  selector: 'app-users',
   imports:[
     CommonModule,
     MatButton,
    MatIconModule,
    MatTableModule,
    ToColumnNamePipe,
    RoleTextPipe
   ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit  {
   private usersService = inject(UsersService); 
   private dialog = inject(MatDialog);
   private dialogRef: MatDialogRef<UserFormComponent> | null = null;
   private confirmRef: MatDialogRef<ConfirmDialogComponent> | null = null;
   private snack = inject(SnackService);
   usersList :IUser[] | null= [];
   user:IUser = {} as IUser;
   columns: string[] = []; 
   notDisplayColumns: string[] =  [];  
   iconColumns = ['delete']; 
   theRole = RoleEnum
 
   ngOnInit(): void {
     
     const details = localStorage.getItem('user');
   
    if(details){
      this.user = JSON.parse(details);
      if(this.user.roleId !== RoleEnum.manager){
        this.notDisplayColumns = ['password']
      }
      this.loadUsers()
    }
   }   
  
  loadUsers(){
        this.usersService.getUsers$().pipe(
          map(users => users || []),
          tap(users => this.usersList = users),
          tap(users => {
          if(users && users.length){
              this.columns =[... Object.keys(users[0]),'delete']
              .filter(col=> !this.notDisplayColumns.includes(col));
          }
        })).subscribe();
    }

  deleteUser(user: IUser){
    const userId = user.userId;

    if (typeof userId !== 'number') {
      this.snack.openSnackBar('לא נמצא מזהה משתמש', '');
      return;
    }

    this.confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: window.innerWidth < 480 ? '90vw' : '220px',
      maxWidth: '90vw',
      disableClose: false,
        data: { message: 'האם אתה בטוח שאתה רוצה למחוק את המשתמש?'}
    });

    this.confirmRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if(result){
          this.deleteUserFromList(userId);
      }
    });
  }
  deleteUserFromList(userId: number){
      this.usersService.deleteUser$(userId).pipe(
            tap((result) => this.snack.openSnackBar('מחיקה הסתיימה בהצלחה','')),
            tap(_ => this.loadUsers()),
            tap(_ => this.confirmRef = null )// אחרי הסגירה מאפסים את ההפניה
          ).subscribe(
            (_=>{}),
            (err => this.snack.openSnackBar('שגיאה במחיקת משתמש',err))
        );  
  }
  addUser(){
     this.dialogRef = this.dialog.open(UserFormComponent, {
          width: window.innerWidth < 640 ? '95vw' : '580px',
          maxWidth: '95vw',
          disableClose: false,
            data: { task: null }
        });
    
        this.dialogRef.afterClosed().subscribe(result => {
          console.log('Dialog closed', result);
          this.loadUsers();
          this.dialogRef = null; // אחרי הסגירה מאפסים את ההפניה
        });
  }

 
}
