import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Moment } from 'moment';

@Component({
    selector: 'app-datepicker',
    standalone: false,
    template: `
    <div class="form-group">
      <label *ngIf="label">{{ label }}</label>
      <nz-date-picker
        [nzPlaceHolder]="placeholder"
        [ngModel]="value"
        [nzDisabled]="disabled"
        (ngModelChange)="handleChange($event)"
        (blur)="handleBlur()"
        ></nz-date-picker>
      <small class="error" *ngIf="error">{{ error }}</small>
    </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AppDatePickerComponent),
            multi: true,
        },
    ],
})
export class AppDatePickerComponent implements ControlValueAccessor {
    @Input() label?: string;
    @Input() placeholder: string = 'Chọn...';
    @Input() disabled: boolean = false;
    @Input() error?: string;

    value: Moment | null = null;

    private onChange: (value: Moment | null) => void = () => { };
    private onTouched: () => void = () => { };

    // Gọi khi form control thay đổi giá trị
    writeValue(value: Moment | null): void {
        this.value = value;
    }

    registerOnChange(fn: (value: Moment | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleChange(value: Moment | null): void {
        this.value = value;
        this.onChange(value); // thông báo cho form control
    }

    handleBlur(): void {
        this.onTouched(); // thông báo touch
    }
}
