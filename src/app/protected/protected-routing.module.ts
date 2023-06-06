import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DedicationsComponent } from './dedications/dedications.component';
import { ProjectsComponent } from './projects/projects.component';


const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'dedications', component: DedicationsComponent },
      { path: '**', redirectTo: '' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
