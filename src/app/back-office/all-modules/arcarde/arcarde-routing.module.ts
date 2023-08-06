import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcardeComponent } from './arcarde.component';
import { ListUserArcardeComponent } from './list-user-arcarde/list-user-arcarde.component';
import { ListArcardeComponent } from './list-arcarde/list-arcarde.component';
import { ArcadesuscriptionComponent } from './arcadesuscription/arcadesuscription.component';

const routes: Routes = [
  { path: '', component: ArcardeComponent},
  { path: 'list-user/:idArcarde', component: ListUserArcardeComponent },
  { path: 'list-arcarde', component: ListArcardeComponent },
  { path:  'suscribe', component: ArcadesuscriptionComponent },
  {
    path: '**',
    redirectTo: "'list-arcarde'",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArcardeRoutingModule { }
