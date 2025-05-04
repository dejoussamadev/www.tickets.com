import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);

  // Define URLs to exclude from token interceptor
  const excludedUrls = [
    '/api/auth/login',
    '/api/auth/register',
  ];

  // Check if the request URL contains any of the excluded paths
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  // If the request is for an excluded URL, don't add the token
  if (isExcluded) {
    return next(req);
  }

  // Get token from localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Clone the request and add the authorization header
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    // Forward the new request and handle errors
    return next(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Clear token and redirect to login on 401 Unauthorized
          localStorage.removeItem('token');
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }

  // If no token exists, just forward the original request
  return next(req);
};
