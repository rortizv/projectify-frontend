import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DedicationReport, DedicationWork, GetProjectsResponse } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<GetProjectsResponse> {
    const url = `${this.baseUrl}/projects`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.get<GetProjectsResponse>(url, { headers });
  }

  getDedicationsByUser(userId: string): Observable<DedicationReport> {
    const url = `${this.baseUrl}/dedication-project/${userId}`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.get<DedicationReport>(url, { headers });
  }

  createDedicationWork(dedicationWork: DedicationWork) {
    const url = `${this.baseUrl}/dedication-project`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.post(url, dedicationWork, { headers });
  }

  updateDedicationWork(dedicationId: string, dedicationWork: DedicationWork) {
    console.log(dedicationWork);
    const url = `${this.baseUrl}/dedication-project/${dedicationId}`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return this.http.put(url, dedicationWork, { headers });
  }

  get userId (): string {
    return localStorage.getItem('userId') || '';
  }

  // format date from '2021-08-01T00:00:00.000Z' to 'YYYY-MM-DD'
  formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  }

  formatDate2(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

}
