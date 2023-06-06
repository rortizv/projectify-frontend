import { Component } from '@angular/core';
import { Project } from '../interfaces/interfaces';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  public projects: Project[] = [];

  constructor(private configService: ConfigService) { }

  async getProjects() {
    try {
      await this.configService.getAllProjects()
        .subscribe((projects: Project[]) => {
          this.projects = projects;
        });
      console.log(this.projects);
    } catch (error) {
      console.error(error);
    }
  }

}
