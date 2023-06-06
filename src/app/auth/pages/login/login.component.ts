import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { delay } from 'rxjs';

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


  async login() {
    const { email, password } = this.myForm.value;
    // Display loading message using SweetAlert2
    Swal.fire({
      title: 'Logging in',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    await this.authService.login(email, password)
    .pipe(delay(700))
    .subscribe(
      response => {
        if (response.token) {
          this.router.navigateByUrl('/dashboard');
          Swal.fire({
            title: 'Login succesfull',
            text: 'You have logged in successfully',
            timer:700,
            icon: 'success'});
        } else {
          Swal.fire('Error', 'Credentials are incorrect', 'error');
        }
      },
      error => {
        Swal.fire('Error', error, 'error');
      }
    );
  }

}
