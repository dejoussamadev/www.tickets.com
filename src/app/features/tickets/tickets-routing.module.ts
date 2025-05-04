import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreateTicketComponent} from './components/create-ticket/create-ticket.component';
import {TicketListComponent} from './components/ticket-list/ticket-list.component';
import {TicketDetailsComponent} from './components/ticket-details/ticket-details.component';
import {DashboardComponent} from '../../shared/components/05-pages/dashboard/dashboard.component';
import { EditTicketComponent } from './components/edit-ticket/edit-ticket.component';

export const routes: Routes = [
  {
    path: 'list',
    component: TicketListComponent,
  },
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
  },
  {
    path: 'edit-ticket/:id',
    component: EditTicketComponent,
  },
  {
    path: 'ticket/:id',
    component: TicketDetailsComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
