import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksToolTipComponent } from './tasks-tool-tip.component';

describe('TasksToolTipComponent', () => {
  let component: TasksToolTipComponent;
  let fixture: ComponentFixture<TasksToolTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksToolTipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksToolTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
