import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardFiveComponent } from './dashboard-five.component';

const routes: Routes = [{ path: '', component: DashboardFiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardFiveRoutingModule { }
