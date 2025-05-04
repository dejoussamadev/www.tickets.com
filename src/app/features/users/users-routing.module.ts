import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardComponent} from '../../shared/components/05-pages/dashboard/dashboard.component';
import {ProfileDetailsComponent} from './components/profile-details/profile-details.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileDetailsComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
  },
  {
    path: '**',
    redirectTo: 'profile',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
