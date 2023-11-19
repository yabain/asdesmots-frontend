import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitlossreportComponent } from './profitlossreport.component';

const routes: Routes = [
  {
    path : '',
    component : ProfitlossreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitlossreportRoutingModule { }
