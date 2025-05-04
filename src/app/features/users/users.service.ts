import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http$: HttpClient) { }

  getUserById(userId: string) {
    return this.http$.get(`${environment.API_URL}/api/users/${userId}`);
  }

  getProfileStats(){
    return this.http$.get(`${environment.API_URL}/api/users/me/stats`);
  }

  updateUser(updatedUser: any) {
    return this.http$.put(`${environment.API_URL}/api/users/me`, updatedUser);
  }
}
