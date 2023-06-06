import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }


  async register() {
    const { name, email, password } = this.myForm.value;

    Swal.fire({
      title: 'Creating user',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const resp: AuthResponse = await lastValueFrom(this.authService.register(name, email, password));

      console.log(resp);

      if (resp.user?.uid || resp.token) {
        this.router.navigateByUrl('/dashboard');
        Swal.fire({
          title: 'User created',
          text: 'User was created successfully',
          icon: 'success'
        });
      } else {
        Swal.fire('Error', resp.msg, 'error');
      }
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'An error occurred while creating the user', 'error');
    }
  }


}
