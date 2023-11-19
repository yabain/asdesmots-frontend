import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWordsComponent } from './add-words.component';

const routes: Routes = [
	{
		path : '',
		component : AddWordsComponent
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddWordsRoutingModule { }
