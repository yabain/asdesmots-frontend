import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCompetitionComponent } from './update-competition/update-competition.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';
import { CompetitionDetailsComponent } from './competition-details/competition-details.component';

const routes: Routes = [
  { path: '',
    children: [
      // { path: 'create/:arcadeId', component: CreateCompetitionComponent },
      { path: 'create/:arcadeId/:parentCompetitionId', component: CreateCompetitionComponent },
      { path: 'details/:id', component: CompetitionDetailsComponent },
      { path: 'edit/:id', component: UpdateCompetitionComponent },
    ]
  },
  {
    path:'**',
    redirectTo: "'competition/list'",
    pathMatch: 'full'
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetitionRoutingModule { }
