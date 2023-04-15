import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ErrorSecondComponent } from './error-second.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorSecondComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ErrorSecondRoutingModule { }
