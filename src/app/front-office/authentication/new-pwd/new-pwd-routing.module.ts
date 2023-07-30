import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPwdComponent } from './new-pwd.component';

const routes: Routes = [
  {
    path: '',
    component: NewPwdComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewPwdRoutingModule { }
