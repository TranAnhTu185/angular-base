import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: false,
  template: `
    <label nz-checkbox
           [ngModel]="value"
           (ngModelChange)="onChangeValue($event)"
           (blur)="onTouched()"
           [nzDisabled]="disabled">
      {{ label }}
    </label>
    <small class="error" *ngIf="error">{{ error }}</small>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCheckboxComponent),
      multi: true,
    },
  ],
})
export class AppCheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() error?: string;

  value: boolean = false;

  // CVA
  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: boolean): void {
    this.value = val;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChangeValue(val: boolean) {
    this.value = val;
    this.onChange(val);
  }
}
