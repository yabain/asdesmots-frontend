import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlankPageComponent } from './blank-page.component';


const routes: Routes = [
  {
    path: '',
    component: BlankPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlankPageRoutingModule { }
