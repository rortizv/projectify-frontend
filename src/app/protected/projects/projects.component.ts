import { Component } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { Project } from '../interfaces/interfaces';

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
