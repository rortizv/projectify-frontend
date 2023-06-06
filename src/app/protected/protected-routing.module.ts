import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../protected/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
      { path: '**', redirectTo: '' },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
