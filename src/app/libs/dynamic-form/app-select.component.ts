import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: false,
  template: `
    <div class="form-group">
      <label *ngIf="label">{{ label }}</label>
      <nz-select
        [nzPlaceHolder]="placeholder"
        [nzDisabled]="disabled"
        [nzMode]="mode"
        [ngModel]="value"
        (ngModelChange)="onChangeValue($event)"
        (blur)="onTouched()"
        style="width: 100%"
      >
        <nz-option
          *ngFor="let option of options"
          [nzValue]="option.value"
          [nzLabel]="option.label"
        ></nz-option>
      </nz-select>
      <small class="error" *ngIf="error">{{ error }}</small>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true,
    },
  ],
})
export class AppSelectComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() placeholder: string = 'Chọn...';
  @Input() disabled: boolean = false;
  @Input() error?: string;
  @Input() mode: 'default' | 'multiple' | 'tags' = 'default';
  @Input() options: { value: any; label: string }[] = [];

  value: any;

  // CVA
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChangeValue(val: any) {
    this.value = val;
    this.onChange(val);
  }
}
