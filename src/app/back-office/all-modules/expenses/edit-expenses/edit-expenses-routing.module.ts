import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExpensesComponent } from './edit-expenses.component';

const routes: Routes = [{ path: '', component: EditExpensesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditExpensesRoutingModule { }
