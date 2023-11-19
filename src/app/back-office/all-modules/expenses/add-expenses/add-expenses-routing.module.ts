import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddExpensesComponent } from './add-expenses.component';

const routes: Routes = [
	{
		path : '',
		component : AddExpensesComponent
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddExpensesRoutingModule { }
