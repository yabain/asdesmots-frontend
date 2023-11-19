import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpensesComponent } from './expenses.component';

const routes: Routes = [
  {path:'',component:ExpensesComponent,
  children: [
    { path: "expenses-list", component: ExpensesListComponent },
    { path: "add-expenses", component: AddExpensesComponent},
    { path: "edit-expenses", component: EditExpensesComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
