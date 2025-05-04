import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Check if running in the browser
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token');

    // If token exists, allow access; otherwise, redirect to login
    if (token) {
      return true;
    }
  }

  // Redirect to login if not in the browser or no token
  router.navigate(['/login']);
  return false;
};
