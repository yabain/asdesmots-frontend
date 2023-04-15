import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEstimateComponent } from './edit-estimate.component';

const routes: Routes = [{ path: '', component: EditEstimateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditEstimateRoutingModule { }
