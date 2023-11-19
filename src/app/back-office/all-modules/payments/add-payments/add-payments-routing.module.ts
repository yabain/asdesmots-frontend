import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPaymentsComponent } from './add-payments.component';

const routes: Routes = [
	{
		path : '',
		component : AddPaymentsComponent
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPaymentsRoutingModule { }
