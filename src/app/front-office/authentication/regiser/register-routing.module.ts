import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegiserComponent } from './regiser.component';

const routes: Routes = [
  {
    path: '',
    component: RegiserComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
