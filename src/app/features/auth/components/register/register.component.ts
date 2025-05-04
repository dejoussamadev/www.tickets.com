import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {register} from 'node:module';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';
import {RegisterDto} from '../../dtos/register.dto';

@Component({
  selector: 'auth-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _authService: AuthService, private router$: Router) {
  }
  register(){
    const registerDto: RegisterDto = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
    }
    this._authService.register(registerDto).subscribe({
      next: (res: any)=>{
        this.router$.navigateByUrl('/login')
      },
      error: (err: Error) => {
        console.log("error", err);
      }
    })
  };
}
