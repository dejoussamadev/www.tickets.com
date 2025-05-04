import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateTicketDto} from './dtos/create-ticket.dto';
import {environment} from '../../../environments/environment.development';
import {CommentDto} from './dtos/comment.dto';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http$: HttpClient) { }

  createTicket(ticket: CreateTicketDto, userId: string) {
    return this.http$.post(`${environment.API_URL}/tickets`, ticket);
  }

  getAllTickets(){
    return this.http$.get(`${environment.API_URL}/api/tickets`);
  }

  getTicketById(ticketId: string){
    return this.http$.get(`${environment.API_URL}/api/tickets/${ticketId}`);
  }

  addComment(ticketId: string, comment: Partial<CommentDto>) {
    return this.http$.post(`${environment.API_URL}/api/tickets/${ticketId}/comments`, comment);
  }

  editTicket(ticketId: string, ticket: Partial<CreateTicketDto>) {
    return this.http$.put(`${environment.API_URL}/api/tickets/${ticketId}`, ticket);
  }

  getAgentToAssignTo() {
    return this.http$.get(`${environment.API_URL}/api/users/getUsersToAssignTo`);
  }
}
