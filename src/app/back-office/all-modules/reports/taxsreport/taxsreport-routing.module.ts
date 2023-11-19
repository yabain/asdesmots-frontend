import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxsreportComponent } from './taxsreport.component';

const routes: Routes = [
  {
    path : '',
    component : TaxsreportComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxsreportRoutingModule { }
