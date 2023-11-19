import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAppComponent } from './add-app.component';

const routes: Routes = [
	{
		path : '',
		component : AddAppComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAppRoutingModule { }
