import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesreportComponent } from './expensesreport.component';

const routes: Routes = [
  {
    path : '',
    component : ExpensesreportComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesreportRoutingModule { }
