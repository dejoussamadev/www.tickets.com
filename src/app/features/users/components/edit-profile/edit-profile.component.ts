import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { UserDto } from '../../../../shared/dtos/user.dto';
import {strongPasswordValidator} from '../../../../shared/validators/strong-password.validator';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'users-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, strongPasswordValidator()]),
  });
  user: UserDto | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    protected router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.isLoading = true;
    this.error = null;

    if (isPlatformBrowser(this.platformId)) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this._userService.getUserById(userId).subscribe({
          next: (userData: any) => {
            this.user = userData;
            this.isLoading = false;
          },
          error: (err: Error) => {
            this.error = 'Failed to load profile information. Please try again.';
            this.isLoading = false;
            console.error('Error loading user profile:', err);
          }
        });
      } else {
        this.error = 'User ID not found in localStorage.';
        this.isLoading = false;
      }
    } else {
      this.error = 'localStorage is not available in this environment.';
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.editProfileForm.invalid) {
      return;
    }

    const updatedUser = { ...this.user, ...this.editProfileForm.value };
    this._userService.updateUser(updatedUser).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/users/profile-details']);
      },
      error: (err: Error) => {
        this.error = 'Failed to update profile. Please try again.';
        console.error('Error updating profile:', err);
      }
    });
  }
}
