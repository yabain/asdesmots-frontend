import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HorizondalFormComponent } from './horizondal-form.component';

const routes: Routes = [
	{
		path : '',
		component : HorizondalFormComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorizondalFormRoutingModule { }
