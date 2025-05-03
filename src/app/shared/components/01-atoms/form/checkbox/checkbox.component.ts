import {Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'shared-checkbox',
  standalone: false,
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor, OnChanges{

  @Input() id!: string;
  @Input() label!: string;
  @Input() type: 'checkbox' | 'radio' = 'checkbox';
  @Input() name: string | null = null;
  @Input() value: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() required: boolean = false;
  @Input() modifiers: string[] = [];
  @Input() errorMessage: string = '';
  sanitizedLabel: SafeHtml = '';
  isHtmlLabel: boolean = false;

  constructor(private sanitizer: DomSanitizer) {
  }
  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onCheckboxChange(): void {
    this.checked = !this.checked;
    this.onChange(this.checked);
    this.onTouched();
  }
  getCheckboxClasses(): string {
    const classes = ['checkbox'];
    if (this.modifiers.length > 0) {
      classes.push(...this.modifiers.map((modifier) => `checkbox--${modifier}`));
    }
    return classes.join(' ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['label']) {
      this.isHtmlLabel = this.containsHtml(this.label);
      this.sanitizedLabel = this.isHtmlLabel
        ? this.sanitizer.bypassSecurityTrustHtml(this.label)
        : '';
    }
  }

  private containsHtml(text: string): boolean {
    const htmlRegex = /<\/?[a-z][\s\S]*>/i;
    return htmlRegex.test(text);
  }
}
