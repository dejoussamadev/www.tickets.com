// ticket-details.component.ts
import {Component, OnInit} from '@angular/core';
import {TicketDto} from '../../dtos/ticket.dto';
import {TicketsService} from '../../tickets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentDto} from '../../dtos/comment.dto';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'tickets-ticket-details',
  standalone: false,
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss'
})
export class TicketDetailsComponent implements OnInit {
  ticketId!: string;
  ticket?: TicketDto;
  commentForm!: FormGroup;
  isLoading = true;

  constructor(
    private _ticketService: TicketsService,
    private route$: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initCommentForm();
    this.route$.params.subscribe(params => {
      this.ticketId = params['id']; // Access the 'id' parameter from the URL
      this.getTicketDetails();
    });
  }

  private initCommentForm(): void {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  getTicketDetails() {
    this._ticketService.getTicketById(this.ticketId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.ticket = res;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.log("error", err);
        this.isLoading = false;
      }
    });
  }

  /**
   * Submit a new comment
   */
  submitComment(): void {
    if (this.commentForm.valid && this.ticket) {
      const comment: Partial<CommentDto> = {
        content: this.commentForm.value.content,
      };

      this._ticketService.addComment(this.ticketId, comment).subscribe({
        next: (res: any) => {
          console.log(res)
        },
        error: (err) => {
          console.error('Error adding comment:', err);
        }
      });
    }
  }

  /**
   * Navigate to edit ticket
   */
  editTicket(): void {
    this.router.navigate(['/dashboard/tickets/edit-ticket', this.ticketId]);
  }

  /**
   * Navigate back to tickets list
   */
  goBack(): void {
    this.router.navigate(['/dashboard/tickets']);
  }

  /**
   * Format date for display
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }

  /**
   * Get user name from comment's user ID
   */
  getUserName(userId: string): string {
    // This would typically use a service to get user details
    // For now, returning the user ID as a placeholder
    return userId;
  }

  addComment() {

  }
}
