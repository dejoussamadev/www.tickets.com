import {Component, forwardRef, Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'shared-input',
  standalone: false,
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() id!: string;
  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() maxlength: number | null = null;
  @Input() formControlName: string = '';
  @Input() minlength: number | null = null;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  @Input() modifiers: string[] = [];
  @Input() icon: string = '';

  isPasswordVisible: boolean = false;
  value: string = '';

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
    this.onTouched();
  }

  getInputClasses(): string {
    const classes = ['input'];
    if (this.modifiers.length > 0) {
      classes.push(...this.modifiers.map((modifier) => `input--${modifier}`));
    }
    return classes.join(' ');
  }
}
