import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimatesListComponent } from './estimates-list.component';

const routes: Routes = [
  {path:'',component:EstimatesListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimatesListRoutingModule { }
