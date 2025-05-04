import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.development';
import {RegisterDto} from './dtos/register.dto';
import {LoginDto} from './dtos/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http$: HttpClient) { }

  login(loginDto: LoginDto) {
    return this.http$.post(`${environment.API_URL}/api/auth/login`, loginDto);
  }

  register(registerDto: RegisterDto) {
    return this.http$.post(`${environment.API_URL}/api/auth/register`, registerDto);
  }
}
