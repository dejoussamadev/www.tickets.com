import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    {
      icon: 'heroTicketSolid',
      label: 'Tickets',
      link: ['/dashboard/tickets']
    },
    {
      icon: 'heroUserSolid',
      label: 'Profile',
      link: ['/dashboard/users/profile']
    }
  ];

  constructor(private router$: Router) {}

  logout() {
    localStorage.clear();
    this.router$.navigateByUrl('/login');
  }
}
