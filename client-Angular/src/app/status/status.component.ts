import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { StatusMode } from '../model/statusMode';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconsPipe } from '../pipe/icons.pipe';

@Component({
  selector: 'app-status',
  imports: [CommonModule, MatIconModule, MatTooltipModule, IconsPipe],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusComponent),
      multi: true
    }
  ]
})
export class StatusComponent implements ControlValueAccessor {
  theStatusEnum = StatusMode;
  statusModes = Object.values(StatusMode).filter(v => typeof v === 'number') as number[];

  private _status: StatusMode = StatusMode.pending;
  disabled = false;
  @Input() canChangeStatus: boolean = false;

  get status(): StatusMode {
    return this._status;
  }

  @Input() set status(val: StatusMode) {
    this._status = val;
    this.onChange(val);
    this.onTouched();
  }

  // ControlValueAccessor
  onChange: (val: StatusMode) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: StatusMode): void {
    if (value !== undefined && value !== null) {
      this._status = value;
    }
  }

  registerOnChange(fn: (val: StatusMode) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  statusToString(status: StatusMode): string {
    switch (status) {
      case StatusMode.pending:
        return 'ממתין';
      case StatusMode.process:
        return 'בתהליך';
      case StatusMode.completed:
        return 'בוצע';
      case StatusMode.cancel:
        return 'בוטל';
      default:
        return '';
    }
  }

  changeStatus(status: StatusMode): void {
    if (this.canChangeStatus && !this.disabled) {
      this._status = status;
      this.onChange(status);
      this.onTouched();
    }
  }
}
