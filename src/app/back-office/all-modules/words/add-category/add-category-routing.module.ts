import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category.component';

const routes: Routes = [
	{
		path : '',
		component : AddCategoryComponent
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCategoryRoutingModule { }
