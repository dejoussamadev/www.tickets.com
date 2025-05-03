import {Component, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

export interface DropdownDto {
  label?: string;
  icon?: string;
  options: Array<{ label: string, url?: string | any[], id?: string }>;
}

@Component({
  selector: 'shared-dropdown',
  standalone: false,

  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {

  // ********************************
  // Declarations
  // ********************************
  @Input() modifiers: string[] = [];
  @Input() dropdownContent!: DropdownDto;
  @Input() type: 'btn' | 'link' = 'link';
  @Output() btnClick: EventEmitter<any> = new EventEmitter();

  dropdownIsOpen: boolean = false;


  // ********************************
  // Lifecycle Hooks
  // ********************************
  constructor(private eRef: ElementRef) {}


  // ********************************
  // UI Interactivity
  // ********************************
  toggleDropdown(){
    this.dropdownIsOpen = !this.dropdownIsOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.dropdownIsOpen = false;
    }
  }

  generateDropdownClasses(){
    const classes = ['dropdown'];
    if (this.modifiers.length > 0) {
      classes.push(...this.modifiers.map((modifier) => `dropdown--${modifier}`));
    }
    return classes.join(' ');
  }

  generateBtnModifiers(){
    let btnModifiers= [];
    if(this.dropdownIsOpen) {
      btnModifiers = ['dropdown', 'dropdown-active'];
    }else{
      btnModifiers = ['dropdown'];
    }
    btnModifiers.push(...this.modifiers)
    return btnModifiers;
  }

  // ********************************
  // Logic
  // ********************************
  btnClickFN(id: string){
    this.btnClick.emit(id);
    this.toggleDropdown();
  }
}
