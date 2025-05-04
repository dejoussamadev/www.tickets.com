// edit-ticket.component.ts
import {Component, OnInit} from '@angular/core';
import {TicketDto} from '../../dtos/ticket.dto';
import {TicketsService} from '../../tickets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateTicketDto} from '../../dtos/create-ticket.dto';
import {UserDto} from '../../../../shared/dtos/user.dto';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'tickets-edit-ticket',
  standalone: false,
  templateUrl: './edit-ticket.component.html',
  styleUrl: './edit-ticket.component.scss'
})
export class EditTicketComponent implements OnInit {
  ticketId!: string;
  ticket?: TicketDto;
  ticketForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    assignedTo: new FormControl('')
  });
  isLoading = true;
  priorities = [{value: 'low', label: 'Low'}, {value: 'medium', label: 'Medium'}, {value: 'high', label: 'High'}];
  statuses = [{value: 'open', label: 'Open'}, {value: 'in-progress', label: 'In Progress'}, {value: 'resolved', label: 'Resolved'}, {value: 'closed', label: 'Closed'}];
  categories = ['Bug', 'Feature', 'Support', 'Documentation', 'Other'];
  users: UserDto[] = [];
  submitError = '';
  submitSuccess = false;



  constructor(
    private _ticketService: TicketsService,
    private route$: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.loadUsers();

    this.route$.params.subscribe(params => {
      this.ticketId = params['id']; // Access the 'id' parameter from the URL
      console.log('Ticket ID:', this.ticketId);
      this.getTicketDetails();
    });
  }

/*
  private initTicketForm(): void {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
      assignedTo: ['']
    });
  }
*/

  private loadUsers(): void {
    this._ticketService.getAgentToAssignTo().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res;
      },
      error: (err: Error) => {
        console.log("error", err);
      }
    })
    this.users = [];
  }

  getTicketDetails() {
    this._ticketService.getTicketById(this.ticketId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.ticket = res;
        this.populateForm();
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.log("error", err);
        this.isLoading = false;
      }
    });
  }

  private populateForm(): void {
    if (this.ticket) {
      this.ticketForm.patchValue({
        title: this.ticket.title,
        description: this.ticket.description,
        category: this.ticket.category,
        priority: this.ticket.priority,
        status: this.ticket.status,
        assignedTo: this.ticket.assignedTo?._id || ''
      });
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid && this.ticket) {
      this.isLoading = true;
      this.submitError = '';

      const updatedTicket: Partial<CreateTicketDto> = {
        ...this.ticketForm.value,
      };

      this._ticketService.editTicket(this.ticketId, updatedTicket).subscribe({
        next: (res) => {
          console.log('Ticket updated:', res);
          this.isLoading = false;
          this.submitSuccess = true;

          // Navigate back to ticket details after short delay
          setTimeout(() => {
            this.router.navigate(['/dashboard/tickets/ticket', this.ticketId]);
          }, 1500);
        },
        error: (err) => {
          console.error('Error updating ticket:', err);
          this.isLoading = false;
          this.submitError = 'Failed to update ticket. Please try again.';
        }
      });
    }
  }

  /**
   * Navigate back to ticket details
   */
  cancelEdit(): void {
    this.router.navigate(['/dashboard/tickets/ticket', this.ticketId]);
  }

  /**
   * Check if the form field is invalid and has been touched
   */
  isFieldInvalid(field: string): boolean {
    const formControl = this.ticketForm.get(field);
    return !!formControl && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  /**
   * Get error message for form field
   */
  getErrorMessage(field: string): string {
    const formControl = this.ticketForm.get(field);

    if (!formControl) return '';

    if (formControl.hasError('required')) {
      return 'This field is required';
    }

    if (formControl.hasError('minlength')) {
      const requiredLength = formControl.getError('minlength').requiredLength;
      return `Minimum length is ${requiredLength} characters`;
    }

    return '';
  }
}
