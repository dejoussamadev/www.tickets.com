import {
  Component, ElementRef,
  forwardRef, HostListener,
  Input, Signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {SelectOptionType} from '../../../../types';

@Component({
  selector: 'shared-select',
  templateUrl: './select.component.html',
  standalone: false,
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: SelectOptionType | Signal<SelectOptionType> = [];
  @Input() placeholder: string = 'Select an option';
  @Input() name?: string;
  @Input() label?: string;
  @Input() id?: string;
  @Input() required: boolean = false;
  @Input() modifiers: string[] = [];
  @Input() errorMessage: string = '';

  dropdownOpen = false;
  selectedValue: any;
  selectedLabel: string | null = null;

  // Functions to propagate changes to the parent form control
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};


  constructor(private eRef: ElementRef) {
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: { label: string; value: any }): void {
    this.selectedValue = option.value;
    this.selectedLabel = option.label;

    // Notify the parent form control of the change
    this.onChange(this.selectedValue);
    this.onTouched();
    this.dropdownOpen = false; // Close the dropdown after selection
  }

  // ControlValueAccessor interface methods
  writeValue(value: any): void {
    this.selectedValue = value;
    // Determine the options array based on whether `this.options` is a signal or a plain array.
    let optionsArray: SelectOptionType;
    if (typeof this.options === 'function') {
      // Assuming signals are implemented as functions.
      optionsArray = (this.options as () => { label: string; value: any }[])();
    } else {
      optionsArray = this.options;
    }
    const selectedOption = optionsArray.find((opt) => opt.value === value);
    this.selectedLabel = selectedOption ? selectedOption.label : null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getSelectClasses(): string {
    const classes = ['select'];
    if (this.modifiers.length > 0) {
      classes.push(...this.modifiers.map((modifier) => `select--${modifier}`));
    }
    return classes.join(' ');
  }

  get resolvedOptions(): { label: string; value: any }[] {
    // Check if options is a function (i.e. a signal)
    return typeof this.options === 'function'
      ? (this.options as () => { label: string; value: any }[])()
      : this.options;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  protected readonly ITEM_HEIGHT = 28;
  protected readonly MAX_ITEMS_SHOWN = 4;

  getViewportHeight(): number {
    const itemCount = this.resolvedOptions.length;
    const maxHeight = this.ITEM_HEIGHT * this.MAX_ITEMS_SHOWN;
    return Math.min(itemCount * this.ITEM_HEIGHT, maxHeight);
  }
}
