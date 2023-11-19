import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapvectorComponent } from './mapvector.component';

const routes: Routes = [
  {
    path : '',
    component : MapvectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapvectorRoutingModule { }
