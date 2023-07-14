import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UndercompetitionComponent } from './undercompetition.component';

const routes: Routes = [{ path: '', component: UndercompetitionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UndercompetitionRoutingModule { }
