import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ButtonComponent } from './components/01-atoms/button/button.component';
import { ImageComponent } from './components/01-atoms/image/image.component';
import {CheckboxComponent} from './components/01-atoms/form/checkbox/checkbox.component';
import {InputComponent} from './components/01-atoms/form/input/input.component';
import {SelectComponent} from './components/01-atoms/form/select/select.component';
import {NgIconsModule} from '@ng-icons/core';
import {
  heroArrowRightEndOnRectangleSolid,
  heroChevronDownSolid,
  heroEnvelopeSolid,
  heroEyeSlashSolid,
  heroEyeSolid,
  heroLockClosedSolid, heroPencilSquareSolid, heroTicketSolid,
  heroUserSolid
} from '@ng-icons/heroicons/solid';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {CdkFixedSizeVirtualScroll, ScrollingModule} from '@angular/cdk/scrolling';
import {DashboardComponent} from './components/05-pages/dashboard/dashboard.component';
import {SidebarComponent} from './components/03-organisms/sidebar/sidebar.component';
import {heroPaperAirplane} from '@ng-icons/heroicons/outline';


@NgModule({
  declarations: [
    ButtonComponent,
    ImageComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,
    SidebarComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroEnvelopeSolid,
      heroLockClosedSolid,
      heroEyeSlashSolid,
      heroEyeSolid,
      heroUserSolid,
      heroArrowRightEndOnRectangleSolid,
      heroTicketSolid,
      heroPencilSquareSolid,
      heroPaperAirplane,
      heroChevronDownSolid,
    }),
    RouterLink,
    RouterLinkActive,
    FormsModule,
    NgOptimizedImage,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
    RouterOutlet,
  ],
  exports: [
    // Components
    ButtonComponent,
    ImageComponent,
    CheckboxComponent,
    InputComponent,
    SelectComponent,
    DashboardComponent,

    // Modules
    ReactiveFormsModule,
    NgOptimizedImage
  ]
})
export class SharedModule { }
