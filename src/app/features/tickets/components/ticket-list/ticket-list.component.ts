import { Component, OnInit } from '@angular/core';
import {TicketsService} from '../../tickets.service';
import {Router} from '@angular/router';

@Component({
  selector: 'tickets-ticket-list',
  standalone: false,
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit{
  tickets = [];

  constructor(private _ticketsService: TicketsService, private router$: Router) {}

  ngOnInit() {
    this.getAllTicket();
  }

  getAllTicket(){
    this._ticketsService.getAllTickets().subscribe({
      next: (res: any)=>{
        console.log(res);
        this.tickets = res;
      },
      error: (err: Error) => {
        console.log("error", err);
      }
    })
  }
}
