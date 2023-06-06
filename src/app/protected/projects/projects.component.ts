import { Component, OnInit } from '@angular/core';
import { GetProjectsResponse, Project } from '../interfaces/interfaces';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: any[] = [];
  public resp: any;

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects() {
    try {
      await this.configService.getAllProjects()
        .subscribe(resp => {
          const { projects } = resp;
          this.projects = projects;
        });
      console.log(this.projects);
    } catch (error) {
      console.error(error);
    }
  }

}
