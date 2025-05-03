import {Component, Input} from '@angular/core';

@Component({
  selector: 'shared-logo',
  standalone: false,

  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() alt: string = '';
  @Input() size: "sm" | "default" | "lg" = "default";
  @Input() mini: boolean = false;
}
