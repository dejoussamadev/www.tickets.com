import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {customEmailValidator} from '../../../../shared/validators/email.validator';
import {strongPasswordValidator} from '../../../../shared/validators/strong-password.validator';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
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
    const loginObject: LoginDto = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }

    this._authService.login(loginObject).subscribe({
      next: (res: any)=>{
        this.router$.navigateByUrl('/home')
      },
      error: (err: Error) => {
        console.log("error", err);
      }
    })
  }
}
