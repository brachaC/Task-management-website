import { Component,Input } from '@angular/core';
import { Itask } from '../model/task';
import { StatusMode } from '../model/statusMode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppOverHilightDirective } from '../directives/app-over-hilight.directive';
import { StatusPipe } from '../pipe/status.pipe';
import { FilterStatusPipe } from '../pipe/filter-status.pipe';
import {MatIconModule} from '@angular/material/icon';
import { IconsPipe } from '../pipe/icons.pipe';

@Component({
  selector: 'app-task',
  imports: [CommonModule,
    FormsModule,
    AppOverHilightDirective,
    FilterStatusPipe,
    StatusPipe,
    MatIconModule,
    IconsPipe
 ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task :Itask={}as Itask;
   theStatusEnum=StatusMode;
}

