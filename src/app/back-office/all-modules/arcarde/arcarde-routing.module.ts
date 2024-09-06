import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArcardeComponent } from './arcarde.component';
import { ListArcardeComponent } from './list-arcarde/list-arcarde.component';
import { CreateArcardeComponent } from './create-arcarde/create-arcarde.component';
import { ArcadeDetailsComponent } from './arcade-details/arcade-details.component';
import { UpdateArcadeComponent } from './update-arcade/update-arcade.component';

const routes: Routes = [
  { path: '', component: ArcardeComponent},
  { path: 'create', component:CreateArcardeComponent },
  { path: 'list-arcarde', component: ListArcardeComponent },
  { path: 'details/:arcadeId', component: ArcadeDetailsComponent },
  { path: 'update/:arcadeId', component: UpdateArcadeComponent },
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
