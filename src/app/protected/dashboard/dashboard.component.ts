import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent {

  get user() {
    return this.authService.user;
  }

  constructor(private router: Router,
    private authService: AuthService ) { }

  logout() {
    Swal.fire({
      title: 'Logging out',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 500
    });
    this.router.navigateByUrl('/login');
    this.authService.logout();
  }

}
