import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {customEmailValidator} from '../../../../shared/validators/email.validator';
import {strongPasswordValidator} from '../../../../shared/validators/strong-password.validator';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {LoginDto} from '../../dtos/login.dto';

@Component({
  selector: 'auth-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, customEmailValidator]),
    password: new FormControl('', [Validators.required, strongPasswordValidator]),
  });

  constructor(private _authService: AuthService, private router$: Router) {}


  login(){
    const loginDto: LoginDto = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    console.log(loginDto)
    this._authService.login(loginDto).subscribe({
      next: (res: any)=>{
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.user.id);
        localStorage.setItem('userEmail', res.user.email);
        localStorage.setItem('userRole', res.user.role);
        this.router$.navigateByUrl('/dashboard')
      },
      error: (err: Error) => {
        console.log("error", err);
      }
    })
  }
}
