import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../model/user';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  user: IUser=  {} as IUser;
  
  ngOnInit(): void {
    const details = localStorage.getItem('user');
   
    if(details){
      this.user = JSON.parse(details);
    }
  }
  
}
