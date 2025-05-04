import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import {UsersRoutingModule} from './users-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {NgIcon} from '@ng-icons/core';



@NgModule({
  declarations: [
    EditProfileComponent,
    ProfileDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgIcon
  ],
  exports: [
    EditProfileComponent,
    ProfileDetailsComponent
  ]
})
export class UsersModule { }
