import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewEstimateComponent } from './view-estimate.component';

const routes: Routes = [
  {
    path: '',
    component: ViewEstimateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEstimateRoutingModule {}
