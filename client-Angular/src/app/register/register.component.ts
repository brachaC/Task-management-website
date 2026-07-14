import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from '../services/http/users.service';
import { SnackService } from '../services/snack.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, MatIconModule, MatProgressSpinnerModule, RouterModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private snack = inject(SnackService);
  loading = false;

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  register() {
    if (this.formGroup.invalid) return;
    this.loading = true;
    const { userName, password, email, phone } = this.formGroup.value;
    const user = { userName, password, email, ...(phone ? { phone } : {}) };
    this.usersService.addUser$(user).pipe(
      tap((success) => {
        this.loading = false;
        if (success) {
          this.snack.openSnackBar('ההרשמה בוצעה בהצלחה', 'כעת ניתן להתחבר');
          this.router.navigate(['/login']);
        } else {
          this.snack.openSnackBar('שגיאה בהרשמה', 'נסה שנית');
        }
      }),
      catchError(() => {
        this.loading = false;
        this.snack.openSnackBar('שגיאה בהרשמה', 'נסה שנית');
        return of(null);
      })
    ).subscribe();
  }
}
