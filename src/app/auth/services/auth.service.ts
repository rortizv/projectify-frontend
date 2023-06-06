import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { AuthResponse, User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }

  constructor( private http: HttpClient ) { }


  register( name: string, email: string, password: string ) {

    const url  = `${ this.baseUrl }/users`;
    const body = { email, password, name };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( ({ token }) => {
          if ( token ) {
            localStorage.setItem('token', token! );
          }
        }),
        map(resp => {
          return { ...resp, state: true };
        }),
        catchError( err => of(err.error.msg) )
      );
  }


  login( email: string, password: string ) {

    const url  = `${ this.baseUrl }/auth/login`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap( resp => {
          if ( resp.token ) {
            localStorage.setItem('token', resp.token! );
          }
        }),
        map( resp => resp ),
        catchError( err => of(err.error.msg) )
      );
  }


  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map(resp => {
        localStorage.setItem('token', resp.token!);
        this._user = {
          uid: resp.user.uid!,
          name: resp.user.name!,
          email: resp.user.email!,
          role: resp.user.role!,
          state: resp.user.state!,
        }
        return resp.user.state;
      }),
      catchError(err => of(false))
    );
  }


  logout() {
    localStorage.clear();
  }

}
