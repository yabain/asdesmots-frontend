import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpeseCategoryComponent } from './expese-category.component';

const routes: Routes = [
  {
    path : '',
    component : ExpeseCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpeseCategoryRoutingModule { }
