import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateTicketComponent} from './components/create-ticket/create-ticket.component';
import {EditTicketComponent} from './components/edit-ticket/edit-ticket.component';
import {TicketDetailsComponent} from './components/ticket-details/ticket-details.component';
import {TicketListComponent} from './components/ticket-list/ticket-list.component';
import {TicketsRoutingModule} from './tickets-routing.module';
import {RouterLink} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {NgIcon} from '@ng-icons/core';
import { TicketCardComponent } from './components/ticket-card/ticket-card.component';



@NgModule({
  declarations: [
    CreateTicketComponent,
    EditTicketComponent,
    TicketDetailsComponent,
    TicketListComponent,
    TicketCardComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    RouterLink,
    SharedModule,
    NgIcon,
  ]
})
export class TicketsModule { }
