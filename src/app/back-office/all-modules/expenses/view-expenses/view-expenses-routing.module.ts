import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewExpensesComponent } from './view-expenses.component';

const routes: Routes = [
	{
		path : '',
		component : ViewExpensesComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewExpensesRoutingModule { }
