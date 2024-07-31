import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcardeComponent } from './arcarde.component';
import { ListArcardeComponent } from './list-arcarde/list-arcarde.component';
import { ArcadesuscriptionComponent } from './arcadesuscription/arcadesuscription.component';
import { CreateArcardeComponent } from './create-arcarde/create-arcarde.component';
import { ArcadeDetailsComponent } from './arcade-details/arcade-details.component';

const routes: Routes = [
  { path: '', component: ArcardeComponent},
  { path: 'details/:idArcarde', component: ArcadeDetailsComponent },
  { path: 'list-arcarde', component: ListArcardeComponent },
  { path:  'suscribe', component: ArcadesuscriptionComponent },
  { path: 'create', component:CreateArcardeComponent },
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
