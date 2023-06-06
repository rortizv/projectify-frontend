import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    const url = `${this.baseUrl}/projects`;
    return this.http.get<Project[]>(url);
  }
}
