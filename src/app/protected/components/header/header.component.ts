import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userName: string = '';

  constructor(private router: Router,
              private authService: AuthService) {
                this.userName = this.authService.userName;
              }

  logout() {
    this.router.navigateByUrl('/login');
    this.authService.logout();
  }

}
