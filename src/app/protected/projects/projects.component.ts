import { Component, OnInit } from '@angular/core';
import { GetProjectsResponse, Project } from '../interfaces/interfaces';
import { ConfigService } from '../services/config.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[] = [];

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.getCompanyProjects();
  }

  async getCompanyProjects() {
    try {
      await this.configService.getAllProjects()
        .subscribe(resp => {
          const { projects } = resp;
          this.projects = projects;
        });
    } catch (error: any) {
      console.error(error);
      Swal.fire('Error', error, 'error');
    }
  }

}
