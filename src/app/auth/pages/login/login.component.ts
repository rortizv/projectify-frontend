import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }


  login() {
    const { email, password } = this.myForm.value;

    this.authService.login(email, password).subscribe(
      response => {
        if (response.token) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', response.error.message, 'error');
        }
      },
      error => {
        Swal.fire('Error', error.message, 'error');
      }
    );
  }

}
