import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Itask } from '../model/task';
import { StatusMode } from '../model/statusMode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppOverHilightDirective } from '../directives/app-over-hilight.directive';
import { StatusPipe } from '../pipe/status.pipe';
import { FilterStatusPipe } from '../pipe/filter-status.pipe';
import { MatIconModule } from '@angular/material/icon';
import { IconsPipe } from '../pipe/icons.pipe';
import { DateOnlyPipe } from '../pipe/date-only.pipe';

@Component({
  selector: 'app-task',
  imports: [CommonModule,
    FormsModule,
    AppOverHilightDirective,
    FilterStatusPipe,
    StatusPipe,
    MatIconModule,
    IconsPipe,
    DateOnlyPipe
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task: Itask = {} as Itask;
  @Output() update = new EventEmitter<Itask>();
  theStatusEnum = StatusMode;

  statusClass(status: StatusMode): string {
    switch (status) {
      case StatusMode.pending:   return 'pending';
      case StatusMode.process:   return 'process';
      case StatusMode.completed: return 'completed';
      case StatusMode.cancel:    return 'cancel';
      default: return '';
    }
  }

  ngOnInit(): void {
    const i = 0;
  }
}
