import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorFirstComponent } from './error-first.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorFirstComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorFirstRoutingModule { }
