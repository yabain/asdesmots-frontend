import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFourComponent } from './dashboard-four.component';

const routes: Routes = [{ path: '', component: DashboardFourComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardFourRoutingModule { }
