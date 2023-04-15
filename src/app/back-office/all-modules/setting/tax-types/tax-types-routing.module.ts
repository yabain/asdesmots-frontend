import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxTypesComponent } from './tax-types.component';

const routes: Routes = [
  {
    path : '',
    component : TaxTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxTypesRoutingModule { }
