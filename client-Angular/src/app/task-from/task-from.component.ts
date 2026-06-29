import { CommonModule} from '@angular/common';
import { Component,Input,Inject,inject ,OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,FormControl,
  ValidationErrors, ValidatorFn, Validators,AbstractControl
 } from '@angular/forms';
import { StatusComponent } from '../status/status.component';
import { StatusMode } from '../model/statusMode';
import {Itask} from '../model/task';
import {MatDialogRef,MAT_DIALOG_DATA}from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-task-from',
  imports: [ReactiveFormsModule,
    CommonModule,
    StatusComponent,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule,

  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-from.component.html',
  styleUrl: './task-from.component.scss'
})
export class TaskFromComponent implements OnInit{
  private fb = inject(FormBuilder); 
 
taskForm: FormGroup = {} as FormGroup;
  statusModes = Object.values(StatusMode);
  readonly startDate = new Date();
  isNew = true;

  @Input()  task :Itask = {} as Itask;

  constructor(
    private dialogRef: MatDialogRef<TaskFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  
  ){}
  ngOnInit(): void {
      
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [100, [Validators.required, Validators.min(100)]],
      scheduling: [new FormControl<Date | null>(null),this.dateFromTodayValidator],
      status:  [StatusMode.pending, ], 
    });
}
dateFromTodayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const inputDate = new Date(value);
      const today = new Date();

      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);

      return inputDate >= today ? null : { dateFromToday: { minDate: today, actual: inputDate } };
    };
  }
  save(){
    this.dialogRef.close({success:false})
    
  }
   cancel(){
      this.dialogRef.close({ success: true }); 
}
}