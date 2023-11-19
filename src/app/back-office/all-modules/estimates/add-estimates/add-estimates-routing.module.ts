import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEstimatesComponent } from './add-estimates.component';

const routes: Routes = [
	{
		path : '',
		component : AddEstimatesComponent
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddstimatesRoutingModule { }
