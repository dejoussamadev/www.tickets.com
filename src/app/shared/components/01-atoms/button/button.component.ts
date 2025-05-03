import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {type} from 'node:os';

@Component({
  selector: 'shared-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent  {

  // ********************************
  // Declarations
  // ********************************
  @Input() modifiers: string[] = [];
  @Input() disabled: boolean = false;
  @Input() type: 'btn' | 'link' = 'btn';
  @Input() url: string | any[] = '';
  @Input() routerLinkActive: string = '';
  @Output() onClick = new EventEmitter<Event>();

  // ********************************
  // UI Interactivity
  // ********************************
  generateButtonClasses(){
    const classes = ['btn'];
    if (this.modifiers.length > 0) {
      classes.push(...this.modifiers.map((modifier) => `btn--${modifier}`));
    }
    return classes.join(' ');
  }

  // ********************************
  // Logic
  // ********************************
  formatUrl(url: string | any[]): any[] {
    if (typeof url === 'string') {
      return [url];
    }
    return url;
  }
}
