import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TicketDto } from '../../dtos/ticket.dto';
import {Router} from '@angular/router';

@Component({
  selector: 'tickets-ticket-card',
  standalone: false,
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.scss'
})
export class TicketCardComponent {
  @Input() ticket!: TicketDto;

  constructor(private router: Router) {}

  /**
   * Navigate to ticket details
   */
  viewDetails(): void {
    console.log(this.ticket);
    this.router.navigate(['/dashboard/tickets/ticket/', this.ticket._id]);
  }

  /**
   * Navigate to edit ticket
   */
  editTicket(): void {
    // this.router.navigate(['/dashboard/tickets/edit-ticket', this.ticket.id]);
  }}
