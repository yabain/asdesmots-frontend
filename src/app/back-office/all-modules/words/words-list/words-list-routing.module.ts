import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordsListComponent } from './words-list.component';

const routes: Routes = [
  {path:'',
component:WordsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsListRoutingModule { }
