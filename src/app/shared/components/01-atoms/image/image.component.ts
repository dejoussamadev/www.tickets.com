import {Component, Input} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'shared-image',
  standalone: false,
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input() src: string | undefined = "assets/default-avatar.png";
  @Input() alt: string = "";
  @Input() width: number | string = 24;
  @Input() height: number | string = 24;
  @Input() imageLoading: boolean = false;
  @Input() modifiers: string[] = [];


  getImageClasses(): string {
    const classes = ['image'];
    if (this.modifiers.length > 0) {
      classes.push(...this.modifiers.map((modifier) => `image--${modifier}`));
    }
    return classes.join(' ');
  }
  get safeSrc(): string {
    if(!this.src || this.src==""){
      return 'assets/default-avatar.png';
    }else{
      return this.src;
    }
  }
}
