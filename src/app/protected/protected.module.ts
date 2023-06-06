import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from '../protected/dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsModule } from './projects/projects.module';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ProjectsModule
  ]
})
export class ProtectedModule { }
