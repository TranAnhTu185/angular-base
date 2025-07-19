import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor, Validator, OnInit {
  @Input() id = `input-${Math.random().toString(36).substring(2)}`;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() required = false;
  @Input() disabled = false;
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() allowClear = false;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() pattern?: string | RegExp;
  @Input() patternMessage = 'Invalid format';
  errorMessage = '';

  value: any = '';
  control: FormControl = new FormControl;

  private onChange: any = () => { };
  private onTouched: any = () => { };

  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  ngOnInit() {
    this.control = new FormControl(this.value, [
      control => this.validate(control)
    ]);
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value;
    if (this.control) {
      this.control.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Validator method
  validate(control: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};
    let hasError = false;

    if (this.required && !control.value) {
      errors['required'] = true;
      hasError = true;
    }

    if (this.minLength && control.value?.length < this.minLength) {
      errors['minlength'] = { requiredLength: this.minLength, actualLength: control.value?.length };
      hasError = true;
    }

    if (this.maxLength && control.value?.length > this.maxLength) {
      errors['maxlength'] = { requiredLength: this.maxLength, actualLength: control.value?.length };
      hasError = true;
    }

    if (this.pattern) {
      const regex = typeof this.pattern === 'string' ? new RegExp(this.pattern) : this.pattern;
      if (control.value && !regex.test(control.value)) {
        errors['pattern'] = true;
        hasError = true;
      }
    }
    if (this.type === 'email') {
      if (control.value && !this.emailPattern.test(control.value)) {
        errors['email'] = true;
        hasError = true;
      }
    }
    this.getErrorMessage();
    return hasError ? errors : null;
  }

  get showClear(): boolean {
    return this.allowClear && !!this.value && !this.disabled;
  }

  getErrorMessage() {
    if (!this.control) this.errorMessage = '';

    if (this.control.hasError('required')) {
      this.errorMessage = 'This field is required';
    }

    if (this.control.hasError('minlength')) {
      const error = this.control.getError('minlength');
      this.errorMessage = `Minimum length is ${error.requiredLength} characters`;
    }

    if (this.control.hasError('maxlength')) {
      const error = this.control.getError('maxlength');
      this.errorMessage = `Maximum length is ${error.requiredLength} characters`;
    }

    if (this.control.hasError('pattern')) {
      this.errorMessage = this.patternMessage;
    }
    if (this.control.hasError('email')) {
      this.errorMessage = 'Please enter a valid email address';
    }
  }

  onValueChange(value: any) {
    this.value = value;
    this.onChange(value);
    if (this.control) {
      this.control.setValue(value);
      this.control.markAsTouched();
    }
  }

  onBlur() {
    this.onTouched();
  }

  clearInput() {
    this.value = '';
    this.onChange('');
    if (this.control) {
      this.control.setValue('');
    }
  }
}
