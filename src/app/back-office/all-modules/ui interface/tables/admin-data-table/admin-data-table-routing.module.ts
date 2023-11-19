import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDataTableComponent } from './admin-data-table.component';

const routes: Routes = [
	{
		path : '',
		component : AdminDataTableComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDataTableRoutingModule { }
