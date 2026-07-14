import { Component, EventEmitter, Input, inject, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Itask } from '../model/task';
import { StatusMode } from '../model/statusMode';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { StatusPipe } from '../pipe/status.pipe';
import { DateOnlyPipe } from '../pipe/date-only.pipe';
import { ToColumnNamePipe } from '../pipe/to-column-name.pipe';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFromComponent } from '../task-from/task-from.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks-table',
  imports: [
    MatTableModule,
    MatIconModule,
    CommonModule,
    StatusPipe,
    DateOnlyPipe,
    ToColumnNamePipe,
    FormsModule
  ],
  standalone: true,
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit, OnChanges {
  private dialog = inject(MatDialog);
  private dialogRef: MatDialogRef<TaskFromComponent> | null = null;
  columns: string[] = [];
  @Input() tasksList: Itask[] | null = [];
  @Output() afterUpdate: EventEmitter<any> = new EventEmitter();
  @Output() deleteTask: EventEmitter<Itask> = new EventEmitter();
  notDisplayColumns = ['taskId'];

  ngOnInit(): void { this.extractColumns(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasksList'] && this.tasksList?.length) this.extractColumns();
  }

  extractColumns(): void {
    if (this.tasksList?.length) {
      this.columns = Object.keys(this.tasksList[0])
        .filter(key => !this.notDisplayColumns.includes(key));
      this.columns.push('update', 'delete');
    }
  }

  statusClass(status: StatusMode): string {
    switch (status) {
      case StatusMode.pending: return 'pending';
      case StatusMode.process: return 'process';
      case StatusMode.completed: return 'completed';
      case StatusMode.cancel: return 'cancel';
      default: return '';
    }
  }

  updateTask(task: Itask): void {
    this.dialogRef = this.dialog.open(TaskFromComponent, {
      width: '580px', disableClose: false, data: { task }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.afterUpdate.emit();
      this.dialogRef = null;
    });
  }

  confirmDelete(task: Itask): void {
    const confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px', disableClose: false
    });
    confirmRef.afterClosed().subscribe(result => {
      if (result) this.deleteTask.emit(task);
    });
  }
}
