import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateCompetitionComponent } from '../update-competition/update-competition.component';
import { ListPartsComponent } from '../list-parts/list-parts.component';
import { ListCompetitionComponent } from './list-competition.component';

const routes: Routes = [
  {
    path: '',
    component: ListCompetitionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListCompetitionRoutingModule { }
