import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TicketsService} from '../../tickets.service';
import {CreateTicketDto} from '../../dtos/create-ticket.dto';
import {Router} from '@angular/router';

@Component({
  selector: 'tickets-create-ticket',
  standalone: false,
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss'
})
export class CreateTicketComponent {

  createTicketForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    assignedTo: new FormControl('', [Validators.required]),
  });

  constructor(private _ticketsService: TicketsService, private router$: Router) {
  }

  createTicket(){
    const ticket: CreateTicketDto = {
      title: this.createTicketForm.get('title')?.value,
      description: this.createTicketForm.get('description')?.value,
      category: this.createTicketForm.get('category')?.value,
      priority: this.createTicketForm.get('priority')?.value,
      assignedTo: this.createTicketForm.get('assignedTo')?.value,
    }
    this._ticketsService.createTicket(ticket, localStorage.getItem('token')!).subscribe({
      next: (res: any)=>{
        console.log(res);
        this.router$.navigateByUrl('/tickets/list')
      },
      error: (err: Error) => {
        console.log("error", err);
      }
    });
  }
}
