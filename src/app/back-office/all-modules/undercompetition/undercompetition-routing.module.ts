import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UndercompetitionComponent } from './undercompetition.component';
import { ListCompetitionComponent } from './list-competition/list-competition.component';
import { UpdateCompetitionComponent } from './update-competition/update-competition.component';
import { ListCretariasComponent } from './list-cretarias/list-cretarias.component';
import { ListPartsComponent } from './list-parts/list-parts.component';
import { CreateCompetitionComponent } from './create-competition/create-competition.component';

const routes: Routes = [
  { path: '', component: UndercompetitionComponent, 
    children: [
      {
        path: 'competition/list',
        component: ListCompetitionComponent
      },
     {
        path: 'competition/update/:id',
        component: UpdateCompetitionComponent
      },
     {
        path: 'competition/parts/:id',
        component: ListPartsComponent
      },
      {
        path: 'competition/criterias/:id',
        component: ListCretariasComponent
      },
      {
        path:'competition/create',
        component: CreateCompetitionComponent
      }

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
  exports: [RouterModule]
})
export class UndercompetitionRoutingModule { }
