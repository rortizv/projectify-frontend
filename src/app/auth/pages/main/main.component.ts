import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [
  ]
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.validateToken();
  }

  validateToken() {
    const token = localStorage.getItem('token');
    if ( token ) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/auth/login');
    }
  }

}
