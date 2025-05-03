import {Component, Input} from '@angular/core';

@Component({
  selector: 'shared-alert',
  templateUrl: './alert.component.html',
  standalone: false,
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  // ********************************
  // Declarations
  // ********************************
  @Input() content: string = '';
  @Input() icon?: string;
  @Input() type: 'info' | 'success' | 'warning' | 'danger' = 'info';
}
