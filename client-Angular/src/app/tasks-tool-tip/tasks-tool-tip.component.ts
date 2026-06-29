import {
  Component,
  Input,
  signal,
  computed,
  effect,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Itask } from '../model/task';
import { CommonModule } from '@angular/common';
import { StatusMode } from '../model/statusMode';

@Component({
  selector: 'app-task-tooltip',
  imports: [CommonModule],
  templateUrl: './tasks-tool-tip.component.html',
  styleUrl: './tasks-tool-tip.component.scss'
})
export class TasksToolTipComponent{
  theStatusEnum= StatusMode;
  
  private tasksSignal = signal<Itask[]>([]);
  /** שליטה על הצגת ה-tooltip */
  show = signal(false);
  count= signal(0);
  /** Input שמעדכן את ה-signal */
  @Input()
  set tasksList(value: Itask[]) {
    this.tasksSignal.set(value ?? []);
  }

  /** computed – חישוב נגזר */
  taskCount = computed(() => this.tasksSignal().length);
  completedCount = computed(() => this.tasksSignal()
  .filter(task => task.status === StatusMode.completed).length);
   pendingCount = computed(() => this.tasksSignal()
  .filter(task => task.status === StatusMode.pending).length);
   cancelCount = computed(() => this.tasksSignal()
  .filter(task => task.status === StatusMode.cancel).length);
   processCount = computed(() => this.tasksSignal()
  .filter(task => task.status === StatusMode.process).length);
  
  mouseenter(){
    this.show.update(() =>true)
  }

  mouseleave(){
    this.show.update(() =>false)
  }

}
 
