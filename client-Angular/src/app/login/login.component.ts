import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/http/auth.service.service';
import { catchError, of, tap } from 'rxjs';
import { SnackService } from '../services/snack.service';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule, RouterModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  snack = inject(SnackService);
  router = inject(Router);
  auth = inject(AuthService);
  loading = false;
  showNotFoundAlert = false;

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.formGroup.invalid) return;
    this.loading = true;
    this.showNotFoundAlert = false;
    const { userName, password } = this.formGroup.value;
    this.auth.login$({ userName, password }).pipe(
      tap((res) => {
        this.loading = false;
        if (res?.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userName', res.userName);
          this.router.navigate(['/main']);
        } else {
          this.showNotFoundAlert = true;
        }
      }),
      catchError(() => {
        this.loading = false;
        this.showNotFoundAlert = true;
        return of(null);
      })
    ).subscribe();
  }
}
