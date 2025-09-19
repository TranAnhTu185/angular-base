import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  standalone: false,
  template: `
    <div class="form-group">
      <label *ngIf="label">{{ label }}</label>
      <nz-input-number
        [nzMin]="min"
        [nzMax]="max"
        [nzStep]="step"
        [nzDisabled]="disabled"
        [ngModel]="value"
        (ngModelChange)="onChangeValue($event)"
        (blur)="onTouched()"
        style="width: 100%"
      ></nz-input-number>
      <small class="error" *ngIf="error">{{ error }}</small>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppNumberInputComponent),
      multi: true,
    },
  ],
})
export class AppNumberInputComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() min: number = 0;
  @Input() max: number = 999999;
  @Input() step: number = 1;
  @Input() disabled: boolean = false;
  @Input() error?: string;

  value: number | null = null;

  // CVA
  onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: number | null): void {
    this.value = val;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChangeValue(val: number | null) {
    this.value = val;
    this.onChange(val);
  }
}
