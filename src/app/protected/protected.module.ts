import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModule } from '../auth/auth.module';
import { ProtectedRoutingModule } from './protected-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DedicationsComponent } from './dedications/dedications.component';
import { ProjectsComponent } from './projects/projects.component';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Routes, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    HeaderComponent,
    SidebarComponent,
    DedicationsComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    AuthModule,
    RouterModule
  ]
})
export class ProtectedModule { }
