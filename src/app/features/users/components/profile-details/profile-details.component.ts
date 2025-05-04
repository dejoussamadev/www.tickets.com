import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {UsersService} from '../../users.service';
import {UserDto} from '../../../../shared/dtos/user.dto';

interface ActivityItem {
  type: string; // 'ticket', 'comment', 'profile'
  description: string;
  timestamp: string;
}

class TicketService {
}

@Component({
  selector: 'users-profile-details',
  standalone: false,
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  providers: [DatePipe]
})
export class ProfileDetailsComponent implements OnInit {
  user: UserDto | null = null;
  isLoading = true;
  error: string | null = null;

  // Statistics
  assignedTickets = 0;
  createdTickets = 0;

  constructor(
    private _userService: UsersService,
    private router$: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadProfileStats();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.error = null;
    const userId = localStorage.getItem('userId');
    // Get the current user profile
    this._userService.getUserById(userId!).subscribe({
      next: (userData: any) => {
        this.user = userData;
        this.isLoading = false;

        // After loading the user, fetch related statistics
      },
      error: (err: Error) => {
        this.error = 'Failed to load profile information. Please try again.';
        this.isLoading = false;
        console.error('Error loading user profile:', err);
      }
    });
  }

  loadProfileStats(){
    this._userService.getProfileStats().subscribe({
      next: (res: any) => {
        console.log(res);
        this.assignedTickets = res.stats.assignedTickets;
        this.createdTickets = res.stats.createdTickets;
      },
      error: (err: Error) => {
        console.log("error", err);
      }
    })
  }

  getUserInitials(user: UserDto): string {
    if (!user || !user.name) return '';

    const nameParts = user.name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    // Convert to a more user-friendly format
    return this.datePipe.transform(dateString, 'MMM d, y') || '';
  }

  getActivityIcon(type: string): string {
    switch (type) {
      case 'ticket':
        return 'heroTicketSolid';
      case 'comment':
        return 'heroAnnotationSolid';
      case 'profile':
        return 'heroUserSolid';
      default:
        return 'heroDocumentSolid';
    }
  }

  onEdit(): void {
    this.router$.navigate(['/dashboard/users/edit-profile']);
  }
}
