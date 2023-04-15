import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerticalFormComponent } from './vertical-form.component';

const routes: Routes = [
	{
		path : '',
		component : VerticalFormComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerticalFormRoutingModule { }
