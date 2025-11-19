// shared/custom-range-picker.component.ts
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Moment from 'moment'

@Component({
    selector: 'app-custom-range-picker',
    standalone: false,
    template: `
    <div class="form-group">
      <label *ngIf="label">{{ label }}</label>
      <nz-range-picker
        [nzPlaceHolder]="placeholder"
        [nzFormat]="nzFormat"
        [ngModel]="value"
        [nzDisabled]="disabled"
        (ngModelChange)="handleChange($event)"
        (blur)="handleBlur()"
        ></nz-range-picker>
      <small class="error" *ngIf="error">{{ error }}</small>
    </div>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomRangePickerComponent),
            multi: true
        }
    ]
})
export class CustomRangePickerComponent implements ControlValueAccessor {
    @Input() label?: string;
    @Input() placeholder: [string, string] = ['Start date', 'End date'];
    @Input() nzFormat: string = 'YYYY-MM-DD';
    @Input() error?: string;

    // @ts-ignore
    value: [Moment | null, Moment | null] = [null, null];
    disabled = false;

    // @ts-ignore
    private onChange: (value: [Moment | null, Moment | null]) => void = () => { };
    private onTouched: () => void = () => { };

    // @ts-ignore
    writeValue(value: [Moment | null, Moment | null]): void {
        this.value = value || [null, null];
    }

    // @ts-ignore
    registerOnChange(fn: (value: [Moment | null, Moment | null]) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // @ts-ignore
    handleChange(value: [Moment | null, Moment | null]): void {
        this.value = value;
        this.onChange(value);
    }

    handleBlur(): void {
        this.onTouched();
    }
}
