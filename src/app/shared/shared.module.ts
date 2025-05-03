import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ButtonComponent } from './components/01-atoms/button/button.component';
import { ImageComponent } from './components/01-atoms/image/image.component';
import {CheckboxComponent} from './components/01-atoms/form/checkbox/checkbox.component';
import {InputComponent} from './components/01-atoms/form/input/input.component';
import {SelectComponent} from './components/01-atoms/form/select/select.component';
import {NgIconsModule} from '@ng-icons/core';
import {heroEnvelopeSolid, heroLockClosedSolid} from '@ng-icons/heroicons/solid';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CdkFixedSizeVirtualScroll, ScrollingModule} from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    ButtonComponent,
    ImageComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroEnvelopeSolid,
      heroLockClosedSolid
    }),
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgOptimizedImage,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
  ],
  exports: [
    // Components
    ButtonComponent,
    ImageComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,

    // Modules
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class SharedModule { }
